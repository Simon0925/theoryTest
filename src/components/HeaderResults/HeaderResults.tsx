import { NavLink } from 'react-router-dom';
import ButtonTest from '../../UI/ButtonTest/ButtonTest'
import styles from './HeaderResults.module.scss'




export default function HeaderResults () {

    const exit = () =>{
        localStorage.setItem("result", JSON.stringify([]));
    }

    return(
        <>
            <div className={styles['wrap']}>
                <NavLink  to='/' >
                    <ButtonTest name={'Exit'} color={'white'} backgroundColor={'#A73530'} svg={false} click={exit} svgColor={false} />
                </NavLink>
                <span className={styles['title']}>Nice Try!</span>
                <span></span>
            </div>
        </>
    )
}