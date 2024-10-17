import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface CoolorState {  
    headerColors: string;
    contentColors: string;
}


const initialState: CoolorState = {
    headerColors: "#0078AB",
    contentColors: "#0096CE", 
};


export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        updateColor: (state, action: PayloadAction<string>) => {
    
            switch (action.payload) {
                case 'oceanicBlue':
                    state.headerColors = "#0078AB"; 
                    state.contentColors = "#FFA500"; 
                    break;
                case 'amberSunset':
                    state.headerColors = "#F9931C"; 
                    state.contentColors = "#FDCA3A"; 
                    break;
                case 'frostedPearl':
                    state.headerColors = "#F9F9F9"; 
                    state.contentColors = "#F2F2F6"; 
                    break;
                case 'violetMajesty':
                    state.headerColors = "#5E299E"; 
                    state.contentColors = "#E8CCEC"; 
                break;
                default:
                    console.log(`Sorry, we are out of ${action.payload}.`);
            }
        }
    },
});


export const { 
    updateColor
} = colorSlice.actions;

export default colorSlice.reducer;
