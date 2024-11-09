import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface Auth {
    userId:string,
    isLogin:boolean,
    userName:string
}

const initialState: Auth = {
    userId:'',
    isLogin:false,
    userName:''
};



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ login: boolean; id: string; userName:string}>) => {
            if (state) {
              state.isLogin = action.payload.login;
              state.userId = action.payload.id;
              state.userName = action.payload.userName;

            }
          },logout: (state) => {
            if (state) {
              state.isLogin = false;
              state.userId = '';
            }
          },
    }
})



export const { login,logout } = authSlice.actions;
export default authSlice.reducer;