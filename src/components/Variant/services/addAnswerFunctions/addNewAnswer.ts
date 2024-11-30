import { Question } from "../../../../interface/questionsType";
import { updateAnsweredVariants, updateResult } from "../../../../store/currentData/currentData.slice";
import { AppDispatch } from "../../../../store/store";
import { AnsweredVariantsInterface, VisibleQuestionsInterface } from "../../interface";

export const addNewAnswer = ( 
    correct: boolean,
    index: number,
    dispatch: AppDispatch,
    typeOftest: string,
    questions: Question[],
    currentPage: number,
    results: Question[],
    answeredVariants: AnsweredVariantsInterface,
    visibleQuestions: VisibleQuestionsInterface
) => {
    const currentQuestionId = 
        typeOftest === "MockTest" && visibleQuestions
            ? visibleQuestions[currentPage]?.id
            : questions[currentPage].id;

    dispatch(
        updateAnsweredVariants({
            testId: "Result",
            answeredVariants: [
                ...answeredVariants,
                { id: currentQuestionId, index },
            ],
        })
    );

    const existingResult = results.find((e) => e.id === currentQuestionId);

    const newResult = {
        id: currentQuestionId,
        question: questions[currentPage].question,
        flag: questions[currentPage].flag ?? false,
        topic: questions[currentPage].topic,
        status: correct,
        par: questions[currentPage].par,
        photo: questions[currentPage].photo,
        explanation: questions[currentPage].explanation,
        correctAnswers: questions[currentPage].correctAnswers,
        incorrectAnswers: questions[currentPage].incorrectAnswers,
    };

    const updatedResults = existingResult
        ? results.map((result) =>
            result.id === currentQuestionId
                ? { ...result, status: correct }
                : result
        )
        : [...results, newResult];

    dispatch(updateResult({ questions: updatedResults }));
};
