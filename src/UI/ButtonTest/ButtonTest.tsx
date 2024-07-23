import FlagSvg from '../../SVG/FlagSvg/FlagSvg';
import styles from './ButtonTest.module.scss';

interface ButtonTestProps {
    name: string;
    color: string;
    backgroundColor: string;
    svg: boolean;
    click: (() => void) | null;
}

export default function ButtonTest({ click, name, color, backgroundColor, svg }: ButtonTestProps) {
    return (
        <button onClick={click || undefined} style={{ backgroundColor, color }} className={styles['btn']}>
            {name} {svg ? <FlagSvg /> : null}
        </button>
    );
}
