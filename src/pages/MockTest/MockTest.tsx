
import FooterMockTest from '../../components/FooterMockTest/FooterMockTest'
import MockTestChart from '../../components/MockTestChart/MockTestChart'
import styles from './MockTest.module.scss'

const data = [
    { percentage: '0%' },
    { percentage: '20%' },
    { percentage: '30%' },
    { percentage: '50%' },
    { percentage: '20%' },
    { percentage: '50%' },
    { percentage: '75%' },
    { percentage: '30%' },
    { percentage: '50%' },
    { percentage: '20%' },
    { percentage: '50%' },
    { percentage: '15%' },
    { percentage: '86%' },
    { percentage: '100%' }
  ];

export default function MockTest () {
    return(
        <>
        <div>
        <MockTestChart data={data} />
        <FooterMockTest />
        </div>
        </>
    )
}