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


  const parsMap: { [key: string]: JSX.Element } = {
    "Alertness": <AlertSvg />,
    "Attitude": <AttitudeSvg />,
    "Safety and your vehicle": <CarWheelSvg />,
    "Safety margins": <RoadSvg />,
    "Hazard awareness": <BikeSvg />,
    "Vulnerable road users": <PedestrianSvg />,
    "Other types of vehicle": <ScooterSvg />,
    "Vehicle handling": <SteeringWheelSvg />,
    "Motorway rules": <MotorwaySvg />,
    "Rules of the road": <RulesSvg />,
    "Road and traffic signs": <TrafficSignSvg />,
    "Essential documents": <DocumentsSvg />,
    "Incidents, accidents and emergencies": <AccidentSvg />,
    "Vehicle loading": <CarSvg />,
  };

  export default parsMap