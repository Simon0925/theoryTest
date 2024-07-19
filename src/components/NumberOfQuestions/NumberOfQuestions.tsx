import { useState } from 'react';
import styles from './NumberOfQuestions.module.scss'


export default function NumberOfQuestions () {
    const [active, setActive] = useState({
        ten: true,
        twenty: false,
        thirty: false,
        all:false
    });

    const select = (type: string) => {
        if (type === 'all') {
            setActive({
                ten: false,
                twenty: false,
                thirty: false,
                all:true
            });
        } else if (type === 'ten') {
            setActive({
                ten: true,
                twenty: false,
                thirty: false,
                all:false
            });
        } else if (type === 'twenty') {
            setActive({
                ten: false,
                twenty: true,
                thirty: false,
                all:false
            });
        } else if (type === 'thirty') {
            setActive({
                ten: false,
                twenty: false,
                thirty: true,
                all:false
            });
        }
    };

    return (
        <div className={styles['question-type']}>
            <p className={styles['title']}>Number of questions</p>
            <div className={styles['container']}>
                <div onClick={() => select('ten')} className={active.ten ? styles['active'] : styles['not-active']}>
                    <p>10</p>
                </div>
                <div onClick={() => select('twenty')} className={active.twenty ? styles['active'] : styles['not-active']}>
                    <p>20</p>
                </div>
                <div onClick={() => select('thirty')} className={active.thirty ? styles['active'] : styles['not-active']}>
                    <p>30</p>
                </div>
                <div onClick={() => select('all')} className={active.all ? styles['active'] : styles['not-active']}>
                    <p>All</p>
                </div>
            </div>
        </div>
    );
}