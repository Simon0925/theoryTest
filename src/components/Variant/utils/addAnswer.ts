import { updateAnsweredVariants, updateResult, updateCurrentPage } from '../../../store/currentData/currentData.slice';
import {AnsweredVariantsInterface,VisibleQuestionsInterface,Question} from '../interface'

export const addAnswer = (
    answeredVariants: AnsweredVariantsInterface,
    typeOftest: string,
    visibleQuestions: VisibleQuestionsInterface| undefined,
    currentPage: number,
    correct: boolean,
    questions: Question[],
    results: any[],
    dispatch: any,
    practice: boolean,
    index: number
) => {
    const practiceCheck = answeredVariants.some(e =>
        typeOftest === "MockTest"
            ? visibleQuestions?.[currentPage]?.id === e.id
            : questions[currentPage].id === e.id
    );

    if (!practiceCheck) {
        const currentQuestionId = typeOftest === "MockTest" && visibleQuestions
            ? visibleQuestions[currentPage]?.id
            : questions[currentPage].id;


        dispatch(
            updateAnsweredVariants({
                testId: typeOftest,
                answeredVariants: [...answeredVariants, { id: currentQuestionId, index }]
            })
        );

        const existingResult = results.find(e => e.id === currentQuestionId);
        const newResult = {
            id: currentQuestionId,
            question: questions[currentPage].question,
            flag: questions[currentPage].flag ?? false,
            group: questions[currentPage].group,
            status: correct
        };

        const updatedResults = existingResult
            ? results.map(result =>
                result.id === currentQuestionId
                    ? { ...result, status: correct }
                    : result
            )
            : [...results, newResult];

        dispatch(updateResult({
            testId: typeOftest,
            result: updatedResults
        }));
    }


    if (typeOftest === "MockTest") {
        dispatch(
            updateCurrentPage({
                testId: typeOftest,
                currentPage: currentPage + 1 < questions.length ? currentPage + 1 : questions.length - 1
            })
        );
    }
    if (typeOftest === "PracticeTest" && !practice) {
        dispatch(
            updateCurrentPage({
                testId: typeOftest,
                currentPage: currentPage + 1 < questions.length ? currentPage + 1 : questions.length - 1
            })
        );
    }
};