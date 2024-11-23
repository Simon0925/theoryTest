import styles from "./FooterButton.module.scss";


interface FooterButtonProps {
  onClick: () => void;
  name?: string;
  name2?: string;
  color: string;
  backgroundColor: string;
  svg?: React.ReactNode;
  rotate?:string;
  fontSize?:string;
  opacity?:string;
}

const FooterButton: React.FC<FooterButtonProps> = ({ 
  onClick, 
  name,
  name2,
  color, 
  backgroundColor, 
  svg,
  rotate,
  fontSize,
  opacity
}) => (
  <button 
    onClick={onClick} 
    style={{ backgroundColor, color,fontSize,opacity }} 
    className={styles.btn}
  >
    {name2 && <span>{name2}</span>}
    <div className={styles.svg} style={{ rotate }} >
        {svg}
    </div>
    {name && <span>{name}</span>}
  </button>
);

export default FooterButton;
