import { useEffect, useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './FooterTest.module.scss';

interface FooterTestProps {
    maxPage: number;
    currentPage: number;
    click: (e:number) => void;
    selected: boolean;
    modal: (e:boolean) => void;
    id:string;
}

export default function FooterTest({ selected, maxPage, currentPage, click,modal,id }: FooterTestProps) {

    const [isAnswerSelected, setIsAnswerSelected] = useState(false);

    useEffect(() => {
        setIsAnswerSelected(selected);
    }, [selected]);

    

    const marker = () => {
        console.log("Flag",id)
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
        modal(true)
    }

    return (
        <>
            <div className={styles['wrap']}>
                <div className={styles['container']}>
                    <ButtonTest click={previous} name={'< Previous'} color={'#0078AB'} backgroundColor={'white'} svg={false} svgColor={false} />
                    <ButtonTest click={marker} name={''} color={'#0078AB'} backgroundColor={'white'} svg={true} svgColor={true} />
                    <ButtonTest click={explanationModal} name={'Explanation'} color={'#0078AB'} backgroundColor={'white'} svg={false} svgColor={false} />
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
