import AccidentSvg from "../../../SVG/AccidentSvg/AccidentSvg";
import AlertSvg from "../../../SVG/AlertSvg/AlertSvg";
import AttitudeSvg from "../../../SVG/Attitude/AttitudeSvg";
import BikeSvg from "../../../SVG/BikeSvg/BikeSvg";
import CarSvg from "../../../SVG/CarSvg/CarSvg";
import CarWheelSvg from "../../../SVG/CarWheelSvg/CarWheelSvg";
import DocumentsSvg from "../../../SVG/DocumentsSvg/DocumentsSvg";
import MotorwaySvg from "../../../SVG/MotorwaySvg/MotorwaySvg";
import PedestrianSvg from "../../../SVG/PedestrianSvg/PedestrianSvg";
import RoadSvg from "../../../SVG/RoadSvg/RoadSvg";
import RulesSvg from "../../../SVG/RulesSvg/RulesSvg";
import ScooterSvg from "../../../SVG/ScooterSvg/ScooterSvg";
import SteeringWheelSvg from "../../../SVG/SteeringWheelSvg/SteeringWheelSvg";
import TrafficSignSvg from "../../../SVG/TrafficSignSvg/TrafficSignSvg";

interface ParsItem {
    name: string;
    svg: JSX.Element;
  }

export const pars: ParsItem[] = [
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