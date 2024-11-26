import { FormValues, FormErrors } from '../interface';

const validateForm = (values: FormValues): FormErrors => {
    const validationErrors: FormErrors = {};

    if (!values.email) {
        validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        validationErrors.email = 'Email address is invalid';
    }

    return validationErrors;
};

export default validateForm;
