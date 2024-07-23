import { useEffect } from 'react';
import ButtonTest from '../../UI/ButtonTest/ButtonTest';
import styles from './FooterTest.module.scss';

interface FooterTestProps {
    maxPage: number;
    currentPage: number;
    click: (e:number) => void;
    selected:boolean
}

export default function FooterTest({selected, maxPage, currentPage, click }: FooterTestProps) {

    const noop = () => {};  

    const previous = () => {
        
        if(currentPage <= 0){
            click(currentPage)
        }else{
            click(--currentPage)
        }
    };

    const next = () => {
       
        if(currentPage >= maxPage - 1){
            click(currentPage)
        }else{
            click(++currentPage)
        }
        
    };


    return (
        <>
            <div className={styles['wrap']}>
                <div className={styles['container']}>
                    <ButtonTest click={previous} name={'< Previous'} color={'#0078AB'} backgroundColor={'white'} svg={false} />
                    <ButtonTest click={noop} name={''} color={'#0078AB'} backgroundColor={'white'} svg={true} />
                    <ButtonTest click={noop} name={'Explanation'} color={'#0078AB'} backgroundColor={'white'} svg={false} />
                    <ButtonTest click={next} name={maxPage === currentPage + 1 ? 'Results' :'Next >'} color={'#0078AB'} backgroundColor={selected?'yellow':'white'} svg={false} />
                </div>
            </div>
        </>
    );
}
