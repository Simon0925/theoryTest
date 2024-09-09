import { useEffect, useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './FooterTest.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updatecurrentQuestions } from '../../store/practice.slice'; // Import your action

interface FooterTestProps {
    maxPage: number;
    currentPage: number;
    click: (e: number) => void;
    selected: boolean;
    modal: (e: boolean) => void;
    id: string;
    flag: boolean;
}

export default function FooterTest({ selected, maxPage, currentPage, click, modal, id, flag }: FooterTestProps) {
    const question = useSelector((state: RootState) => state.practice.currentQuestions);
    const dispatch = useDispatch(); 

    
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);

    useEffect(() => {
        setIsAnswerSelected(selected);
    }, [selected]);

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
            const updatedResultData = resultData.map((element) => {
                if (element.id === id) {
                    return { ...element, flag: !flag }; 
                }
                return element;
            });
            localStorage.setItem('result', JSON.stringify(updatedResultData));

            console.log("Updated localStorage:", updatedResultData);
        } 
        else {
            console.error("Result data from localStorage is not an array");
        }
    };

    const previous = () => {
        if (currentPage > 0) {
            click(currentPage - 1);
        }
    };

    const next = () => {
        setIsAnswerSelected(false);
        if (currentPage < maxPage - 1) {
            click(currentPage + 1);
        }
    };

    const explanationModal = () => {
        modal(true);
    };

    return (
        <>
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
                        backgroundColor={isAnswerSelected ? 'yellow' : 'white'}
                        svg={false}
                        svgColor={false}
                    />
                </div>
            </div>
        </>
    );
}
