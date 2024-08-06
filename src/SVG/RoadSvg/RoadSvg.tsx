

const RoadSvg = ({
  width = "50px",
  height = "50px",
  fill = "#0096CE",
}) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="13" y="13" width="6" height="2"></rect>
    <path d="M25.4409,8,24.1687,3.45A2.009,2.009,0,0,0,22.2456,2H9.7544A2.0089,2.0089,0,0,0,7.8313,3.4507L6.5315,8H4v2H6v7a2.0025,2.0025,0,0,0,2,2v3h2V19H22v3h2V19a2.0025,2.0025,0,0,0,2-2V10h2V8ZM9.7544,4H22.2458l1.4285,5H8.3257ZM24,13H22v2h2v2H8V15h2V13H8V11H24Z"></path>
    <rect x="2" y="16" width="2" height="14"></rect>
    <rect x="28" y="16" width="2" height="14"></rect>
    <rect x="15" y="21" width="2" height="3"></rect>
    <rect x="15" y="26" width="2" height="4"></rect>
  </svg>
);

export default RoadSvg;
