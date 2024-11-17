import { useEffect, useState } from "react";
import Account from "../../components/Account/Account";
import styles from "./Settings.module.scss";
import { useLocation } from "react-router-dom";
import SwitchColor from "../../components/SwitchColor/SwitchColor";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import CircularProgressBarTest from "../../UI/CircularProgressBarTest/CircularProgressBarTest";



export default function Settings() {
  
    const location = useLocation();

    const [isAccount,setIsAccount] = useState(false)
    
    const color = useSelector((state: RootState) => state.color);

    useEffect(()=>{
        if(location.hash === "#login"){
            setIsAccount(true)
        }
    },[location])
   

    return (
        <>
        {
            isAccount&&(
                <Account back={setIsAccount} />
            )
        }
        {
            !isAccount&&(
            <div className={styles.wrap}>
                {/* <div className={styles.container}>
                    <div style={{
                            "--button-color": color.headerColors,
                            "--button-hover-color": color.hoverColor,
                            "--text-color":color.textColor,
                        } as React.CSSProperties}
                        className={styles.btns}>   
                        <button onClick={()=>setIsAccount(true)} >Account </button>
                        <button>Reset Statisics </button>
                        <button>Clear all flags</button>
                    </div>
                    <SwitchColor svgColor={"white"}  />
                </div> */}
                <div className={styles.circle}>
                    <CircularProgressBarTest
                            mockTest={false}
                            correct={50}
                            incorrect={25}
                            skipped={25}
                           
                />
                </div>
               
            </div>
            )
        }
        </>
    );
}
