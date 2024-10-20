import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface CoolorState {  
    headerColors: string;
    mainColor: string;
    textColor:string;
    btnSettingsColor:string;
    hoverColor:string;
    btnSettingsColorNotActive:string;
    textActiveSettingsColor:string;
    textNotActiveSettingsColor:string;
    titleColorSettings:string;
    headerSvgColor:string
    questionsGroupBackground:string;
    btnSettingsBackgroundColor:string;
    svgGroupColor:string;
    svgAvtiveBackgroundColor:string;
    toggleBackground:string;
    toggleBorder:string;
    currentState:string;
}


const initialState: CoolorState = {
    headerColors: "#0078AB",
    mainColor: "#0096CE", 
    textColor:"white",
    btnSettingsColor:"#0078AB",
    btnSettingsColorNotActive:"white",
    btnSettingsBackgroundColor:"white",
    textActiveSettingsColor:'white',
    textNotActiveSettingsColor:'#0078AB',
    titleColorSettings:'white',
    hoverColor:"#1C85B9",
    headerSvgColor:"white",
    questionsGroupBackground:"white",
    svgGroupColor:"#0078AB",
    svgAvtiveBackgroundColor:"#1C85B9",
    toggleBackground:"#d7d3d2",
    toggleBorder:"#0078A5",
    currentState:"oceanicBlue",
};


export const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        updateColor: (state, action: PayloadAction<string>) => {
    
            switch (action.payload) {
                case 'oceanicBlue':
                    state.headerColors = "#0078AB"; 
                    state.mainColor = "#0096CE"; 
                    state.textColor ="white";
                    state.hoverColor="#1C85B9";
                    state.btnSettingsColor="#0078AB";
                    state.btnSettingsColorNotActive = "white";
                    state.textActiveSettingsColor='white';
                    state.textNotActiveSettingsColor='#0078AB';
                    state.titleColorSettings='white';
                    state.headerSvgColor='white';
                    state.questionsGroupBackground="white";
                    state.btnSettingsBackgroundColor="white";
                    state.svgGroupColor="#0078AB";
                    state.svgAvtiveBackgroundColor="#1C85B9";
                    state.toggleBackground="#d7d3d2";
                    state.toggleBorder="#0078A5";
                    break;
                case 'amberSunset':
                    state.headerColors = "#F9931C"; 
                    state.mainColor = "#FDCA3A";
                    state.textColor = "white";
                    state.btnSettingsColor="#0078AB";
                    state.btnSettingsColorNotActive = "white"
                    state.textActiveSettingsColor='white';
                    state.textNotActiveSettingsColor='#000000';
                    state.titleColorSettings='#000000';
                    state.hoverColor = "#FF9F30"
                    state.headerSvgColor='white';
                    state.questionsGroupBackground="white";
                    state.btnSettingsBackgroundColor="white";
                    state.svgGroupColor="#000000";
                    state.svgAvtiveBackgroundColor="#FF9F30";
                    state.toggleBackground="#FDC93A";
                    state.toggleBorder="#C9A12E";

                    break;
                case 'frostedPearl':
                    state.headerColors = "#F9F9F9"; 
                    state.mainColor = "#F2F2F6"; 
                    state.textColor = "#0A0A0A";
                    state.btnSettingsColor="#000000";
                    state.btnSettingsColorNotActive = "white";
                    state.hoverColor = "#EBEBEB";
                    state.textActiveSettingsColor='white';
                    state.textNotActiveSettingsColor='#000000';
                    state.titleColorSettings='#000000';
                    state.headerSvgColor='#000000';
                    state.questionsGroupBackground="white";
                    state.btnSettingsBackgroundColor="white";
                    state.svgGroupColor="#000000";
                    state.svgAvtiveBackgroundColor="#EBEBEB";
                    state.toggleBackground="#F3F3F6";
                    state.toggleBorder="#C2C2C5";


                    break;
                case 'violetMajesty':
                    state.headerColors = "#5E299E"; 
                    state.mainColor = "#E8CCEC";
                    state.textColor = "white";
                    state.btnSettingsColor="#0078AB";
                    state.btnSettingsColorNotActive = "white";
                    state.textActiveSettingsColor='white';
                    state.textNotActiveSettingsColor='#0078AB';
                    state.titleColorSettings='#5e2a9e';                
                    state.hoverColor = "#6B36AB"
                    state.headerSvgColor='white';
                    state.questionsGroupBackground="white";
                    state.btnSettingsBackgroundColor="white";
                    state.svgGroupColor="#0078AB";
                    state.svgAvtiveBackgroundColor="#6B36AB";
                    state.toggleBackground="#E8CBEB";
                    state.toggleBorder="#BAA2BD";


                break;
                case 'nightMode':
                    state.headerColors = "#1A2836"; 
                    state.mainColor = "#233448";
                    state.questionsGroupBackground="#354E65";
                    state.headerSvgColor='#1E8DEE';
                    state.hoverColor = "#273543"
                    state.btnSettingsColor="#1A2836";
                    state.btnSettingsColorNotActive = "#334E65";
                    state.textActiveSettingsColor='white';
                    state.textNotActiveSettingsColor='white'; 
                    state.textColor = "white";
                    state.titleColorSettings='white';
                    state.btnSettingsBackgroundColor="#334E65";
                    state.svgGroupColor="white";
                    state.svgAvtiveBackgroundColor="#233447";
                    state.toggleBackground="#233447";
                    state.toggleBorder="#1C2939";

                break;
                default:
                    console.log(`Sorry, we are out of ${action.payload}.`);
            }
        }, updateCurrentState:  (state, action: PayloadAction<string>) => {
            state.currentState = action.payload
        }
    },
});


export const { 
    updateColor,
    updateCurrentState
} = colorSlice.actions;

export default colorSlice.reducer;
