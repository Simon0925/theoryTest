import { Question } from "../../../../interface/questionsType";
import { updateResult } from "../../../../store/currentData/currentData.slice";

export const updateResultsHandler = (
    correct: boolean,
    dispatch: any,
    results: Question[],
    questions: Question[],
    currentPage: number
) => {
    const updatedResults = results.map((element) => 
        element.id === questions[currentPage].id
            ? { ...element, status: correct }
            : element
    );

    dispatch(updateResult({ questions: updatedResults }));
};
