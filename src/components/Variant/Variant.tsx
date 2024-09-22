import React, { useMemo } from 'react';
import CrossSvg from '../../SVG/CrossSvg/CrossSvg';
import OkVectorSvg from '../../SVG/OkVectorSvg/OkVectorSvg';
import styles from './Variant.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface VariantProps {
    answer: string;
    correct: boolean;
    backgroundColor: string;
    click: () => void;
    color: string;
    photo: boolean | string;
    selectedOption: null | number;
    index: number;
    typeOftest:string
}

const Variant: React.FC<VariantProps> = ({
    color,
    click,
    backgroundColor,
    correct,
    answer,
    photo,
    selectedOption,
    index,
    typeOftest
}) => {
    const practice = useSelector((state: RootState) => state.practice.correct);

    
    const icon = useMemo(() => {
        if(typeOftest === "MockTest" ){
            return correct 
        }
        if (selectedOption === index) {
            return correct ? <OkVectorSvg /> : <CrossSvg />;
        }
        if (practice && selectedOption !== null) {
            return correct ? <OkVectorSvg /> : <CrossSvg />;
        }
        return null;
    }, [correct, index, practice, selectedOption]);

  
    return (
        <div onClick={click} style={{ backgroundColor, color }} className={styles['wrap']}>
            <span>{answer}</span>
            {photo && (
                <img
                    className={styles['img']}
                    src={`http://localhost:8080${photo}`}
                    alt="Variant"
                />
            )}
            <div className={styles['box']}>{icon}</div>
        </div>
    );
};

export default React.memo(Variant);
