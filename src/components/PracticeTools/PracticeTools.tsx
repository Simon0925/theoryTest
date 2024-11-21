import { useState } from 'react';
import styles from './PracticeTools.module.scss';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { handleTypeSelect } from './services/handleTypeSelect';

export default function PracticeTools() {
  const dispatch = useDispatch();
  const practice = useSelector((state: RootState) => state.practice);
  const color = useSelector((state: RootState) => state.color.themeData);

  const [active, setActive] = useState({
    all: practice.type === 'all',
    noSeen: practice.type === 'noSeen',
    wrong: practice.type === 'wrong',
  });

  return (
    <div className={styles.wrap}>
      <p style={{ color: color.titleColorSettings }} className={styles.title}>
        Question type
      </p>
      <div
        style={{
          '--text-active-color': color.textActiveSettingsColor,
          '--text-not-active-color': color.textNotActiveSettingsColor,
          '--background-not-active-color': color.btnSettingsColorNotActive,
          '--background-active-color': color.btnSettingsColor,
          '--background': color.btnSettingsBackgroundColor,
        } as React.CSSProperties}
        className={styles['container']}
      >
        <div
          onClick={() => handleTypeSelect('all', dispatch, setActive)}
          className={active.all ? styles['active'] : styles['not-active']}
        >
          <p>All</p>
        </div>
        <div
          onClick={() => handleTypeSelect('noSeen', dispatch, setActive)}
          className={active.noSeen ? styles['active'] : styles['not-active']}
        >
          <p>No seen</p>
        </div>
        <div
          onClick={() => handleTypeSelect('wrong', dispatch, setActive)}
          className={active.wrong ? styles['active'] : styles['not-active']}
        >
          <p>Wrong</p>
        </div>
      </div>
    </div>
  );
}
