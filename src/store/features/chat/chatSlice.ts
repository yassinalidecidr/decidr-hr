import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Message, ChatSession } from "@/types/message";
import { RootState } from "@/store/store";
import { storeAuthData } from "@/lib/api";
import { login } from "../auth/authSlice";

interface ChatState {
  sessions: ChatSession[];
  currentSession: string | null;
  loading: boolean;
  error: string | null;
  completedMessages: string[];
  isOpen: boolean;
  authState: {
    email?: string;
    requiresOTP: boolean;
  };
}

const initialState: ChatState = {
  sessions: [],
  currentSession: null,
  loading: false,
  error: null,
  completedMessages: [],
  isOpen: false,
  authState: {
    email: undefined,
    requiresOTP: false,
  },
};

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { content, department }: { content: string; department?: string },
    { getState, dispatch }
  ) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
    const { authState } = state.chat;
    let retries = 2; // Number of retries

    if (!accessKey) {
      throw new Error("No access key found");
    }

    // Extract email from message if it looks like an email
    const emailMatch = content.match(/[\w.-]+@[\w.-]+\.\w+/);
    const email = emailMatch ? emailMatch[0] : authState.email;

    // Extract OTP if message contains only numbers
    const otpMatch = content.match(/^\d+$/);
    const otp = otpMatch ? content : undefined;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-API-Key": accessKey,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // **Dynamically choose API endpoint based on authentication status**
    const endpoint = token ? "/api/ai/query" : "/api/ai/auth-query";

    while (retries >= 0) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: content,
            ...(email && { email }),
            ...(otp && { otp }),
            ...(token && { department }),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to send message");
        }
        console.log("Response:", response);
        const data = await response.json();
        console.log("data:", data);

        // Handle authentication response
        if (data.requiresOTP) {
          console.log("data.requiresOTP:", data.requiresOTP);
          dispatch(
            chatSlice.actions.updateAuthState({ email, requiresOTP: true })
          );
        } else if (data.token && data.user) {
          console.log("data.token:", data.token);
          console.log("data.user:", data.user);
          // Store auth data and dispatch login action
          storeAuthData(data);
          dispatch(
            login.fulfilled({ token: data.token, user: data.user }, "", {
              email: "",
              password: "",
            })
          );
          dispatch(chatSlice.actions.updateAuthState({})); // Reset auth state
        }

        return { userMessage: content, ...data };
      } catch (error) {
        if (retries === 0) {
          throw error;
        }
        retries--;
        // Wait for 1.5 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(`Retrying request... ${retries} attempts remaining`);
      }
    }
  }
);

// New thunk for welcome message with retries
export const getWelcomeMessage = createAsyncThunk(
  "chat/getWelcomeMessage",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;
    let retries = 2; // Number of retries

    if (!accessKey) {
      throw new Error("No access key found");
    }

    const endpoint = token ? "/api/ai/query" : "/api/ai/auth-query";
    const query = token
      ? "Send a brief welcome back message mentioning their organization name and offering assistance. Keep it to one sentence only."
      : "Hello, I need help logging in";

    while (retries >= 0) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": accessKey,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            query,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get welcome message");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        if (retries === 0) {
          throw error;
        }
        retries--;
        // Wait for 1.5 seconds before retrying
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(
          `Retrying welcome message... ${retries} attempts remaining`
        );
      }
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
    updateAuthState: (
      state,
      action: { payload: { email?: string; requiresOTP?: boolean } }
    ) => {
      state.authState = {
        email: action.payload.email || state.authState.email,
        requiresOTP: action.payload.requiresOTP ?? false,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    addMessage: (
      state,
      action: { payload: { sessionId: string; message: Message } }
    ) => {
      const session = state.sessions.find(
        (s) => s.id === action.payload.sessionId
      );
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
      // If chat is being opened and there are no messages, get welcome message
      if (
        state.isOpen &&
        (!state.currentSession || state.sessions.length === 0)
      ) {
        state.loading = true; // Set loading state
      }
    },
    clearChat: () => initialState,
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

        const session = state.sessions.find(
          (s) => s.id === state.currentSession
        );
        if (session) {
          const userMessageId = Date.now().toString();
          const assistantMessageId = (Date.now() + 1).toString();

          session.messages.push({
            id: userMessageId,
            content: action.payload.userMessage,
            role: "user",
            createdAt: new Date().toISOString(),
          });

          session.messages.push({
            id: assistantMessageId,
            content: action.payload.response,
            role: "assistant",
            createdAt: new Date().toISOString(),
          });

          session.updatedAt = new Date().toISOString();
          state.completedMessages.push(userMessageId);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to send message";
      })
      .addCase(getWelcomeMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWelcomeMessage.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.currentSession) {
          const newSession: ChatSession = {
            id: Date.now().toString(),
            messages: [
              {
                id: Date.now().toString(),
                content: action.payload.response,
                role: "assistant",
                createdAt: new Date().toISOString(),
              },
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          state.sessions.push(newSession);
          state.currentSession = newSession.id;
        }
      })
      .addCase(getWelcomeMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to get welcome message";
      });
  },
});

export const {
  setCurrentSession,
  updateAuthState,
  clearError,
  addMessage,
  createNewSession,
  markMessageAsCompleted,
  toggleChat,
  clearChat,
} = chatSlice.actions;
export default chatSlice.reducer;
