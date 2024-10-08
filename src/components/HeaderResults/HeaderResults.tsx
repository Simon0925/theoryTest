import ButtonTest from '../../UI/ButtonTest/ButtonTest'
import styles from './HeaderResults.module.scss'

interface HeaderResultsProps {
    exitResult:(e:boolean) => void 
}


export default function HeaderResults ({exitResult}:HeaderResultsProps) {

    const exit = () =>{
        localStorage.setItem("result", JSON.stringify([]));
        exitResult(false)
    }

    return(
        <>
            <div className={styles['wrap']}>
                <ButtonTest name={'Exit'} color={'white'} backgroundColor={'#A73530'} svg={false} click={exit} svgColor={false} />
                <span className={styles['title']}>Nice Try!</span>
                <span></span>
            </div>
        </>
    )
}