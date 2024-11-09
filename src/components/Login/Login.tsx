import { useState } from 'react';
import styles from './Login.module.scss';
import dataTosend from './service/dataTosend';
import { FormErrors } from './interface';
import FormValues from './interface';
import { login } from '../../store/auth/auth';
import { useDispatch } from 'react-redux';
import ResetPassword from '../ResetPassword/ResetPassword';

export default function Login() {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [reset, setReset] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await dataTosend(formValues);

            if (response.errors) {
                setServerMessage(null);
                if (typeof response.errors === "string") {
                    setServerMessage(response.errors);
                } else {
                    setErrors(response.errors);
                }
            } else {
                const token = response.accessToken;
                if (token) {
                    localStorage.setItem("accessToken", token);
                }
                dispatch(login({ login: true, id: response.id, userName: response.userName }));
            }
        } catch (error) {
            console.error("Server error:", error);
            setServerMessage("An error occurred while logging in. Please try again later.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {!reset && (
                <>
                    {serverMessage && <p className={styles.serverMessage}>{serverMessage}</p>}
                    <div className={styles.formInput}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>
                    <div className={styles.formInput}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
                    </div>
                    <p className={styles.reset} onClick={() => setReset(true)}>
                        Forgot Password?
                    </p>
                    <button type="submit" className={styles.submitButton}>
                        Login
                    </button>
                </>
            )}
            {reset && (
                <ResetPassword reset={setReset} />
            )}
        </form>
    );
}
