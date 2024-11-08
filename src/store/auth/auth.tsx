import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface Auth {
    userId:string,
    isLogin:boolean
}

const initialState: Auth = {
    userId:'',
    isLogin:false
};



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ login: boolean; id: string; }>) => {
            if (state) {
              state.isLogin = action.payload.login;
              state.userId = action.payload.id;
            }
          },logout: (state) => {
            if (state) {
              state.isLogin = false;
              state.userId = '';
            }
          },
    }
})



export const {  } = authSlice.actions;
export default authSlice.reducer;