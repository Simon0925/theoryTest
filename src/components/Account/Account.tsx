import { useSelector } from "react-redux";
import ArrowPrevSmallSvg from "../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg";
import { RootState } from "../../store/store";
import Auth from "../Auth/Auth";
import styles from "./Account.module.scss";


interface AccountProps{
    back:(e:boolean) => void
}


export default function Account({back}:AccountProps){

    const isLogin = useSelector((state: RootState) => state.auth.isLogin);

    
    return (
        <>
            <div className={styles.wrap}>
                    <div className={styles.btn}>
                        <button onClick={()=>back(false)}> <ArrowPrevSmallSvg width={"20px"} height={"20px"} color={"white"} /> Back</button>
                    </div>
                    {isLogin ?
                    <div className={styles.logOut}>
                        <div className={styles.btnlogOut}>
                            <button >Log Out</button>
                        </div>
                    </div>
                    :
                    <div className={styles.auth}>
                        <Auth />
                    </div>}
                    
            </div>
        </>
    )
}