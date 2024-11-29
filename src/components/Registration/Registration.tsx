import styles from './Registration.module.scss';
import { FormValues } from './interface';
import validateForm from './services/validateForm';
import dataTosend from './services/dataTosend';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useFormHandler } from '../../hooks/useFormHandler/useFormHandler';

export default function Registration() {
    

    const { textColor,hoverColor,headerColors} = useSelector((state: RootState) => state.color.themeData);

  
    const {
        formValues,
        errors,
        serverMessage,
        handleChange,
        handleSubmit,
    } = useFormHandler<FormValues>({
        initialValues: {name: '', email: '',password: '',confirmPassword: '' },
        validate: validateForm,
        onSubmit: async (values) => {
            const response = await dataTosend(values);
            return response;
        },
    });

    return (
        <form style={{background:headerColors,color:textColor}}  onSubmit={handleSubmit} className={styles.form}>
          
            {serverMessage && <p style={{color:textColor}} className={styles.serverMessage}>{serverMessage}</p>}

            <div style={{color:textColor}}  className={styles.formInput}>
                <label htmlFor="name">Name</label>
                <input
                    style={{border:`3px solid ${hoverColor}`}}
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
                    style={{border:`3px solid ${hoverColor}`}}
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
                    style={{border:`3px solid ${hoverColor}`}}
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
                    style={{border:`3px solid ${hoverColor}`}}
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
