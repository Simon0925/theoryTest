import React from 'react';
import Logo from "../Logo/Logo";
import styles from "./Modal.module.scss";


interface ModalProps {
    text: string;
    title: React.ReactNode;  
    close: () => void; 
    cancel?: boolean; 
    blueBtnText: string;
    cancelClick?: () => void; 
}


const Modal = React.memo(function Modal({ 
    text, 
    title, 
    close, 
    cancel = false,  
    blueBtnText, 
    cancelClick = () => {} 
}: ModalProps) {

    return (
        <div className={styles.wrap} role="dialog" aria-labelledby="modal-title" aria-describedby="modal-text">
            <div className={styles.content}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <span id="modal-title" className={styles.title}>{title}</span>
                <span id="modal-text" className={styles.text}>{text}</span>
                <div className={styles.btn}>
                    {cancel && (
                        <button onClick={cancelClick} className={styles.btn2}>
                            Cancel
                        </button>
                    )}
                    <button onClick={close} className={styles.btn1}>
                        {blueBtnText}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Modal;
