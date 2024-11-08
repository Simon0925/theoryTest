import{ Suspense, useEffect, useState, lazy, startTransition } from "react";
import styles from "./Practice.module.scss";
import { useDispatch} from "react-redux";
import { updateResult } from "../../store/currentData/currentData.slice";
import { resetPracticeState } from "../../store/practice/practice.slice";

const PracticeTest = lazy(() => import("../../components/PracticeTest/PracticeTest"));
const PracticeQuestionManager = lazy(() => import("../../components/PracticeQuestionManager/PracticeQuestionManager"));
const Results = lazy(() => import("../../components/Results/Results"));
const PracticeQuestionsManagerMobile = lazy(() => import("../../components/PracticeQuestionsManagerMobile/PracticeQuestionsManagerMobile"));
export default function Practice() {

  const [result, setResult] = useState(false);
  const [test, setTest] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!result) {
      startTransition(() => {
        dispatch(updateResult({ testId: "PracticeTest", result: [] }));
      });
    } else if (result) {
      setTest(false);
      dispatch(resetPracticeState());
    }
  }, [result]);

 

  return (
    <>
      {result ? (
        <Suspense >
          <Results typeOftest="PracticeTest" exitResult={setResult} />
        </Suspense>
      ) : (
        <>
          {!test && (
            <div className={styles.wrap}> 
              <div className={styles.practiceQuestionManager}>
                <Suspense >
                  <PracticeQuestionManager practiceTest={setTest} />
                </Suspense>
              </div>
              <div className={styles.PracticeQuestionsManagerMobile}>
                <Suspense >
                  <PracticeQuestionsManagerMobile practiceTest={setTest}/>
                </Suspense>
              </div>
            </div>
          )}
          {test && (
            <Suspense >
              <PracticeTest result={setResult} closeTest={setTest} />
            </Suspense>
          )}
        </>
      )}
    </>
  );
}
