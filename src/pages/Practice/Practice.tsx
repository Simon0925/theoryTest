import { useEffect, useState } from "react";
import React from "react";
import Par from "../../components/Par/Par";
import styles from "./Practice.module.scss";
import service from "../../service/service";
import idUser from "../../config/idUser";
import { pars } from "./service/parsItem";
import Flag from "../../components/Flag/Flag";
import Spinner from "../../UI/Spinner/Spinner";

const PracticeSettings = React.lazy(() => import("../../components/PracticeSettings/PracticeSettings"));
const PracticeTest = React.lazy(() => import("../../components/PracticeTest/PracticeTest"));
const Results = React.lazy(() => import("../Results/Results"));

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

  useEffect(() => {
    if (!result) {
      localStorage.setItem("result", JSON.stringify([]));
    }
  }, [result]);


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
          <Results exitResult={setResult} />
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
                  <PracticeSettings practiceTest={setTest} />
              </div>
            </div>
          )}
          {test && (
              <PracticeTest result={setResult} closeTest={setTest} />
          )}
        </>
      )}
    </>
  );
}
