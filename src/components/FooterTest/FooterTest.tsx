import { useEffect, useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './FooterTest.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updatecurrentQuestions } from '../../store/practice.slice';

interface FooterTestProps {
    maxPage: number;
    currentPage: number;
    click: (e: number) => void;
    modal: (e: boolean) => void;
    id: string;
    flag: boolean;
    setSelectedAnswer: string; 
}

export default function FooterTest({ maxPage, currentPage, click, modal, id, flag, setSelectedAnswer }: FooterTestProps) {
    const question = useSelector((state: RootState) => state.practice.currentQuestions);
    const dispatch = useDispatch();

    const [isAnswerSelected, setIsAnswerSelected] = useState(false); 
    const [answered, setAnswered] = useState<string[]>([]); 

    useEffect(() => {
        if (setSelectedAnswer !== '') {
            confirmAnswer(); 
        }
    }, [setSelectedAnswer]);

    const confirmAnswer = () => {
        if (!answered.includes(id)) {
            setAnswered((prev) => [...prev, id]); 
        }
    };

    useEffect(() => {
        const isQuestionAnswered = answered.includes(id);
        setIsAnswerSelected(isQuestionAnswered); 
    }, [id, currentPage, answered]);

    const marker = () => {
        const localS = localStorage.getItem("result");

        const updatedQuestions = question.map((element) => {
            if (element._id === id) {
                return { ...element, flag: !flag }; 
            }
            return element;
        });

        dispatch(updatecurrentQuestions(updatedQuestions));

        const resultData = localS ? JSON.parse(localS) : [];
        if (Array.isArray(resultData)) {
            const updatedResultData = resultData.map((element: any) => {
                if (element.id === id) {
                    return { ...element, flag: !flag }; 
                }
                return element;
            });

            localStorage.setItem('result', JSON.stringify(updatedResultData));
        } else {
            console.error("Result data from localStorage is not an array");
        }
    };

    const previous = () => {
        if (currentPage > 0) {
            click(currentPage - 1);
        }
    };

    const next = () => {
        confirmAnswer(); 
        if (currentPage < maxPage - 1) {
            click(currentPage + 1);
        }
    };

    const explanationModal = () => {
        modal(true); 
    };

    return (
        <div className={styles['wrap']}>
            <div className={styles['container']}>
                <ButtonTest
                    click={previous}
                    name={'< Previous'}
                    color={'#0078AB'}
                    backgroundColor={'white'}
                    svg={false}
                    svgColor={false}
                />
                <ButtonTest
                    click={marker}
                    name={''}
                    color={'#0078AB'}
                    backgroundColor={'white'}
                    svg={true}
                    svgColor={flag}
                />
                <ButtonTest
                    click={explanationModal}
                    name={'Explanation'}
                    color={'#0078AB'}
                    backgroundColor={'white'}
                    svg={false}
                    svgColor={false}
                />
                <ButtonTest
                    click={next}
                    name={maxPage === currentPage + 1 ? 'Results' : 'Next >'}
                    color={'#0078AB'}
                    backgroundColor={isAnswerSelected ? '#FFEC4B' : 'white'} 
                    svg={false}
                    svgColor={false}
                />
            </div>
        </div>
    );
}
