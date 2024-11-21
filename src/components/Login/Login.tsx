import { useState } from 'react';
import styles from './Login.module.scss';
import dataTosend from './service/dataTosend';
import { FormErrors } from './interface';
import FormValues from './interface';
import { isLoading, login } from '../../store/auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import ResetPassword from '../ResetPassword/ResetPassword';
import { RootState } from '../../store/store';

export default function Login() {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [reset, setReset] = useState(false);

    const { textColor,hoverColor,headerColors} = useSelector((state: RootState) => state.color.themeData);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(isLoading(true));
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
                    document.cookie = `accessToken=${token}; path=/; max-age=2592000; secure; samesite=lax;`;//for test 
                    // document.cookie = `token=${token}; path=/; max-age=2592000; secure; samesite=strict;`; for deploy

                    localStorage.setItem("accessToken", token);
                }
                dispatch(login({
                    login: true,
                    id: response.id,   
                    userName: response.userName
                  }));
                dispatch(isLoading(false));
            }
        } catch (error) {
            console.error("Server error:", error);
            setServerMessage("An error occurred while logging in. Please try again later.");
            dispatch(isLoading(false));
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
        <>
        {!reset && (
        <>
            <form style={{background:headerColors,color:textColor}}   onSubmit={handleSubmit} className={styles.form}> 
                {serverMessage && <p style={{color:textColor}} className={styles.serverMessage}>{serverMessage}</p>}
                <div style={{color:textColor}} className={styles.formInput}>
                    <label  htmlFor="email">Email</label>
                    <input
                        style={{border:`3px solid ${hoverColor}`}}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p  style={{color:textColor}} className={styles.error}>{errors.email}</p>}
                </div>
                <div style={{color:textColor}} className={styles.formInput}>
                    <label htmlFor="password">Password</label>
                    <input
                        style={{border:`3px solid ${hoverColor}`}}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p  style={{color:textColor}} className={styles.error}>{errors.password}</p>}
                </div>
                <p style={{color:textColor}} className={styles.reset} onClick={() => setReset(true)}>
                    Forgot Password?
                </p>
                <button style={{background:hoverColor,color:textColor}} type="submit" className={styles.submitButton}>
                    Login
                </button>
            </form>
        </>
         )}
        {reset && (
                <ResetPassword reset={setReset} />
            )}
        </>
    );
}
