import { useEffect, useState } from 'react';
import FlagSvg from '../../SVG/FlagSvg/FlagSvg';
import styles from './ButtonTest.module.scss';

interface ButtonTestProps {
    name: string;
    color: string;
    backgroundColor: string;
    svg?: boolean;
    click: (() => void) | null;
    svgColor?: boolean | string;
}

export default function ButtonTest({ click, name, color, backgroundColor, svg, svgColor }: ButtonTestProps) {
    const [svgCl, setSvgCl] = useState<string>('');

    useEffect(() => {
        if (typeof svgColor === 'string') {
            setSvgCl(svgColor);
        } else if (typeof svgColor === 'boolean') {
            const correctColor = svgColor ? '#F9931C' : '#0078AB';
            setSvgCl(correctColor);
        }
    }, [svgColor]);

    return (
        <button onClick={click || undefined} style={{ backgroundColor, color }} className={styles['btn']}>
            {name} {svg ? <FlagSvg color={svgCl} width={'24px'} height={'24px'} /> : null}
        </button>
    );
}
