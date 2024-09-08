import Modal from '../../components/Modal/Modal'
import styles from './Settings.module.scss'


export default function Settings () {
    return(
        <>
        <div>
        Settings
       
        <Modal text={'If you follow another vehicle with your headlights on full beam, they could dazzle the driver. Leave a safe distance and make sure that the light from your dipped beam falls short of the vehicle in front.'} title={'DVSA explanation'} />
        </div>
        </>
    )
}