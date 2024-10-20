import CarLogoSvg from '../../SVG/CarLogoSvg/CarLogoSvg';
import styles from './Logo.module.scss';


export default function Logo () {
    return(
        <>
         <div className={styles['wrap']}>
            <div className={styles['logo']}>
                <CarLogoSvg />
            </div>
            <div className={styles['bottom']}>
                <span style={{ color: "red" }}>L</span>
                <span>2024</span>
            </div>
         </div>
        
        </>
       
    )
}