import { useState } from "react";
import styles from "./Auth.module.scss";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";


export default function Auth() {

    const { headerColors, textColor,hoverColor} = useSelector((state: RootState) => state.color);


    const [active, setActive] = useState("login");

    const handleToggle = (view:string) => {
        setActive(view);
        
    };


    return (
        <div style={{background:headerColors,border:`2px solid ${hoverColor}`}} className={styles.wrap}>
            <div className={styles.nav}>
                <button
                    style={{background:active === "login" ?hoverColor:headerColors ,borderBottom:`2px solid ${hoverColor}`,color:textColor}}
                    className={ styles.login}
                    onClick={() => handleToggle("login")}
                >
                    Login
                </button>
                <button
                    style={{background:active === "registration" ?hoverColor:headerColors ,borderBottom:`2px solid ${hoverColor}`,color:textColor}}
                    className={styles.registration}
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
