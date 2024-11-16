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
    MockTestChartBackground:string;
    MockTestChartLabel:string;
    MockTestChartLinePath:string;
    MockTestChartPoints:string;
    DataStatisticsAssessmentTitle:string;
    DataStatisticsAssessmentContent:string;
    DataStatisticsAssessmentFooter:string;
    DataStatisticsAssessmentFooterTextbtn:string;
    DataStatisticsAssessmentBackground:string;
    DataStatisticsAssessmentFooterBackgroundBtn:string;
    TestBackground:string;
    TestcolorText:string;
    VariantTitleColor:string;
    CircularTrainerProgressBarColor:string;
    PreviousTestBackgroundBtn:string;
    FlagColorSvgBtn:string;
    QuestionContentBackground:string;
    FooterBackgroundBtn:string;
    VariantBackground:string;
    VariantTextColor:string;
    VariantSelectedOption:string;
    VariantSelectedMockTestOption:string;
    VariantSelectedMockBackground:string;
    FooterBackgroundNextBtnSelectedOption:string;
    FooterColorNextBtnSelectedOption:string
    HeaderPracticeTestQuestionColors:string;
    OnceTwiceProgressOnesBackground:string;
    HptTitleColorText:string;
    HtpPlateBackground:string;
    HtpIntroductionBtnBackground:string;
    HtpIntroductionBtnTextColor:string;
    HtpIconNumberBackground:string;

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
    MockTestChartBackground:'linear-gradient(180deg, rgba(126,198,212,1) 0%, rgba(0,150,206,1) 90%)',
    MockTestChartLabel:'white',
    MockTestChartLinePath:'#32EBC3',
    MockTestChartPoints:'white',
    DataStatisticsAssessmentTitle:'white',
    DataStatisticsAssessmentContent:'#0078AB',
    DataStatisticsAssessmentFooter:'#0078AB',
    DataStatisticsAssessmentFooterTextbtn:"#0078AB",
    DataStatisticsAssessmentBackground:"white",
    DataStatisticsAssessmentFooterBackgroundBtn:"white",
    TestBackground:"rgb(0, 150, 206)",
    TestcolorText:'rgb(0, 120, 171)',
    VariantTitleColor:"white",
    PreviousTestBackgroundBtn:"#91BCD6",
    FlagColorSvgBtn:"#0078AB",
    QuestionContentBackground:"white",
    FooterBackgroundBtn:"white",
    VariantBackground:"white",
    VariantTextColor:"#0078AB",
    VariantSelectedOption:"white",
    VariantSelectedMockTestOption:"#0078AB",
    VariantSelectedMockBackground:"#FFEC4B",

    FooterBackgroundNextBtnSelectedOption:"#FFEC4B",
    FooterColorNextBtnSelectedOption:"#0078AB",
    HeaderPracticeTestQuestionColors:"white",
    OnceTwiceProgressOnesBackground:"#0079AC",

    CircularTrainerProgressBarColor:"#008BC8",


    HptTitleColorText:"#0078AB",
    HtpPlateBackground:"white",
    HtpIntroductionBtnBackground:"#0078AB",
    HtpIntroductionBtnTextColor:"white",
    HtpIconNumberBackground:"#0078AB",

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
                    state.MockTestChartBackground='linear-gradient(180deg, rgba(126,198,212,1) 0%, rgba(0,150,206,1) 90%)';
                    state.MockTestChartLabel='white';
                    state.MockTestChartLinePath='#32EBC3';
                    state.MockTestChartPoints='white';
                    state.DataStatisticsAssessmentTitle='white';
                    state.DataStatisticsAssessmentContent='#0078AB';
                    state.DataStatisticsAssessmentFooter='#0078AB';
                    state.DataStatisticsAssessmentFooterTextbtn="#0078AB";
                    state.DataStatisticsAssessmentBackground="white";
                    state.DataStatisticsAssessmentFooterBackgroundBtn="white";
            
                    state.TestBackground="rgb(0, 150, 206)";
                    state.TestcolorText='rgb(0, 120, 171)';
                    state.VariantTitleColor="white";
                    state.PreviousTestBackgroundBtn="#91BCD6";
                    state.FlagColorSvgBtn="#0078AB";
                    state.QuestionContentBackground="white";
                    state.FooterBackgroundBtn="white";
                    state.VariantBackground="white";
                    state.VariantTextColor="#0078AB";
                    state.VariantSelectedOption="white";
                    state.VariantSelectedMockTestOption="#0078AB";
                    state.VariantSelectedMockBackground="#FFEC4B";

                    state.FooterBackgroundNextBtnSelectedOption="#FFEC4B";
                    state.FooterColorNextBtnSelectedOption="#0078AB";
                    state.HeaderPracticeTestQuestionColors = "white";
                    state.OnceTwiceProgressOnesBackground="#0079AC";

                    state.CircularTrainerProgressBarColor= "#008BC8";

                    state.HptTitleColorText="#0078AB";
                    state.HtpPlateBackground="white";
                    state.HtpIntroductionBtnBackground="#0078AB";
                    state.HtpIntroductionBtnTextColor="white";
                    state.HtpIconNumberBackground="#0078AB";


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
                    state.MockTestChartBackground='linear-gradient(180deg, rgba(255,234,166,1) 0%, rgba(253,201,58,1) 90%)';
                    state.MockTestChartLabel='#000000';
                    state.MockTestChartLinePath='#000000';
                    state.MockTestChartPoints='#F9931C';
                    state.DataStatisticsAssessmentTitle = '#000000';
                    state.DataStatisticsAssessmentContent = '#000000';
                    state.DataStatisticsAssessmentFooter = '#F9931C';
                    state.DataStatisticsAssessmentFooterTextbtn="#000000'";
                    state.DataStatisticsAssessmentBackground="white";
                    state.DataStatisticsAssessmentFooterBackgroundBtn="white";
                    state.TestBackground="#FDCA3A";
                    state.TestcolorText='#000000';
                    state.VariantTitleColor="#000000";
                    state.PreviousTestBackgroundBtn="#FDC998";
                    state.FlagColorSvgBtn="#000000";
                    state.QuestionContentBackground="white";
                    state.FooterBackgroundBtn="white";

                    state.VariantBackground="white";
                    state.VariantTextColor="#000000";
                    state.VariantSelectedOption="white";
                    state.VariantSelectedMockTestOption="#0078AB";
                    state.VariantSelectedMockBackground="#FFEC4B";

                    state.FooterBackgroundNextBtnSelectedOption="#FFEC4B";
                    state.FooterColorNextBtnSelectedOption="#000000";
                    state.HeaderPracticeTestQuestionColors = "white";

                    state.OnceTwiceProgressOnesBackground="#F9921D";

                    state.CircularTrainerProgressBarColor= "#FFF9D0";


                    state.HptTitleColorText="#000000";
                    state.HtpPlateBackground="white";
                    state.HtpIntroductionBtnBackground="#F9931C";
                    state.HtpIntroductionBtnTextColor="white";
                    state.HtpIconNumberBackground="#0078AB";


                    
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
                    state.QuestionContentBackground="white";

                    state.VariantBackground="white";
                    state.VariantTextColor="#000000";
                    state.VariantSelectedOption="white";
                    state.VariantSelectedMockTestOption="white";
                    state.VariantSelectedMockBackground="#AAAAAA";


                    state.MockTestChartBackground='linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(243,243,246,1) 90%)';
                    state.MockTestChartLabel='#000000';
                    state.MockTestChartLinePath='#000000';
                    state.MockTestChartPoints='#000000';
                    state.DataStatisticsAssessmentTitle = '#000000';
                    state.DataStatisticsAssessmentContent = '#000000';
                    state.DataStatisticsAssessmentFooter = '#F9F9F9';
                    state.DataStatisticsAssessmentFooterTextbtn="#000000'";
                    state.DataStatisticsAssessmentBackground="white";
                    state.DataStatisticsAssessmentFooterBackgroundBtn="white";
                    state.PreviousTestBackgroundBtn="#FDC998";

                    state.TestBackground="#F2F2F6";
                    state.TestcolorText='#000000';
                    state.VariantTitleColor="#000000";
                    state.PreviousTestBackgroundBtn="#FCFCFC";
                    state.FlagColorSvgBtn="#000000";
                    state.FooterBackgroundBtn="white";

                    state.FooterBackgroundNextBtnSelectedOption="#F9931C";
                    state.FooterColorNextBtnSelectedOption="#000000";
                    state.HeaderPracticeTestQuestionColors = "#000000";

                    state.OnceTwiceProgressOnesBackground="#555555";

                    state.CircularTrainerProgressBarColor= "#FFFFFF";

                    state.HptTitleColorText="#000000";

                    state.HtpPlateBackground="white";
                    state.HtpIntroductionBtnBackground="#F9F9F9";
                    state.HtpIntroductionBtnTextColor="#000000";
                    state.HtpIconNumberBackground="#555555";

                    

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
                    state.QuestionContentBackground="white";

                    state.VariantBackground="white";
                    state.VariantTextColor="#5E2A9E";
                    state.VariantSelectedOption="white";
                    state.VariantSelectedMockTestOption="white";
                    state.VariantSelectedMockBackground="#BC62C8";

                    state.MockTestChartBackground='linear-gradient(180deg, rgba(127,198,211,1) 0%, rgba(232,203,235,1) 90%)';
                    state.MockTestChartLabel='#5E2A9E';
                    state.MockTestChartLinePath='#5E2A9E';
                    state.MockTestChartPoints='white';
                    state.DataStatisticsAssessmentTitle = '#5E2A9E';
                    state.DataStatisticsAssessmentContent = '#5E2A9E';
                    state.DataStatisticsAssessmentFooter = '#5E299E';
                    state.DataStatisticsAssessmentFooterTextbtn="#5E2A9E";
                    state.DataStatisticsAssessmentBackground="white";
                    state.DataStatisticsAssessmentFooterBackgroundBtn="white";


                    state.TestBackground="#E8CCEC";
                    state.TestcolorText='#5E2A9E';
                    state.VariantTitleColor="#5E299E";
                    state.PreviousTestBackgroundBtn="#AF95D0";
                    state.FlagColorSvgBtn="#5E2A9E";
                    state.FooterBackgroundBtn="white";

                    state.FooterBackgroundNextBtnSelectedOption="#FFEC4B";
                    state.FooterColorNextBtnSelectedOption="#5E2A9E";
                    state.HeaderPracticeTestQuestionColors = "white";

                    state.OnceTwiceProgressOnesBackground="#BC62C7";

                    state.CircularTrainerProgressBarColor= "#F6EBF8";


                    state.HptTitleColorText="#5E299E";

                    state.HtpPlateBackground="white";
                    state.HtpIntroductionBtnBackground="#5E2A9E";
                    state.HtpIntroductionBtnTextColor="white";
                    state.HtpIconNumberBackground="#0078AB";
                    

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
                    state.QuestionContentBackground="#354E65";

                    state.VariantBackground="#334E65";
                    state.VariantTextColor="white";
                    state.VariantSelectedOption="white";
                    state.VariantSelectedMockTestOption="#334E65";
                    state.VariantSelectedMockBackground="#BEB54E";

                    state.MockTestChartBackground='linear-gradient(180deg, rgba(151,145,147,1) 0%, rgba(35,52,71,1) 90%)';
                    state.MockTestChartLabel='white';
                    state.MockTestChartLinePath='#32EBC3';
                    state.MockTestChartPoints='white';
                    state.DataStatisticsAssessmentTitle = 'white';
                    state.DataStatisticsAssessmentContent = 'white';
                    state.DataStatisticsAssessmentFooter = '#1A2836';
                    state.DataStatisticsAssessmentFooterTextbtn="white";
                    state.DataStatisticsAssessmentBackground="#354E65";
                    state.DataStatisticsAssessmentFooterBackgroundBtn="#334E65";


                    state.TestBackground="#233448";
                    state.TestcolorText='white';
                    state.VariantTitleColor="white";
                    state.PreviousTestBackgroundBtn="#283B4E";
                    state.FlagColorSvgBtn="white";
                    state.FooterBackgroundBtn="#354E65";

                    state.FooterBackgroundNextBtnSelectedOption="#FFEC4B";
                    state.FooterColorNextBtnSelectedOption="#1EA1F1";
                    state.HeaderPracticeTestQuestionColors = "#1EA1F1";

                    state.OnceTwiceProgressOnesBackground="#1A2836";
                    
                    state.HptTitleColorText="white";
                    state.HtpPlateBackground="#354E65";
                    state.HtpIntroductionBtnBackground="#1A2836";
                    state.HtpIntroductionBtnTextColor="#1EA1F1";
                    state.HtpIconNumberBackground="#0078AB";


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
