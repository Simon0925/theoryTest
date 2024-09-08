import Logo from "../Logo/Logo";
import styles from "./Modal.module.scss";

interface ModalProps {
    text: string;
    title:string;
    close:(e:boolean) => void;
}

export default function Modal({ text,title,close }: ModalProps) {

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <span className={styles.title}>{title}</span>
                <span className={styles.text}>{text}</span>
                <button onClick={()=>close(false)} className={styles.btn1}>OK</button>
            </div>
        </div>
    );
}
