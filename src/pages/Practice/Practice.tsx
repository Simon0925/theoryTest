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
        name: "Sefety and your vehicle",
        svg: <CarWheelSvg />,
      },
      {
        name: "Sefety margins",
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
        name: "Vehide handling",
        svg: <SteeringWheelSvg />,
      }
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupTest = await service.getQuestionsGroup('66b3c723a19d64ee1672d116');
        setQuestionsGroup(groupTest || []);
      } catch (error) {
        console.error("Error fetching data in useEffect:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles["wrap"]}>
      <div className={styles["qwestions"]}>
        {questionsGroup.map((elem, i) => {
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
        })}
      </div>
      <div className={styles["settings"]}>
        <PracticeSettings />
      </div>
    </div>
  );
}
