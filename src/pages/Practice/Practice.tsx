import { Suspense, useEffect, useState, lazy, startTransition } from "react";
import styles from "./Practice.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateResult } from "../../store/currentData/currentData.slice";
import { resetPracticeState } from "../../store/practice/practice.slice";
import { RootState } from "../../store/store";
import GoToLogin from "../../components/GoToLogin/GoToLogin";
import Spinner from "../../UI/Spinner/Spinner";

const PracticeTest = lazy(() => import("../../components/PracticeTest/PracticeTest"));
const PracticeQuestionManager = lazy(() => import("../../components/PracticeQuestionManager/PracticeQuestionManager"));
const Results = lazy(() => import("../../components/Results/Results"));
const PracticeQuestionsManagerMobile = lazy(() => import("../../components/PracticeQuestionsManagerMobile/PracticeQuestionsManagerMobile"));

export default function Practice() {
  const [result, setResult] = useState(false);
  const [test, setTest] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!result) {
      startTransition(() => {
        dispatch(updateResult({ testId: "PracticeTest", result: [] }));
      });
    } else {
      setTest(false);
      dispatch(resetPracticeState());
    }
  }, [result, dispatch]);

  if (!auth.isLogin && !auth.loading) return <GoToLogin />;
  if (auth.loading || !auth.isLogin) return <div className={styles.spinner}><Spinner color="white" /></div>;

  return (
    <Suspense fallback={<div className={styles.spinner}><Spinner color="white" /></div>}>
      {result ? (
        <Results typeOftest="PracticeTest" exitResult={setResult} />
      ) : (
        <div className={styles.wrap}>
          {!test ? (
            <>
              <div className={styles.practiceQuestionManager}>
                <PracticeQuestionManager practiceTest={setTest} />
              </div>
              <div className={styles.PracticeQuestionsManagerMobile}>
                <PracticeQuestionsManagerMobile practiceTest={setTest} />
              </div>
            </>
          ) : (
            <PracticeTest result={setResult} closeTest={setTest} />
          )}
        </div>
      )}
    </Suspense>
  );
}
