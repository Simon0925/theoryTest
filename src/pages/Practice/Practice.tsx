import React, { Suspense, useEffect, useState } from "react";
import Par from "../../components/Par/Par";
import styles from "./Practice.module.scss";
import service from "../../service/service";
import idUser from "../../config/idUser";
import { pars } from "./service/parsItem";
import Flag from "../../components/Flag/Flag";
import Spinner from "../../UI/Spinner/Spinner";
import { useDispatch } from "react-redux";
const PracticeTest  = React.lazy(() => import( "../../Test/PracticeTest/PracticeTest"));
const PracticeSettings = React.lazy(() => import("../../components/PracticeSettings/PracticeSettings"));
const Results = React.lazy(() => import("../../Test/Results/Results"));
import { updateResult,updateCurrentPage,updateAnsweredVariants } from '../../store/currentData/currentData.slice';
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

  const resetSettings = () => {
    dispatch(updateCurrentPage({ testId: "PracticeTest", currentPage: 0 }));
    dispatch(updateAnsweredVariants({testId: "PracticeTest",answeredVariants: []}));
  }


  useEffect(() => {
    if (!result) {
      dispatch(updateResult({testId: "PracticeTest",result: []}));
    }else if (result){
      setTest(false)
    }
  }, [result]);

  useEffect(() => {
    if(!test){
      resetSettings()
    }
  }, [test]);

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
        <Suspense fallback={<Spinner color="#0078AB" />}>
          <Results typeOftest="PracticeTest" exitResult={setResult} />
        </Suspense>
      ) : (
        <>
          {!test && (
            <div className={styles.wrap}>
              <div className={styles.qwestions}>
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
                <Suspense fallback={<Spinner color="#0078AB" />}>
                  <PracticeSettings practiceTest={setTest} />
                 </Suspense>
              </div>
            </div>
          )}
          {test && (
            <Suspense fallback={<Spinner color="#0078AB" />}>
              <PracticeTest result={setResult} closeTest={setTest} />
            </Suspense>
          )}
        </>
      )}
    </>
  );
}
