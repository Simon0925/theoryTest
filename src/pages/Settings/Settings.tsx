import { useState } from "react";
import Account from "../../components/Account/Account";
import SwitchColor from "../../components/SwitchColor/SwitchColor";
import styles from "./Settings.module.scss";


export default function Settings() {

    const [isAccount,setIsAccount] = useState(false)
   

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
