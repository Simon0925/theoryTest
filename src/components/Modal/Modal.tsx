import Logo from "../Logo/Logo";
import styles from "./Modal.module.scss";

interface ModalProps {
    text: string;
    title: string;
    close: (e: boolean) => void;
    cancel: boolean;
    blueBtnText: string;
    cancelClick?: (e: boolean) => void | null;  // Make it optional
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
                    {/* Button to close the modal */}
                    <button onClick={() => close(false)} className={styles.btn1}>
                        {blueBtnText}
                    </button>

                    {/* Conditionally render Cancel button if `cancel` is true and `cancelClick` exists */}
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
