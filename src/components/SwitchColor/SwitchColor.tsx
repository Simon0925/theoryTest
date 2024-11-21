import { useDispatch, useSelector } from 'react-redux';
import CrescentMoonAndStarSVG from '../../SVG/CrescentMoonAndStarSVG/CrescentMoonAndStarSVG';
import Toggle from '../../UI/Toggle/Toggle';
import styles from './SwitchColor.module.scss';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { updateTheme } from '../../store/color/color.slise';
import {Themes} from '../../store/color/interface'
interface SwitchColorProps {
    svgColor: string;
}

export default function SwitchColor({ svgColor }: SwitchColorProps) {
    const dispatch = useDispatch();
    const {themeData,currentTheme} = useSelector((state: RootState) => state.color);

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
            frostedPearl: currentTheme === 'frostedPearl' && !nightMode,
            amberSunset: currentTheme === 'amberSunset' && !nightMode,
            oceanicBlue: currentTheme === 'oceanicBlue' && !nightMode,
            violetMajesty: currentTheme === 'violetMajesty' && !nightMode,
            nightMode: currentTheme === 'nightMode',
        });
        const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
        if (themeColorMetaTag) {
            themeColorMetaTag.setAttribute('content', themeData.headerColors);
        }
    }, [currentTheme, nightMode]);

    const changeColor = (value: keyof Themes) => {
        if (nightMode) setNightMode(false); 
        dispatch(updateTheme(value));
    };

    const toggleNightMode = () => {
        const newNightModeState = !nightMode;
        setNightMode(newNightModeState);

        const value = newNightModeState ? 'nightMode' : 'oceanicBlue'; 
        dispatch(updateTheme(value));

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
            <div style={{ background: themeData.hoverColor }} className={styles.coolors}>
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
