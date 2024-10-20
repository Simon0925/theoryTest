import { useCallback, useEffect, useState, useMemo } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './FooterTest.module.scss';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrentQuestions, updateCurrentPage, updateResult } from '../../store/currentData/currentData.slice';
import Modal from '../Modal/Modal';
import { updateQuestionsAndResults } from '../../service/serviceFooter/updateQuestionsAndResults';

interface FooterTestProps {
  result?: (e: boolean) => void;
  typeOftest: string;
}

export default function FooterTest({ result, typeOftest }: FooterTestProps) {
  const { questions, currentPage, answeredVariants, results } = useSelector(
    (state: RootState) => state.currentData.testsData[typeOftest],
    shallowEqual
  );

  const dispatch = useDispatch();

  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [modalWindow, setModalWindow] = useState(false);

  const isAnswerSelected = useMemo(() => {
    return answeredVariants.some((e) => questions[currentPage]?.id === e.id);
  }, [answeredVariants, currentPage, questions]);

  const changeFlag = useCallback(() => {
    if (!questions[currentPage]) return;

    const { updatedQuestions, updatedResults } = updateQuestionsAndResults(questions, results, currentPage);

    dispatch(setCurrentQuestions({ testId: typeOftest, questions: updatedQuestions }));
    dispatch(updateResult({ testId: typeOftest, result: updatedResults }));
  }, [currentPage, questions, results, dispatch, typeOftest]);

  const previous = useCallback(() => {
    if (currentPage > 0) {
      dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage - 1 }));
    }
  }, [currentPage, dispatch, typeOftest]);

  const next = useCallback(() => {
    if (currentPage < questions.length - 1) {
      dispatch(updateCurrentPage({ testId: typeOftest, currentPage: currentPage + 1 }));
    } else if (questions.length - 1 === currentPage) {
      setModalWindow(true);
    }
  }, [currentPage, questions.length, dispatch, typeOftest]);

  const cancelClickModal = useCallback(() => {
    setModalWindow(false);
  }, []);

  const resultClickModal = useCallback(() => {
    if (result) {
      result(true);
    }
  }, [result]);

  const explanationModal = useCallback(() => {
    setIsExplanationVisible(true);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <ButtonTest
          click={previous}
          name={'< Previous'}
          color={'#0078AB'}
          backgroundColor={'white'}
          svg={false}
          svgColor={false}
        />
        <ButtonTest
          click={changeFlag}
          name={''}
          color={'#0078AB'}
          backgroundColor={'white'}
          svg={true}
          svgColor={questions[currentPage]?.flag === true}
        />
        <ButtonTest
          click={explanationModal}
          name={'Explanation'}
          color={'#0078AB'}
          backgroundColor={'white'}
          svg={false}
          svgColor={false}
        />
        <ButtonTest
          click={next}
          name={questions.length === currentPage + 1 ? 'Results' : 'Next >'}
          color={'#0078AB'}
          backgroundColor={isAnswerSelected ? '#FFEC4B' : 'white'}
          svg={false}
          svgColor={false}
        />
        {modalWindow && (
          <Modal
            close={resultClickModal}
            text={'End of test reached'}
            title={'End of test reached'}
            cancel={true}
            cancelClick={cancelClickModal}
            blueBtnText={'Show results'}
          />
        )}
        {isExplanationVisible && (
          <Modal
            close={() => setIsExplanationVisible(false)}
            text={questions[currentPage]?.explanation || 'No explanation available'}
            title="DVSA explanation"
            cancel={false}
            blueBtnText="Ok"
          />
        )}
      </div>
    </div>
  );
}
