import { useEffect, useState } from "react";
import Par from "../../components/Par/Par";
import PracticeSettings from "../../components/PracticeSettings/PracticeSettings";
import styles from "./Practice.module.scss";
import AlertSvg from "../../SVG/AlertSvg/AlertSvg";
import AttitudeSvg from "../../SVG/Attitude/AttitudeSvg";
import service from "../../service/service";
import CarWheelSvg from "../../SVG/CarWheelSvg/CarWheelSvg";
import RoadSvg from "../../SVG/RoadSvg/RoadSvg";
import BikeSvg from "../../SVG/BikeSvg/BikeSvg";
import PedestrianSvg from "../../SVG/PedestrianSvg/PedestrianSvg";
import ScooterSvg from "../../SVG/ScooterSvg/ScooterSvg";
import SteeringWheelSvg from "../../SVG/SteeringWheelSvg/SteeringWheelSvg";
import MotorwaySvg from "../../SVG/MotorwaySvg/MotorwaySvg";
import RulesSvg from "../../SVG/RulesSvg/RulesSvg";
import TrafficSignSvg from "../../SVG/TrafficSignSvg/TrafficSignSvg";
import DocumentsSvg from "../../SVG/DocumentsSvg/DocumentsSvg";
import AccidentSvg from "../../SVG/AccidentSvg/AccidentSvg";
import CarSvg from "../../SVG/CarSvg/CarSvg";
import Flag from "../../components/Flag/Flag";
import Spinner from "../../UI/Spinner/Spinner";

import idUser from "../../config/idUser";
import PracticeTest from "../../components/PracticeTest/PracticeTest";
import Results from "../Results/Results";

interface QuestionGroup {
  name: string;
  quantity: number;
  percent: number;
  id: string;
}

interface ParsItem {
  name: string;
  svg: JSX.Element;
}

export default function Practice() {
  const [questionsGroup, setQuestionsGroup] = useState<QuestionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(false);
  const [test, setTest] = useState(false);

  if (!result) localStorage.setItem("result", JSON.stringify([]));

  useEffect(() => {
    if (result) {
      setTest(false);
    }
  }, [result]);

  const pars: ParsItem[] = [
    {
      name: "Alertness",
      svg: <AlertSvg />,
    },
    {
      name: "Attitude",
      svg: <AttitudeSvg />,
    },
    {
      name: "Safety and your vehicle",
      svg: <CarWheelSvg />,
    },
    {
      name: "Safety margins",
      svg: <RoadSvg />,
    },
    {
      name: "Hazard awareness",
      svg: <BikeSvg />,
    },
    {
      name: "Vulnerable road users",
      svg: <PedestrianSvg />,
    },
    {
      name: "Other types of vehicle",
      svg: <ScooterSvg />,
    },
    {
      name: "Vehicle handling",
      svg: <SteeringWheelSvg />,
    },
    {
      name: "Motorway rules",
      svg: <MotorwaySvg />,
    },
    {
      name: "Rules of the road",
      svg: <RulesSvg />,
    },
    {
      name: "Road and traffic signs",
      svg: <TrafficSignSvg />,
    },
    {
      name: "Essential documents",
      svg: <DocumentsSvg />,
    },
    {
      name: "Incidents, accidents and emergencies",
      svg: <AccidentSvg />,
    },
    {
      name: "Vehicle loading",
      svg: <CarSvg />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupTest = await service.getQuestionsGroup(idUser);
        setQuestionsGroup(groupTest || []);
      } catch (error) {
        console.error("Error fetching data in useEffect:", error);
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
                  <div className={styles.spinner}>
                    <Spinner color={"#0078AB"} />
                  </div>
                ) : (
                  questionsGroup.map((elem, i) => {
                    const matchingPars = pars.find((par) => par.name === elem.name);
                    const svg = matchingPars ? matchingPars.svg : null;

                    return (
                      <Par
                        key={i}
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
          {test && <PracticeTest result={setResult} closeTest={setTest} />}
        </>
      )}
    </>
  );
}
