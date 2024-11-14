import { useDispatch, useSelector } from 'react-redux';
import CrescentMoonAndStarSVG from '../../SVG/CrescentMoonAndStarSVG/CrescentMoonAndStarSVG';
import Toggle from '../../UI/Toggle/Toggle';
import styles from './ChangeColor.module.scss';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { updateColor, updateCurrentState } from '../../store/coolor/coolor.slise';


export default function ChangeColor (){

    const dispatch = useDispatch();

    const color = useSelector((state: RootState) => state.color);

    const [nightMode,setNightMode] = useState(false)

    const [active, setActive] = useState({
        frostedPearl: false,
        amberSunset: false,
        oceanicBlue: false,
        violetMajesty: false,
        nightMode: false,
    });

    useEffect(() => {
        setActive({
            frostedPearl: "frostedPearl" === color.currentState,
            amberSunset: "amberSunset" === color.currentState,
            oceanicBlue: "oceanicBlue" === color.currentState,
            violetMajesty: "violetMajesty" === color.currentState,
            nightMode: "nightMode" === color.currentState,
        });
        const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
        if (themeColorMetaTag) {
            themeColorMetaTag.setAttribute('content', color.headerColors);
          }
    }, [color.currentState]);

    const changeColor = (value: string) => {
        dispatch(updateColor(value));
        dispatch(updateCurrentState(value));
    };

    const toggleNightMode = (nightMode:boolean) => {

        const newNightModeState = nightMode

        const value = newNightModeState ? "nightMode" : "oceanicBlue"; 
        dispatch(updateColor(value));
        dispatch(updateCurrentState(value));

        setActive((prevActive) => ({
            ...prevActive,
            nightMode: newNightModeState,
        }));
    };

   useEffect(()=>{
    toggleNightMode(nightMode)
   },[nightMode])

    return(
        <>
        <div className={styles.wrap}>
            <div className={styles.nightMode}>
                <div className={styles.container}>
                    <CrescentMoonAndStarSVG />
                    <span>Night Mode</span>
                </div>
                <Toggle toggle={setNightMode} />
            </div>
            <div className={styles.coolors}>
                    <div onClick={() => changeColor("frostedPearl")} className={styles.coolor1}>
                        {active.frostedPearl && !active.nightMode && <div className={styles.dote}></div>}
                    </div>
                    <div onClick={() => changeColor("amberSunset")} className={styles.coolor2}>
                        {active.amberSunset && !active.nightMode && <div className={styles.dote}></div>}
                    </div>
                    <div onClick={() => changeColor("oceanicBlue")} className={styles.coolor3}>
                        {active.oceanicBlue && !active.nightMode && <div className={styles.dote}></div>}
                    </div>
                    <div onClick={() => changeColor("violetMajesty")} className={styles.coolor4}>
                        {active.violetMajesty && !active.nightMode && <div className={styles.dote}></div>}
                    </div>
                </div>
        </div>
        </>
    )
}