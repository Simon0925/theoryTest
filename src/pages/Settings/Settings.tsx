import { useEffect, useState } from "react";
import Account from "../../components/Account/Account";
import styles from "./Settings.module.scss";
import { useLocation } from "react-router-dom";
import SwitchColor from "../../components/SwitchColor/SwitchColor";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import resetStatistics from './service/resetStatistics';
import useCookie from "../../hooks/useCookie";
import ReactDOM from "react-dom";
import Modal from "../../components/Modal/Modal";


export default function Settings() {
  
    const location = useLocation();

    const [isAccount,setIsAccount] = useState(false)
    
    const color = useSelector((state: RootState) => state.color);

    const accessToken = useCookie('accessToken');

    const modalRoot = document.getElementById("modal-root");

    const [modalVisible, setModalVisible] = useState(false);

    const [typeForReset,setTypeforReset] = useState('')

    const [message,setMessage] = useState('')


    useEffect(()=>{
        if(location.hash === "#login"){
            setIsAccount(true)
        }
    },[location])

    

    const reset = (type:string) =>{
        setTypeforReset(type)
        setModalVisible(true)
    }

    const handleReset = async () => {
        if (!accessToken) {
          console.warn("No access token provided. Unable to reset statistics.");
          return;
        }
        try {
         
          if (typeForReset === "all" || typeForReset === "flags") {
            const response = await resetStatistics(accessToken, typeForReset);
            setMessage(response);
            setModalVisible(false);
          }
        } catch (error) {
          console.error("Failed to reset statistics:", error);
        }
      };
    
     

    const modalTitle =
    typeForReset === "all"
    ? "Are you sure you want to reset current progress? This action cannot be undone."
    : "Are you sure you want to clear all flags? This action cannot be undone.";

    const modalButtonText = typeForReset === "all" ? "Reset" : "Clear all flags";

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
                    <span style={{color:color.textColor}} className={styles.message}>{message}</span>
                <div className={styles.container}>
                    <div style={{
                            "--button-color": color.headerColors,
                            "--button-hover-color": color.hoverColor,
                            "--text-color":color.textColor,
                        } as React.CSSProperties}
                        className={styles.btns}>   
                        <button onClick={()=>setIsAccount(true)} >Account </button>
                        <button onClick={()=>reset("all")}>Reset Statisics </button>
                        <button onClick={()=>reset("flags")}>Clear all flags</button>
                    </div>
                    <SwitchColor svgColor={"white"}  />
                </div>
                
            </div>
            )
        }
        {modalVisible && modalRoot &&
        ReactDOM.createPortal(
          <Modal
            title={modalTitle}
            cancel
            cancelClick={() => setModalVisible(false)}
            close={handleReset}
            blueBtnText={modalButtonText}
            text=""
          />,
          modalRoot
        )}
        
        </>
    );
}
