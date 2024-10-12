import { useEffect, useState } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './FooterTest.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updatecurrentQuestions } from '../../store/practice.slice';
import Modal from '../Modal/Modal';

interface FooterTestProps {
    maxPage: number;
    currentPage: number;
    click: (e: number) => void;
    modal: (e: boolean) => void;
    id: string;
    flag: boolean;
    setSelectedAnswer: { id: string, index: number }[];
    result?:(e:boolean) => void ;
}

export default function FooterTest({ maxPage, currentPage, click, modal, id, flag, setSelectedAnswer,result }: FooterTestProps) {
    const question = useSelector((state: RootState) => state.practice.currentQuestions);
    const dispatch = useDispatch();
    
    const [isAnswerSelected, setIsAnswerSelected] = useState(false); 

    const [lastQuestion,setLastQuestion] = useState(false)

    const [modalWindow,setModalWindow] = useState(false)
    
    useEffect(() => {
      const islastQuestion = maxPage === currentPage + 1
   
      if(islastQuestion && isAnswerSelected){
        setLastQuestion(!lastQuestion)
      }
    }, [id,isAnswerSelected]);

    useEffect(() => {
        confirmAnswer()
       
    }, [id,setSelectedAnswer,currentPage]);

    const confirmAnswer = () => {
        let isAnswer =  setSelectedAnswer.some(e => e.id === id)
        isAnswer ? setIsAnswerSelected(true) :setIsAnswerSelected(false)

    };

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
        if (currentPage < maxPage - 1) {
            click(currentPage + 1);
        }else if(maxPage === currentPage + 1){
            setModalWindow(true)
        }
    };

    const cancelClickModal =()=>{
        setModalWindow(false)
    }

    const resultClickModal = () => {
    if (result) { 
        result(true);
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
                    name={maxPage === currentPage + 1  ? 'Results' : 'Next >'}
                    color={'#0078AB'}
                    backgroundColor={isAnswerSelected && lastQuestion ? '#FFEC4B' : 'white'} 
                    svg={false}
                    svgColor={false}
                />
                  {modalWindow === true && (
              <Modal 
                close={() => resultClickModal()} 
                text={"End of test reached"} 
                title={'End of test reached'} 
                cancel={true}
                cancelClick={() => cancelClickModal()}
                blueBtnText={'Show results'} 
            />
            )}
            </div>
        </div>
    );
}
