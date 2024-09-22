import Logo from "../Logo/Logo";
import styles from "./Modal.module.scss";
import { ReactNode } from "react"

interface ModalProps {
    text: string;
    title: ReactNode;  
    close: (e: boolean) => void;
    cancel: boolean;
    blueBtnText: string;
    cancelClick?: (e: boolean) => void | null;  
}

export default function Modal({ text, title, close, cancel, blueBtnText, cancelClick }: ModalProps) {

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <span className={styles.title}>{title}</span>
                <span className={styles.text}>{text}</span>
                <div className={styles.btn}>
                    <button onClick={() => close(false)} className={styles.btn1}>
                        {blueBtnText}
                    </button>
                    {cancel && cancelClick && (
                        <button onClick={() => cancelClick(false)} className={styles.btn2}>
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
