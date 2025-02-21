import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const getInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      user: null,
      token: null,
      loading: false,
      error: null,
    };
  }
  return {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  };
};

const initialState: AuthState = getInitialState();

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    let retries = 3; // Number of retries

    while (retries >= 0) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });
        
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }
        
        if (!data.token || !data.user) {
          throw new Error('Invalid response format');
        }

        // Store both token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        document.cookie = `token=${data.token}; path=/; max-age=86400`;

        return {
          token: data.token,
          user: data.user
        };
      } catch (error) {
        if (retries === 0) {
          throw error;
        }
        retries--;
        // Wait for 1.5 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(`Retrying login... ${retries} attempts remaining`);
      }
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: { email: string; password: string; name: string }) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Login failed';
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Registration failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;