import { useState } from 'react';
import styles from './ResetPassword.module.scss';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { FormValues, FormErrors } from './interface';
import send from './service/send';

interface ResetPasswordProps {
    reset: (e: boolean) => void;
}

export default function ResetPassword({ reset }: ResetPasswordProps) {
    const [formValues, setFormValues] = useState<FormValues>({ email: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const { textColor, hoverColor } = useSelector((state: RootState) => state.color);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await send(formValues);
        
        if (response.errors) {
            setErrors({ email: response.errors });
        } else {
            setServerMessage("Password reset link sent!");
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
        <div className={styles.form}>
            <form onSubmit={handleSubmit} className={styles.resetform}>
                <div style={{ color: textColor }} className={styles.formInput}>
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
                    {serverMessage && <p className={styles.success}>{serverMessage}</p>}
                </div>
                <button
                    style={{ background: hoverColor, color: textColor }}
                    type="submit"
                    className={styles.submitButton}
                >
                    Reset
                </button>
            </form>
            <div className={styles.btn}>
            <button
                style={{ background: hoverColor, color: textColor }}
                type="button"
                onClick={() => reset(false)}
                className={styles.submitButton}
            >
                Back to Login
            </button>
            </div>
        </div>
    );
}
