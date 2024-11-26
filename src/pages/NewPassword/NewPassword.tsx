import { useLocation } from 'react-router-dom';
import styles from './NewPassword.module.scss';
import { useEffect, useState } from 'react';

import tokenVerification from './service/tokenVerification';
import NewPasswordForm from '../../components/NewPasswordForm/NewPasswordForm';

export default function NewPassword() {
    const location = useLocation();
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [tokenIsValid,setTokenIsValid] = useState(false)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromURL = queryParams.get('token');
        console.log("tokenFromURL:",tokenFromURL)
        setToken(tokenFromURL);
    }, [location]);

    const fetchData = async () => {
        if (token) {
            try {
                const response = await tokenVerification(token);
                if(response.isValid){
                    setTokenIsValid(response.isValid)
                }
            } catch (err) {
                setError("The link is no longer valid");
                console.error(err);
            }
        }
    };

    useEffect(() => {
        if (token) {
            setError(null)
            fetchData();
        }else if (!token ) {
            setError("The link is no longer valid");
        }
    }, [token]);

    return (
        <div className={styles.wrap}>
            {error && <p className={styles.error}>{error}</p>}
            {tokenIsValid && !error && <NewPasswordForm token={token} />}
        </div>
    );
}
