import { useRef } from "react";

interface ArrowProps {
    transform:string;
    onClick?: () => void;
}

const FastForwardSvg = ({
    transform,onClick
}:ArrowProps) => {

  const refSvg = useRef<SVGSVGElement>(null);

  const press = () => {
    if (refSvg.current) {
      refSvg.current.setAttribute("width", "25px");
    }
  };

  const up = () =>{
    if (refSvg.current) {
      refSvg.current.setAttribute("width", "30px");
    }
  }
  return(
  <svg
    fill="#E2FFFF"
    width="30px"
    height="30px"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    transform={transform}
    onClick={onClick} 
    onMouseDown={press}
    onMouseUp={up}
    ref={refSvg}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M253.20605,128a15.9352,15.9352,0,0,1-7.34765,13.459l-89.20606,57.34668A16.00057,16.00057,0,0,1,132,185.34668V142.65381L44.65234,198.80566A16.00057,16.00057,0,0,1,20,185.34668V70.65332a16.00057,16.00057,0,0,1,24.65234-13.459L132,113.34619V70.65332a16.00057,16.00057,0,0,1,24.65234-13.459L245.8584,114.541A15.9352,15.9352,0,0,1,253.20605,128Z"></path>
    </g>
  </svg>
)};

export default FastForwardSvg;
