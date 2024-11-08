import { useState } from 'react';
import styles from './Registration.module.scss';
import{FormValues,FormErrors} from './interface'
import validateForm from './service/validateForm'
import dataTosend from './service/dataTosend'

export default function Registration() {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            dataTosend(formValues)
            console.log('Form submitted:', formValues);
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
            <div className={styles.formInput}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    autoComplete="name"
                    value={formValues.name}
                    onChange={handleChange}
                />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
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
            <div className={styles.formInput}>
                <label htmlFor="confirmPassword">Repeat Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
            </div>
            <button type="submit" className={styles.submitButton}>
                Register
            </button>
        </form>
    );
}
