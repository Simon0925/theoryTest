import styles from './ResetPassword.module.scss';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { FormValues} from './interface';
import dataToSend from './services/dataToSend';
import { useFormHandler } from '../../hooks/useFormHandler/useFormHandler';
import validateForm from './services/validateForm'
interface ResetPasswordProps {
    reset: (e: boolean) => void;
}

export default function ResetPassword({ reset }: ResetPasswordProps) {
   
    const { textColor, hoverColor } = useSelector((state: RootState) => state.color.themeData);

    const {
        formValues,
        errors,
        serverMessage,
        handleChange,
        handleSubmit,
    } = useFormHandler<FormValues>({
        initialValues: { email: '' },
        validate: validateForm,
        onSubmit: async (values) => {
            const response = await dataToSend(values);
            return response;
        },
    });

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
