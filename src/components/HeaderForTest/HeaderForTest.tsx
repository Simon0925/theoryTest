import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './HeaderForTest.module.scss';

interface HeaderForTestProps {
    exitLabel: string;
    exitColor: string;
    exitBackgroundColor: string;
    onExitClick: () => void;
    questionCount: number;
    currentQuestion: number;
    reviewLabel: string;
    reviewColor: string;
    reviewBackgroundColor: string;
    reviewLink: string;
    children?: React.ReactNode; 
}

export default function HeaderForTest({
    exitLabel = "Exit",
    exitColor = "white",
    exitBackgroundColor = "#A73530",
    onExitClick,
    questionCount,
    currentQuestion,
    reviewLabel = "Review",
    reviewColor = "white",
    reviewBackgroundColor = "#00B06F",
    reviewLink = "/results",
    children
}: HeaderForTestProps) {

    return (
        <div className={styles.title}>
            <ButtonTest
                name={exitLabel}
                color={exitColor}
                backgroundColor={exitBackgroundColor}
                svg={false}
                click={onExitClick}
                svgColor={false}
            />
            <div className={styles['count-questions']}>
                <span>Question</span>
                <span>{currentQuestion + 1}</span>
                <span>of</span>
                <span>{questionCount}</span>
            </div>
            <NavLink className={styles.nav} to={reviewLink}>
                <ButtonTest
                    name={reviewLabel}
                    color={reviewColor}
                    backgroundColor={reviewBackgroundColor}
                    svg={false}
                    click={null}
                    svgColor={false}
                />
            </NavLink>
            {children && <div className={styles.extraContent}>{children}</div>}
        </div>
    );
}
