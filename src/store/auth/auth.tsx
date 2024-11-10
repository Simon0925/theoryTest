import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface Auth {
    userId:string,
    isLogin:boolean,
    userName:string,
    loading:boolean
}

const initialState: Auth = {
    userId:'',
    isLogin:false,
    userName:'',
    loading:false
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
          isLoading:(state, action:PayloadAction<boolean>)=>{
            if (state) {
              state.loading = action.payload;

            }
          }
    }
})



export const { login,logout ,isLoading} = authSlice.actions;
export default authSlice.reducer;