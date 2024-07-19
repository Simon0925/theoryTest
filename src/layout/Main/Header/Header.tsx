import styles from './Header.module.scss'

import PencilSvg from '../../../SVG/PencilSvg/PencilSvg'
import ClockSvg from '../../../SVG/ClockSvg/ClockSvg'
import LightSvg from '../../../SVG/LightSvg/LightSvg'
import CameraSvg from '../../../SVG/CameraSvg/CameraSvg'
import SettingsSvg from '../../../SVG/SettingsSvg/SettingsSvg'
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react'

export default function Header () {


    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['title']}>
                    <h3>Theory Test</h3>
                </div>
                <div className={styles['nav']}>

                {/* <NavLink  to={'/'}>
                    <span className={styles['page']}>Applications</span>
                </NavLink>
                 */}
                    <div className={styles['nav-btn']}>
                        <PencilSvg />
                        <span>Practice</span>
                    </div>
                    <div className={styles['nav-btn']}>
                        <ClockSvg />
                        <span>Mock Test</span>
                    </div>
                    <div className={styles['nav-btn']}>
                        <LightSvg />
                        <span>Trainer</span>
                    </div>
                    <div className={styles['nav-btn']}>
                        <CameraSvg />
                        <span>HPT</span>
                    </div>
                    <div className={styles['nav-btn']}>
                        <SettingsSvg />
                        <span>Settings</span>
                    </div>
                </div>
            </div>
        </>
    )
}