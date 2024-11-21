import { useSelector } from "react-redux";
import { RootState } from "../store/store";


const useColors = () => {
    const { currentTheme, themeData } = useSelector((state: RootState) => state.color2);
    const color = currentTheme
    return { currentTheme, themeData };
};

export default useColors;
