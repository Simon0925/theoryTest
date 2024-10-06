import { Result } from "../VariantsOfAnswers";


export const updateLocalStorageWithAnswer = (index: number, id: string, shuffledAnswers: { tOF: boolean }[]) => {
    const localS = localStorage.getItem('result');
    if (!localS) return;

    try {
        const resultData = JSON.parse(localS) as Result[];
        const updatedResults = resultData.map(elem =>
            elem.id === id ? { ...elem, status: shuffledAnswers[index].tOF,answer:true } : elem
        );
        localStorage.setItem('result', JSON.stringify(updatedResults));
    } catch (error) {
        console.error('Failed to parse local storage data:', error);
    }
};