import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Message, ChatSession } from '@/types/message';
import { RootState } from '@/store/store';

interface ChatState {
  sessions: ChatSession[];
  currentSession: string | null;
  loading: boolean;
  error: string | null;
  completedMessages: string[];
  isOpen: boolean;
}

const initialState: ChatState = {
  sessions: [],
  currentSession: null,
  loading: false,
  error: null,
  completedMessages: [],
  isOpen: false,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ content, department }: { content: string; department?: string }, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

    if (!accessKey) {
      throw new Error('No access key found');
    }

    // Choose endpoint based on authentication status
    const endpoint = token ? '/api/ai/query' : '/api/ai/auth-query';
    
    // Ensure token is properly formatted
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-API-Key': accessKey,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('Adding auth header:', headers['Authorization']); // Debug log
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: content,
        ...(token && { department }), // Only include department for authenticated requests
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', {
        status: response.status,
        headers: headers,
        error: errorData
      });
      throw new Error(errorData.error || 'Failed to send message');
    }
    
    const data = await response.json();
    return { userMessage: content, ...data };
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addMessage: (state, action: { payload: { sessionId: string; message: Message } }) => {
      const session = state.sessions.find(s => s.id === action.payload.sessionId);
      if (session) {
        session.messages.push(action.payload.message);
        session.updatedAt = new Date().toISOString();
      }
    },
    createNewSession: (state) => {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.sessions.push(newSession);
      state.currentSession = newSession.id;
    },
    markMessageAsCompleted: (state, action: { payload: string }) => {
      if (!state.completedMessages.includes(action.payload)) {
        state.completedMessages.push(action.payload);
      }
    },
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        
        if (!state.currentSession) {
          const newSession: ChatSession = {
            id: Date.now().toString(),
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          state.sessions.push(newSession);
          state.currentSession = newSession.id;
        }

        const session = state.sessions.find(s => s.id === state.currentSession);
        if (session) {
          const userMessageId = Date.now().toString();
          const assistantMessageId = (Date.now() + 1).toString();

          session.messages.push({
            id: userMessageId,
            content: action.payload.userMessage,
            role: 'user',
            createdAt: new Date().toISOString(),
          });

          session.messages.push({
            id: assistantMessageId,
            content: action.payload.response,
            role: 'assistant',
            createdAt: new Date().toISOString(),
          });

          session.updatedAt = new Date().toISOString();
          state.completedMessages.push(userMessageId);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to send message';
      });
  },
});

export const { setCurrentSession, clearError, addMessage, createNewSession, markMessageAsCompleted, toggleChat } = chatSlice.actions;
export default chatSlice.reducer; 