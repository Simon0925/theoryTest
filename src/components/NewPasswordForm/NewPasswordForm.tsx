import { useSelector } from 'react-redux';
import styles from './NewPasswordForm.module.scss';
import { RootState } from '../../store/store';
import { useState } from 'react';
import {FormValues,FormErrors}from './interface'


interface NewPasswordFormProps {
    token:string|null;
}

export default function  NewPasswordForm({token}:NewPasswordFormProps){

    const [formValues, setFormValues] = useState<FormValues>({
        password: '',
        confirmPassword: ''
    });

    const { textColor,hoverColor} = useSelector((state: RootState) => state.color);
    const [errors, setErrors] = useState<FormErrors>({});
    const [serverMessage, setServerMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        if (errors[name as keyof FormErrors]) {
            setErrors({ ...errors, [name]: '' }); 
        }
    };

    return (
        <form>
            <h3 style={{color:textColor}} className={styles.title}>Enter new password</h3>
            <div style={{color:textColor}}  className={styles.formInput}>
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
                {errors.password && <p style={{color:textColor}} className={styles.error}>{errors.password}</p>}
            </div>
            <div style={{color:textColor}}  className={styles.formInput}>
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
                {errors.confirmPassword && <p style={{color:textColor}} className={styles.error}>{errors.confirmPassword}</p>}
            </div>
            <button style={{background:hoverColor,color:textColor}} type="submit" className={styles.submitButton}>
                Create password
            </button>
        </form>
    )
};