import{ Suspense, useEffect, useState, lazy, startTransition } from "react";
import styles from "./Practice.module.scss";
import { useDispatch} from "react-redux";

import { updateResult } from "../../store/currentData/currentData.slice";
import { resetPracticeState } from "../../store/practice/practice.slice";

const PracticeTest = lazy(() => import("../../components/PracticeTest/PracticeTest"));
const PracticeSettings = lazy(() => import("../../components/PracticeSettings/PracticeSettings"));
const Results = lazy(() => import("../../components/Results/Results"));
const PracticeGroup = lazy(() => import("../../components/PracticeGroup/PracticeGroup"));

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
              <div className={styles.group}>
                <PracticeGroup />
              </div>
              <div className={styles.settings}>
                <Suspense >
                    <PracticeSettings practiceTest={setTest} />
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
