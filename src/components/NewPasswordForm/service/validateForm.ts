import { FormValues, FormErrors } from '../interface';

const validateForm = (values: FormValues): FormErrors => {
    const validationErrors: FormErrors = {};

    if (!values.password) {
        validationErrors.password = 'Password is required';
    } else if (values.password.length < 8) {
        validationErrors.password = 'Password must be at least 8 characters';
    } else if (!/^[A-Z]/.test(values.password)) {
        validationErrors.password = 'Password must start with an uppercase letter';
    }

    if (values.password !== values.confirmPassword) {
        validationErrors.confirmPassword = 'Passwords do not match';
    }

    return validationErrors;
};

export default validateForm;
