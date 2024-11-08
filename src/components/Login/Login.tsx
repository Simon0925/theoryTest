import styles from './Login.module.scss';

export default function Login() {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formInput}>
                <label htmlFor="login">Login</label>
                <input
                    type="text"
                    id="login"
                    name="login"
                    placeholder="Enter your login"
                    autoComplete="username"
                />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                />
            </div>
            <button type="submit" className={styles.submitButton}>
                Login
            </button>
        </form>
    );
}
