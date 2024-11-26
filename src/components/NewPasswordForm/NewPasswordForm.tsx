import { useSelector } from 'react-redux';
import styles from './NewPasswordForm.module.scss';
import { RootState } from '../../store/store';
import { FormValues } from './interface';
import dataToSend  from './services/dataToSend'
import validateForm from './services/validateForm';
import { useNavigate } from 'react-router-dom';
import { useFormHandler } from '../../hooks/useFormHandler/useFormHandler';

interface NewPasswordFormProps {
    token: string | null;
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate();


    const { textColor, hoverColor } = useSelector((state: RootState) => state.color.themeData);

    
    const {
        formValues,
        errors,
        serverMessage,
        handleChange,
        handleSubmit,
    } = useFormHandler<FormValues>({
        initialValues: { password: '',confirmPassword: '', token: token || ''},
        validate: validateForm,
        onSubmit: async (values) => {
            const response = await dataToSend(values);
            if(response.status === 200){
                navigate('/settings#login');
            }
            return response;
        },
    });

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
