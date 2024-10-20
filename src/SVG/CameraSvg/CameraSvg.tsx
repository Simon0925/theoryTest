import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


const CameraSvg = () => {
  const color = useSelector((state: RootState) => state.color);
  return(
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    fill={color.headerSvgColor}
  >
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <path
          fill={color.headerSvgColor}
        d="M768 576l192-64v320l-192-64v96a32 32 0 01-32 32H96a32 32 0 01-32-32V480a32 32 0 0132-32h640a32 32 0 0132 32v96zM192 768v64h384v-64H192zm192-480a160 160 0 01320 0 160 160 0 01-320 0zm64 0a96 96 0 10192.064-.064A96 96 0 00448 288zm-320 32a128 128 0 11256.064.064A128 128 0 01128 320zm64 0a64 64 0 10128 0 64 64 0 00-128 0z"
      />
    </g>
  </svg>
)};

export default CameraSvg;
