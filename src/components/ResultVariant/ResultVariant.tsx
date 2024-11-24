import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './ResultVariant.module.scss';
import hostname from '../../config/hostname';
import CrossSvg from '../../SVG/CrossSvg/CrossSvg';
import OkVectorSvg from '../../SVG/OkVectorSvg/OkVectorSvg';

interface ResultVariantProps {
    flag:boolean;
    photo?: string | boolean;
    question:string;
    status:string | boolean
}   


export default function ResultVariant ({flag,photo,question,status}:ResultVariantProps) {

  const color = useSelector((state: RootState) => state.color.themeData);


    return(
        <div style={{background:color.VariantBackground}} className={styles.variant}>
        <div className={flag ? styles["marker"] : styles["inactive-marker"]}></div>
        <div className={styles.content}>
            {photo && (
            <img
                className={styles.img}
                src={`${hostname}${photo}`}
                alt="Related to the question" 
                loading="lazy" 
            />
            )}
          <span style={{color:color.TestcolorText}}>{question}</span>
        </div>
        <div className={styles.box}>
        {status === null || status === undefined || status === "pass"
              ? null 
              : status === false 
                ? <CrossSvg /> 
                : <OkVectorSvg />}
        </div>
      </div>
    )
}