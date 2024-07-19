import ButtonTest from '../../UI/ButtonTest/ButtonTest'
import styles from './FooterTest.module.scss'





export default function FooterTest () {
    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['container']}>
                    <ButtonTest name={'< Previos'} color={'#0078AB'} backgroundColor={'white'} svg={false} />
                    <ButtonTest name={''} color={'#0078AB'} backgroundColor={'white'} svg={true} />
                    <ButtonTest name={'Explanation'} color={'#0078AB'} backgroundColor={'white'} svg={false} />
                    <ButtonTest name={'Next >'} color={'#0078AB'} backgroundColor={'white'} svg={false} />
                </div>
            </div>
        </>
    )
}