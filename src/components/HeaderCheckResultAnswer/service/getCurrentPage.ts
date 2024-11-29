import { Question } from "../../../interface/questionsType";
import { updateCurrentPage } from "../../../store/currentData/currentData.slice";

interface CurrentPage {
    questions: Question[];
    startId: string;
    dispatch: Function; 
}

export const getCurrentPage = ({ questions, startId, dispatch }: CurrentPage) => {
    const currentQuestion = questions.find((q) => q.id === startId);
    if (currentQuestion) {
        const currentPage = questions.indexOf(currentQuestion);
        dispatch(updateCurrentPage({ testId: "Result", currentPage }));
    } else {
        console.error("No question found with the provided startId.");
    }
};
