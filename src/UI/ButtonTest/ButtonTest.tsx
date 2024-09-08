import FlagSvg from '../../SVG/FlagSvg/FlagSvg';
import styles from './ButtonTest.module.scss';

interface ButtonTestProps {
    name: string;
    color: string;
    backgroundColor: string;
    svg: boolean;
    click: (() => void) | null;
    svgColor:boolean
}

export default function ButtonTest({ click, name, color, backgroundColor, svg,svgColor }: ButtonTestProps) {
    return (
        <button onClick={click || undefined} style={{ backgroundColor, color }} className={styles['btn']}>
            {name} {svg ? <FlagSvg color={svgColor ? "#F9931C" : "#0078AB"} width={'24px'} height={'24px'} /> : null}
        </button>
    );
}
