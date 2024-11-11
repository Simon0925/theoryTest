// NewPassword.tsx
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
        setToken(tokenFromURL);
        console.log("Extracted token:", tokenFromURL);
    }, [location]);

    const fetchData = async () => {
        if (token) {
            try {
                const response = await tokenVerification(token);

                if(response.isValid){
                    setTokenIsValid(response.isValid)
                }
                console.log("Token verification response:", response);
            } catch (err) {
                setError("Failed to verify token. Please try again.");
                console.error(err);
            }
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token]);

    return (
        <div className={styles.wrap}>
            {error && <p className={styles.error}>{error}</p>}
            <NewPasswordForm token={token} />
        </div>
    );
}
