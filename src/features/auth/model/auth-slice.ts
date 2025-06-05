import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: number | null;
  isInitialized: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userId: null,
  isInitialized: false,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    setCredentials: (state, action: PayloadAction<{ token: string; userId: number }>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = 'loading';
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addMatcher(isRejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setCredentials, logout, setInitialized } = authSlice.actions;
export const authReducer = authSlice.reducer;
