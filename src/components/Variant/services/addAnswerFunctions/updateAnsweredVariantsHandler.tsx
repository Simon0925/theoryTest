import { Question } from "../../../../interface/questionsType";
import { updateAnsweredVariants } from "../../../../store/currentData/currentData.slice";
import { AppDispatch } from "../../../../store/store";
import { AnsweredVariantsInterface } from "../../interface";

export const updateAnsweredVariantsHandler = (
    index: number,
    dispatch: AppDispatch,
    answeredVariants: AnsweredVariantsInterface,
    questions: Question[],
    currentPage: number
) => {
    const updatedAnswers = answeredVariants.map((element) => 
        element.id === questions[currentPage].id
            ? { ...element, index }
            : element
    );

    dispatch(
        updateAnsweredVariants({
            testId: "Result",
            answeredVariants: updatedAnswers,
        })
    );
};
