import {  updateCurrentPage } from '../../../store/currentData/currentData.slice';
import {AnsweredVariantsInterface,VisibleQuestionsInterface} from '../interface'
import {Question} from "../../../interface/questionsType"
import { updateAnsweredVariantsHandler } from './addAnswerFunctions/updateAnsweredVariantsHandler';

import { addNewAnswer } from './addAnswerFunctions/addNewAnswer';
import { updateResultsHandler } from './addAnswerFunctions/updateResultsHandler';


export const addAnswer = (
    answeredVariants: AnsweredVariantsInterface,
    typeOftest: string,
    visibleQuestions: VisibleQuestionsInterface,
    currentPage: number,
    correct: boolean,
    questions: Question[],
    results: any[],
    dispatch: any,
    practiceCorrect: boolean,
    index: number,
    
) => {

    const practiceCheck = answeredVariants.some(e =>
        typeOftest === "MockTest"
            ? visibleQuestions?.[currentPage]?.id === e.id
            : questions[currentPage].id === e.id
    );

  
    if ((typeOftest === "PracticeTest" || typeOftest === "MockTest") && !practiceCorrect && practiceCheck) {
        updateAnsweredVariantsHandler( index, dispatch, answeredVariants, questions, currentPage);
        updateResultsHandler( correct, dispatch, results, questions, currentPage);
    } else if (!practiceCheck) {
        addNewAnswer(correct, index, dispatch, typeOftest, questions, currentPage, results, answeredVariants, visibleQuestions);
    }
     

    const isMockTest = typeOftest === "MockTest";
    const questionLength = isMockTest ? visibleQuestions.length : questions.length;

    dispatch(
        updateCurrentPage({
            testId: typeOftest,
            currentPage: currentPage + 1 < questionLength ? currentPage + 1 : questionLength - 1,
        })
    );
};


