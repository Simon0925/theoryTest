import ButtonTest from '../../UI/ButtonTest/ButtonTest'
import styles from './TestPage.module.scss'
import mphZoneSign from '../../imgSigns/mphZoneSign.png'
import VariantsOfAnswers from '../../components/VariantsOfAnswers/VariantsOfAnswers'
import FooterTest from '../../components/FooterTest/FooterTest'



export default function TestPage () {
    return(
        <>
        <div className={styles['wrap']}>
            <div>
                <div className={styles['title']}>
                    <ButtonTest name={'Exit'} color={'white'} backgroundColor={'#A73530'} svg={false} />
                    <div className={styles['count-questions']}>
                        <span>Question</span>
                        <span>1</span>
                        <span>of</span>
                        <span>1</span>
                    </div>
                    <ButtonTest name={'Results'} color={'white'} backgroundColor={'#00B06F'} svg={false} />
                </div>
                <div className={styles['question-wrap']}>
                    <span className={styles['question']}>
                        What dose this sign mean?
                    </span>
                    <img className={styles['img']} src={mphZoneSign} />
                </div>
            </div>
            <div className={styles['container']}>
                <VariantsOfAnswers />
                <FooterTest />
            </div>
        </div>
        </>
    )
}