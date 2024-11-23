import { useRef } from "react";

interface PlayVectorSvgProps {
  color:string;
  height:string;
  width:string;
}

const PlayVectorSvg = ({color,height,width}:PlayVectorSvgProps) => {

  const refSvg = useRef<SVGSVGElement>(null);

  const press = () => {
    if (refSvg.current) {
      refSvg.current.setAttribute("width", "25px");
    }
  };

  return(
    
    
  <svg
    width={width}
    height={height}
    viewBox="-3 0 28 28"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill={color}
    stroke={color}
    onMouseDown={press}
    ref={refSvg}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <title>play</title>
      <desc>Created with Sketch Beta.</desc>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Icon-Set-Filled"
          transform="translate(-419.000000, -571.000000)"
          fill={color}
        >
          <path
            d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554"
            id="play"
          ></path>
        </g>
      </g>
    </g>
  </svg>
  
  )
  };

export default PlayVectorSvg;
