import { useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './FooterTrainerTest.module.scss';
import Modal from '../Modal/Modal';

interface FooterTrainerTestProps {
    explanation:(e:boolean) => void
    currentPage:number
    nextPage:(e:number) => void
    id:string
    flag:boolean
    changeFlag:(e:boolean) => void
    isAnswerSelected:boolean
}

export default function FooterTrainerTest({explanation,currentPage,nextPage,id,flag,changeFlag,isAnswerSelected}:FooterTrainerTestProps) {


    const maxPage = 756
    // const currentPage = 1
    
    const [lastQuestion,setLastQuestion] = useState(false)

    const [currentChangeFlag,setCurrentChangeFlag] = useState(false)
   
    const marker = () => {
        setCurrentChangeFlag(!currentChangeFlag)
        changeFlag(!flag)
        const localS = localStorage.getItem("result");
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
    }

    const next = () => {
        if (currentPage < maxPage - 1) {
            nextPage(currentPage + 1);
        }
    }

    const explanationModal = () => {
        explanation(true)
    };
    
    return(
        <div className={styles['wrap']}>
            <div className={styles['container']}>
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
                    name={isAnswerSelected ? 'Next >' : 'Skip'}
                    color={'#0078AB'}
                    backgroundColor={isAnswerSelected ? '#FFEC4B' : 'white'} 
                    svg={false}
                    svgColor={false}
                />
            </div>
        </div>
    )
}