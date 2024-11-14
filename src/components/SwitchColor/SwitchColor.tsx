import { useDispatch, useSelector } from 'react-redux';
import CrescentMoonAndStarSVG from '../../SVG/CrescentMoonAndStarSVG/CrescentMoonAndStarSVG';
import Toggle from '../../UI/Toggle/Toggle';
import styles from './SwitchColor.module.scss';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { updateColor, updateCurrentState } from '../../store/coolor/coolor.slise';

interface SwitchColorProps {
    svgColor: string;
}

export default function SwitchColor({ svgColor }: SwitchColorProps) {
    const dispatch = useDispatch();
    const color = useSelector((state: RootState) => state.color);
    const [nightMode, setNightMode] = useState(false);

    const [active, setActive] = useState({
        frostedPearl: false,
        amberSunset: false,
        oceanicBlue: false,
        violetMajesty: false,
        nightMode: false,
    });

    useEffect(() => {
        setActive({
            frostedPearl: color.currentState === 'frostedPearl' && !nightMode,
            amberSunset: color.currentState === 'amberSunset' && !nightMode,
            oceanicBlue: color.currentState === 'oceanicBlue' && !nightMode,
            violetMajesty: color.currentState === 'violetMajesty' && !nightMode,
            nightMode: color.currentState === 'nightMode',
        });
        const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
        if (themeColorMetaTag) {
            themeColorMetaTag.setAttribute('content', color.headerColors);
        }
    }, [color.currentState, nightMode]);

    const changeColor = (value: string) => {
        if (nightMode) setNightMode(false); 
        dispatch(updateColor(value));
        dispatch(updateCurrentState(value));
    };

    const toggleNightMode = () => {
        const newNightModeState = !nightMode;
        setNightMode(newNightModeState);

        const value = newNightModeState ? 'nightMode' : 'oceanicBlue'; 
        dispatch(updateColor(value));
        dispatch(updateCurrentState(value));

    };

    return (
        <div className={styles.wrap}>
            <div className={styles.nightMode}>
                <div className={styles.container}>
                    <CrescentMoonAndStarSVG fill={svgColor} />
                    <span style={{ color: svgColor }}>Night Mode</span>
                </div>
                <Toggle initialSwitch={active.nightMode} toggle={toggleNightMode} />
            </div>
            <div style={{ background: color.hoverColor }} className={styles.coolors}>
                <div onClick={() => changeColor('frostedPearl')} className={styles.coolor1}>
                    {active.frostedPearl && <div className={styles.dote}></div>}
                </div>
                <div onClick={() => changeColor('amberSunset')} className={styles.coolor2}>
                    {active.amberSunset && <div className={styles.dote}></div>}
                </div>
                <div onClick={() => changeColor('oceanicBlue')} className={styles.coolor3}>
                    {active.oceanicBlue && <div className={styles.dote}></div>}
                </div>
                <div onClick={() => changeColor('violetMajesty')} className={styles.coolor4}>
                    {active.violetMajesty && <div className={styles.dote}></div>}
                </div>
            </div>
        </div>
    );
}
