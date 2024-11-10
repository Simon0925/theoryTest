import { useNavigate } from 'react-router-dom';
import styles from './GoToLogin.module.scss';

export default function GoToLogin() {
    const navigate = useNavigate();

    const login = () => {
        navigate('/settings#login');
    };

    return (
        <div className={styles.wrap}>
            <h3>Please log in to access the practice test.</h3>
            <button onClick={login}>
                Login
            </button>
        </div>
    );
}
