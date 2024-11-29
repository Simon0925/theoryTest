import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Auth {
  userId: string | null; 
  isLogin: boolean;
  userName: string | null; 
  loading: boolean;
}

const initialState: Auth = {
  userId: null, 
  isLogin: false,
  userName: null,
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ login: boolean; id: string; userName: string }>) => {
      state.isLogin = action.payload.login;
      state.userId = action.payload.id;
      state.userName = action.payload.userName;
      state.loading = false; 
    },
    logout: (state) => {
      state.isLogin = false;
      state.userId = null; 
      state.userName = null; 
      state.loading = false; 
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, isLoading } = authSlice.actions;
export default authSlice.reducer;
