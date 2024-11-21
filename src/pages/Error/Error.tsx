// import MockTestChartTest from '../../UI/MockTestChartTest/MockTestChartTest';
import styles from './Error.module.scss';
import useColors from '../../hooks/useColors'
import { useEffect, useState } from 'react';
import { color } from 'chart.js/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateTheme } from '../../store/color/color.slise';

export default function Error () {
    // const color = useColors()

    const dispatch = useDispatch()

    const color = useSelector((state: RootState) => state.color2.themeData);

    useEffect(()=>{
        console.log("color:",color)
    },[color])
    const change = () =>{
        dispatch(updateTheme("amberSunset"))
    }
    return(
        <>
            <div className={styles.wrap}>
                <div className={styles.container}>
                   <button onClick={change} >do</button>
                </div>
            </div>
        </>
    )
}