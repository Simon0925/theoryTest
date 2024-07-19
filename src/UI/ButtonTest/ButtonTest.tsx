import FlagSvg from '../../SVG/FlagSvg/FlagSvg';
import styles from './ButtonTest.module.scss';

interface ButtonTestProps {
    name: string;
    color: string;
    backgroundColor: string;
    svg:boolean
}

export default function ButtonTest({ name, color, backgroundColor,svg }: ButtonTestProps) {
    return (
        <button style={{ backgroundColor, color }} className={styles['btn']}>
            {name} {svg ? <FlagSvg /> : null } 
        </button>
    );
}
