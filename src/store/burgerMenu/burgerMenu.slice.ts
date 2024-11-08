import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface burgerMenu {
    open:boolean;
    visible:boolean;
}


const initialState: burgerMenu = { 
    open:false,
    visible:true
}

export type { burgerMenu };

export const burgerMenuSlice = createSlice({
    name: 'currentData',
    initialState,
    reducers: {
        updateBurgerMenu:  (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
        },
        updateVisible:  (state, action: PayloadAction<boolean>) => {
            state.visible = action.payload
        }
    }
})

export const {
    updateBurgerMenu,
    updateVisible
  } = burgerMenuSlice.actions;
  
  export default burgerMenuSlice.reducer;