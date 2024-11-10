import { useEffect, useState } from "react";
import Account from "../../components/Account/Account";
import SwitchColor from "../../components/SwitchColor/SwitchColor";
import styles from "./Settings.module.scss";
import { useLocation } from "react-router-dom";


export default function Settings() {
  
    const location = useLocation();

    const [isAccount,setIsAccount] = useState(false)

    useEffect(()=>{
        if(location.hash === "#login"){
            setIsAccount(true)
        }
    },[location])
   

    return (
        <>
        {
            isAccount&&<Account back={setIsAccount} />
        }
        {
            !isAccount&&(
                <div className={styles.wrap}>
                <div className={styles.btns}>   
                    <button onClick={()=>setIsAccount(true)} >Account </button>
                </div>
                 <SwitchColor />
            </div>
            )
        }
        </>
    );
}
