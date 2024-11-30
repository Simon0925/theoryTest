import { Question } from "../../../../interface/questionsType";
import { updateAnsweredVariants } from "../../../../store/currentData/currentData.slice";
import { AnsweredVariantsInterface } from "../../interface";

export const updateAnsweredVariantsHandler = (
    index: number,
    dispatch: any,
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
