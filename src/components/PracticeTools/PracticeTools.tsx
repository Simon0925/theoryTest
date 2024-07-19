import { useState } from 'react';
import styles from './PracticeTools.module.scss';

export default function PracticeTools() {
    const [active, setActive] = useState({
        all: true,
        noSeen: false,
        wrong: false,
    });

    const select = (type: string) => {
        if (type === 'all') {
            setActive({
                all: true,
                noSeen: false,
                wrong: false,
            });
        } else if (type === 'noSeen') {
            setActive({
                all: false,
                noSeen: true,
                wrong: false,
            });
        } else if (type === 'wrong') {
            setActive({
                all: false,
                noSeen: false,
                wrong: true,
            });
        }
    };

    return (
        <div className={styles['question-type']}>
            <p className={styles['title']}>Question type</p>
            <div className={styles['container']}>
                <div onClick={() => select('all')} className={active.all ? styles['active'] : styles['not-active']}>
                    <p>All</p>
                </div>
                <div onClick={() => select('noSeen')} className={active.noSeen ? styles['active'] : styles['not-active']}>
                    <p>No seen</p>
                </div>
                <div onClick={() => select('wrong')} className={active.wrong ? styles['active'] : styles['not-active']}>
                    <p>Wrong</p>
                </div>
            </div>
        </div>
    );
}
