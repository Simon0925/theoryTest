import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface burgerMenu {
    open:boolean
}


const initialState: burgerMenu = { 
    open:false
}

export type { burgerMenu };

export const burgerMenuSlice = createSlice({
    name: 'currentData',
    initialState,
    reducers: {
        updateBurgerMenu:  (state, action: PayloadAction<boolean>) => {
            state.open = action.payload
        }
    }
})

export const {
    updateBurgerMenu
  } = burgerMenuSlice.actions;
  
  export default burgerMenuSlice.reducer;