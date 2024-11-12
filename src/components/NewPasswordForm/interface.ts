export interface FormValues {
    password: string;
    confirmPassword: string;
    token?: string;
}

export interface FormErrors {
    password?: string;
    confirmPassword?: string;
}
