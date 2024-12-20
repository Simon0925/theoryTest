import { useRef } from "react";

interface PauseSvgProps {
  color:string;
  width:string;
  height:string;
}

const PauseSvg = ({color,width,height}:PauseSvgProps) => {
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
    viewBox="-1 0 8 8"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill={color}
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
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-67.000000, -3765.000000)" fill={color}>
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path
              d="M11,3613 L13,3613 L13,3605 L11,3605 L11,3613 Z M15,3613 L17,3613 L17,3605 L15,3605 L15,3613 Z"
              id="pause-[#1010]"
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
  )
  };

export default PauseSvg;
