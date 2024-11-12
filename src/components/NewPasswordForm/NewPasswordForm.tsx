import { useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './NewPasswordForm.module.scss';
import { RootState } from '../../store/store';
import { FormValues, FormErrors } from './interface';
import dataToSend  from './service/dataToSend'
import validateForm from './service/validateForm';
import { useNavigate } from 'react-router-dom';

interface NewPasswordFormProps {
    token: string | null;
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate();


    const { textColor, hoverColor } = useSelector((state: RootState) => state.color);

    const [formValues, setFormValues] = useState<FormValues>({
        password: '',
        confirmPassword: '',
        token: token || ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [serverMessage, setServerMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const validationErrors = validateForm(formValues);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setServerMessage(null);
        } else {
            try {
                const response = await dataToSend(formValues);

                if (response.data.errors) {
                    setServerMessage(typeof response.data.errors === "string" ? response.data.errors : null);
                    setErrors(typeof response.data.errors === "string" ? {} : response.data.errors);
                } else {
                    setServerMessage('Password reset successful!');
                    setFormValues({ password: '', confirmPassword: '' });
                    setErrors({});
                    if(response.status === 200){
                        navigate('/settings#login');
                    }
                }
            } catch (error) {
                setServerMessage("Server error. Please try again later.");
                console.error("Server error:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3 style={{ color: textColor }} className={styles.title}>Enter new password</h3>
            <div className={styles.formInput} style={{ color: textColor }}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    value={formValues.password}
                    onChange={handleChange}
                />
                {errors.password && <p className={styles.error} style={{ color: textColor }}>{errors.password}</p>}
            </div>
            <div className={styles.formInput} style={{ color: textColor }}>
                <label htmlFor="confirmPassword">Repeat Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Repeat new password"
                    autoComplete="new-password"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <p className={styles.error} style={{ color: textColor }}>{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className={styles.submitButton} style={{ background: hoverColor, color: textColor }}>
                Create password
            </button>
            {serverMessage && <p className={styles.serverMessage}>{serverMessage}</p>}
        </form>
    );
}
