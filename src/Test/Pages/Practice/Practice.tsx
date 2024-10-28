import{ Suspense, useEffect, useState, lazy, startTransition } from "react";
import Par from "../../Par/Par";
import styles from "./Practice.module.scss";
import service from "../../../service/PracticeService/getQuestionsGroup";
import idUser from "../../../config/idUser";
import { pars } from "./service/parsItem";
import Flag from "../../Flag/Flag";
import Spinner from "../../../UI/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { updateResult } from '../../../store/currentData/currentData.slice';
import { resetPracticeState } from '../../../store/practice/practice.slice'; 
import { RootState } from "../../../store/store";


const PracticeTest = lazy(() => import("../../PracticeTest/PracticeTest"));
const PracticeSettings = lazy(() => import("../../PracticeSettings/PracticeSettings"));
const Results = lazy(() => import("../../Results/Results"));

interface QuestionGroup {
  name: string;
  quantity: number;
  percent: number;
  id: string;
}

export default function Practice() {
  const [questionsGroup, setQuestionsGroup] = useState<QuestionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(false);
  const [test, setTest] = useState(false);
  const dispatch = useDispatch();
  const color = useSelector((state: RootState) => state.color);

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


  useEffect(() => {
    const preloadComponents = async () => {
      await import("../../PracticeTest/PracticeTest");
      await import("../../PracticeSettings/PracticeSettings");
      await import("../../Results/Results");
    };
    if (!loading && !test) {
      preloadComponents();
    }
  }, [loading, test]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupTest = await service.getQuestionsGroup(idUser);
        setQuestionsGroup(groupTest || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
              <div style={{backgroundColor: color.questionsGroupBackground}} className={styles.qwestions}>
                <Flag />
                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      height: "80vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Spinner color="#0078AB" />
                  </div>
                ) : (
                  questionsGroup.map((elem, i) => {
                    const matchingPars = pars.find((par) => par.name === elem.name);
                    const svg = matchingPars ? matchingPars.svg : null;

                    return (
                      <Par
                        key={elem.id}
                        id={elem.id}
                        name={elem.name}
                        quantity={elem.quantity}
                        percent={elem.percent}
                        svg={svg}
                      />
                    );
                  })
                )}
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
