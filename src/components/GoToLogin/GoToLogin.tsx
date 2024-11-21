import { useNavigate } from 'react-router-dom';
import styles from './GoToLogin.module.scss';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export default function GoToLogin() {

    const color = useSelector((state: RootState) => state.color.themeData);

    const navigate = useNavigate();

    const login = () => {
        navigate('/settings#login');
    };

    return (
        <div  className={styles.wrap}>
            <h3 style={{color:color.textColor}}>Please log in to access the practice test.</h3>
            <button style={{background:color.headerColors,color:color.textColor}}  onClick={login}>
                Login
            </button>
        </div>
    );
}
