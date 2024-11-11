import { useState } from 'react';
import styles from './Registration.module.scss';
import { FormValues, FormErrors } from './interface';
import validateForm from './service/validateForm';
import dataTosend from './service/dataTosend';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export default function Registration() {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [serverMessage, setServerMessage] = useState<string | null>(null); 

    const { textColor,hoverColor} = useSelector((state: RootState) => state.color);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const validationErrors = validateForm(formValues);
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setServerMessage(null); 
        } else {
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
                    setServerMessage('Registration successful!');
                    setFormValues({ name: '', email: '', password: '', confirmPassword: '' }); 
                    setErrors({}); 
                }
            } catch (error) {
                setServerMessage("Server error. Please try again later.");
                console.error("Server error:", error);
            }
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
          
            {serverMessage && <p style={{color:textColor}} className={styles.serverMessage}>{serverMessage}</p>}

            <div style={{color:textColor}}  className={styles.formInput}>
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
                {errors.name && <p style={{color:textColor}} className={styles.error}>{errors.name}</p>}
            </div>
            <div style={{color:textColor}}  className={styles.formInput}>
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
                {errors.email && <p style={{color:textColor}} className={styles.error}>{errors.email}</p>}
            </div>
            <div style={{color:textColor}}  className={styles.formInput}>
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
                {errors.password && <p style={{color:textColor}} className={styles.error}>{errors.password}</p>}
            </div>
            <div style={{color:textColor}}  className={styles.formInput}>
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
                {errors.confirmPassword && <p style={{color:textColor}} className={styles.error}>{errors.confirmPassword}</p>}
            </div>
            <button style={{background:hoverColor,color:textColor}} type="submit" className={styles.submitButton}>
                Register
            </button>
        </form>
    );
}
