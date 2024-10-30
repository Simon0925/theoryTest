import HeaderForTest from "../HeaderForTest/HeaderForTest";
import QuestionContent from "../QuestionComponent/QuestionContent";
import styles from "./TrainerTest.module.scss";
import VariantsOfAnswers from "../VariantsOfAnswers/VariantsOfAnswers";
import FooterTrainerTest from "../FooterTrainerTest/FooterTrainerTest";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../store/store";



interface TrainerTestProps {
    onExitClick: (e: boolean) => void;
    result:(e:boolean) => void
}

export default function TrainerTest({ onExitClick, result }: TrainerTestProps) {
   
    
    

    const { questions, currentPage} = useSelector(
        (state: RootState) => state.currentData.testsData["Trainer"],  
        shallowEqual
    );


    return (
        <>
            <div className={styles.wrap}>
            <div>
                <HeaderForTest 
                    finish="Results"
                    onExitClick={onExitClick}
                    trainerTest={true}
                    result={result}
                    typeOftest={'Trainer'}                
                />
                <div className={styles['question-wrap']}>
                    <QuestionContent 
                        typeOftest={"Trainer"} 
                        question={questions[currentPage]}                            
                    />
                </div>
            </div>
                <div className={styles.container}>
                        <VariantsOfAnswers
                            typeOftest={'Trainer'} 
                            question={questions[currentPage]}                    
                        />
                    
                    <FooterTrainerTest result={result} />
                </div>
            </div>
        </>
    );
}
