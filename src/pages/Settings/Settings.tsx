import { useDispatch, useSelector } from "react-redux";
import styles from "./Settings.module.scss";
import { updateColor, updateCurrentState } from '../../store/coolor/coolor.slise'; 
import { useState, useEffect } from "react";
import { RootState } from "../../store/store";

export default function Settings() {
    const dispatch = useDispatch();
    const color = useSelector((state: RootState) => state.color);

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
    }, [color.currentState]);

    const changeColor = (value: string) => {
        dispatch(updateColor(value));
        dispatch(updateCurrentState(value));
    };

    const toggleNightMode = () => {
        const newNightModeState = !active.nightMode;
        const value = newNightModeState ? "nightMode" : "oceanicBlue"; 
        dispatch(updateColor(value));
        dispatch(updateCurrentState(value));

        setActive((prevActive) => ({
            ...prevActive,
            nightMode: newNightModeState,
        }));
    };

    return (
        <>
            <div className={`${styles.wrap} ${active.nightMode ? styles.nightMode : ''}`}>
                <div className={styles.night}>
                    <span>Night mode</span>
                    <input
                        type="checkbox"
                        checked={active.nightMode}
                        onChange={toggleNightMode}
                    />
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
    );
}
