import ButtonTest from "../../UI/ButtonTest/ButtonTest"
import styles from "./FooterAssessment.module.scss"
import TimerAssessment from "../TimerAssessment/TimerAssessment"
import { useState } from "react"

interface FooterAssessmentProps{
    currentPage:number;
    click:(e:number)=> void
    maxPage: number;
}


export default function FooterAssessment ({currentPage,click,maxPage}:FooterAssessmentProps) {



    const [pause,setPause] = useState(false)

    const previous = () => {
        if (currentPage > 0) {
            click(currentPage - 1);
        }
    };

    const next = () => {
        console.log(currentPage)
        if (currentPage < maxPage - 1) {
            click(currentPage + 1);
        }
    };

    return(
        <>
            <div className={styles.wrap}>
            <div className={styles.container}>
                    
                    <ButtonTest
                        click={previous}
                        name="< Previous"
                        color="#0078AB"
                        backgroundColor={currentPage > 0  ? "white" :"#91BCD6" }
                        svg={false}
                        svgColor={false}
                    />
                    <ButtonTest
                    click={null}
                    name={''}
                    color={'#0078AB'}
                    backgroundColor={'white'}
                    svg={true}
                    svgColor={false}
                    />

                  <TimerAssessment pause={pause} />

                     <ButtonTest
                        click={()=>setPause(!pause)}
                        name={!pause ? 'Pause': 'Resume'}
                        color={'#0078AB'}
                        backgroundColor={'white'}
                        svg={false}
                        svgColor={false}
                    />
                    <ButtonTest
                    click={next}
                    name={ 'Next >'}
                    color={'#0078AB'}
                    backgroundColor={false ? 'yellow' : 'white'} 
                    svg={false}
                    svgColor={false}
                />
                </div>
            </div>
        </>
    )
}
