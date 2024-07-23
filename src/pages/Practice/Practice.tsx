import { useEffect, useState } from 'react';
import Par from '../../components/Par/Par';
import PracticeSettings from '../../components/PracticeSettings/PracticeSettings';
import styles from './Practice.module.scss';
import AlertSvg from '../../SVG/AlertSvg/AlertSvg';
import service from '../../service/service'; 

interface QuestionGroup {
    name: string;
    maxQuestions: number;
    percent: number;
    id:string
}

interface SelectedItem {
    selected: boolean;
    name: string;
    id: string;
    quantity: number;
}

export default function Practice() {
    const [isSelected, setIsSelected] = useState<SelectedItem | null>(null);
    const [all, setAll] = useState<SelectedItem[]>([]);
    const [quantityQ, setQuantityQ] = useState(0);

    const [questionsGroup, setQuestionsGroup] = useState<QuestionGroup[]>([]); 

    useEffect(() => {
        let number = 0;
        all.forEach((e) => {
            number += e.quantity;
        });
        setQuantityQ(number);

    }, [all]);

    useEffect(() => {
        if (isSelected) {
            setAll((prevAll) => {
                if (isSelected.selected) {
                    return [...prevAll, isSelected];
                } else {
                    return prevAll.filter((item) => item.id !== isSelected.id);
                }
            });
        }
      
    }, [isSelected]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await service.getQuestionsGroup();
                setQuestionsGroup(data || []); 
            } catch (error) {
                console.error('Error fetching data in useEffect:', error);
            }
        };

        fetchData();
        
    }, []);

    return (
        <div className={styles['wrap']}>
            <div className={styles['qwestions']}>
                {questionsGroup.map((elem, i) => (
                    <Par
                        key={i} 
                        id={elem.id} 
                        name={elem.name}
                        quantity={elem.maxQuestions}
                        percent={elem.percent}
                        svg={<AlertSvg />}
                    />
                ))}
            </div>
            <div className={styles['settings']}>
                <PracticeSettings quantity={quantityQ} />
            </div>
        </div>
    );
}
