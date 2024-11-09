import { useDispatch, useSelector } from "react-redux";
import ArrowPrevSmallSvg from "../../SVG/ArrowPrevSmallSvg/ArrowPrevSmallSvg";
import { RootState } from "../../store/store";
import Auth from "../Auth/Auth";
import styles from "./Account.module.scss";
import { useEffect } from "react";
import { login } from "../../store/auth/auth";


interface AccountProps{
    back:(e:boolean) => void
}


export default function Account({back}:AccountProps){
    const dispatch = useDispatch();

    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const name = useSelector((state: RootState) => state.auth.userName);

    useEffect(()=>{
        console.log("name:",name)
    },[name])

    const logOut = () =>{
        localStorage.setItem("accessToken", "");
        dispatch(login({ login: false, id: "", userName: "" }));
    }

    
    return (
        <>
            <div className={styles.wrap}>
                    <div className={styles.btn}>
                        <button onClick={()=>back(false)}> <ArrowPrevSmallSvg width={"20px"} height={"20px"} color={"white"} /> Back</button>
                    </div>
                    {isLogin ?
                    <div className={styles.logOut}>
                        <div className={styles.btnlogOut}>
                            <h1 className={styles.title}>Wellcome {name}</h1>
                            <button onClick={logOut} >Log Out</button>
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