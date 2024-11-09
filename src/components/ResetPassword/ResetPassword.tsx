import { useState } from 'react';
import styles from './ResetPassword.module.scss';

interface FormValues {
    email:string;
}
interface FormErrors {
    email?: string;
}

interface ResetPasswordProps {
    reset:(e:boolean) => void;
}

export default function ResetPassword ({reset}:ResetPasswordProps) {
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const [serverMessage, setServerMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: '' });
        }
    };
    return (
        <div  className={styles.form}>
            <form onSubmit={handleSubmit} className={styles.resetform}>
                    <div className={styles.formInput}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email "
                            autoComplete="email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={() => reset(false)}
                        className={styles.submitButton}
                    >
                        Reset
                    </button>
                </form>
                <button
                        type="button"
                        onClick={() => reset(false)}
                        className={styles.submitButton}
                    >
                        Back to Login
                    </button>
        </div>
    )
}