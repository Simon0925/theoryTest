import { useState } from "react";
import styles from "./Auth.module.scss";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";

export default function Auth() {

    const [active, setActive] = useState("login");

    const handleToggle = (view:string) => {
        setActive(view);
        
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.nav}>
                <button
                    className={active === "login" ? styles.loginActive : styles.login}
                    onClick={() => handleToggle("login")}
                >
                    Login
                </button>
                <button
                    className={active === "registration" ? styles.registrationActive : styles.registration}
                    onClick={() => handleToggle("registration")}
                >
                    Registration
                </button>
            </div>
            {active === "login" &&<Login /> }
            {active === "registration" &&<Registration /> }
            
        </div>
    );
}
