import CrossSvg from '../../SVG/CrossSvg/CrossSvg';
import OkVectorSvg from '../../SVG/OkVectorSvg/OkVectorSvg';
import styles from './Variant.module.scss';

interface VariantProps {
    question: string;
    correct: boolean;
    backgroundColor: string;
    click: () => void;
    selected: boolean;
    color: string;
}

export default function Variant({ color, selected, click, backgroundColor, correct, question }: VariantProps) {
    return (
        <div onClick={click} style={{ backgroundColor, color }} className={styles['wrap']}>
            <span>{question}</span>
            <div className={styles['box']}>
                {selected ? (correct ? <OkVectorSvg /> : <CrossSvg />) : null}
            </div>
        </div>
    );
}
