import CircularProgressBar from '../../UI/CircularProgressBar/CircularProgressBar'
import Modal from '../../components/Modal/Modal'
import styles from './Settings.module.scss'


export default function Settings () {
    return(
        <>
        <div>
        Settings
       
       <CircularProgressBar correct={30} skipped={35} incorrect={35} />
        </div>
        </>
    )
}