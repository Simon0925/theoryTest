import { useState } from 'react';

interface UseFormHandlerParams<T> {
    initialValues: T;
    validate: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit: (values: T) => Promise<any>;
}

export function useFormHandler<T extends Record<string, any>>({
    initialValues,
    validate,
    onSubmit,
}: UseFormHandlerParams<T>) {
    const [formValues, setFormValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof T]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate(formValues);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setServerMessage(null);
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await onSubmit(formValues);
            if (!response.errors) {
                setServerMessage(response.message || 'Success!');
                setFormValues(initialValues);
                setErrors({});
            } else {
                console.log("response.message:",response)
                setServerMessage(response.errors || 'Server error occurred useFormHandler');
                setErrors(response.errors || {});
            }
        } catch (error: any) {
            setServerMessage(error.message || 'An error occurred');
            if (error.errors) {
                setErrors(error.errors);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formValues,
        errors,
        serverMessage,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
}
