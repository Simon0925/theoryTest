import styles from "./FooterHPT.module.scss"

interface FooterHPTProps {
    isIntroduction:(e:boolean) => void
}


export default function FooterHPT ({isIntroduction}:FooterHPTProps) {


    return(
        <>
            <div className={styles.wrap}>
                <button onClick={()=>isIntroduction(true)} className={styles.introduction}>
                    Introduction
                </button>
                <button className={styles.start}>
                    START
                </button>
            </div>
        </>
    )
}