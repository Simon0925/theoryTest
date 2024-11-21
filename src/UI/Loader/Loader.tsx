import { useSelector } from 'react-redux';
import styles from './Loader.module.scss';
import { RootState } from '../../store/store';


export default function Loader () {
  
    const {OnceTwiceProgressOnesBackground} = useSelector((state: RootState) => state.color.themeData);

    return <div style={{background:OnceTwiceProgressOnesBackground}} className={styles.loader}></div>;
  };