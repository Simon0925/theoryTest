import {AnsweredVariantsInterface,VisibleQuestionsInterface,CoolorState} from '../interface'
import {Question} from "../../../interface/questionsType"


const getVariantColor = (
    answeredVariants: AnsweredVariantsInterface,
    visibleQuestions: VisibleQuestionsInterface|undefined,
    currentPage: number,
    typeOftest: string,
    index: number,
    questions: Question[],
    correct: boolean,
    stateColor: CoolorState,
    practiceCorrect:boolean,
) => {
    const checkAnswer = answeredVariants.some(e =>
        (typeOftest === "MockTest"
            ? visibleQuestions?.[currentPage]?.id === e.id && index === e.index
            : questions[currentPage].id === e.id && index === e.index
        )
    );

    if (checkAnswer && practiceCorrect && typeOftest === "PracticeTest") {
        return {
            backgroundColor: correct ? "rgb(0, 182, 118)" : "rgb(170, 59, 54)",
            color: stateColor.VariantSelectedOption,
        };
    } else if (checkAnswer &&!practiceCorrect &&  typeOftest === "PracticeTest") {
        return {
            backgroundColor: stateColor.VariantSelectedMockBackground,
            color: stateColor.VariantSelectedMockTestOption,
        };
    } else if (checkAnswer && typeOftest === "MockTest") {
        return {
            backgroundColor: stateColor.VariantSelectedMockBackground,
            color: stateColor.VariantSelectedMockTestOption,
        };
    } else if (checkAnswer && typeOftest === "Trainer") {
        return {
            backgroundColor: correct ? "rgb(0, 182, 118)" : "rgb(170, 59, 54)",
            color: stateColor.VariantSelectedOption,
        };
    } else if ((checkAnswer&&typeOftest === "Result")){
        return {
            backgroundColor: correct  ? "rgb(0, 182, 118)" : "rgb(170, 59, 54)",
            color: stateColor.VariantSelectedOption,
        };
    }else {
        return {
            backgroundColor: stateColor.VariantBackground,
            color: stateColor.TestcolorText,
        };
    }
};


export default getVariantColor