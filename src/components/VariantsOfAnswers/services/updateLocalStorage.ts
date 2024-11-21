interface Result {
    id: string;
    question: string;
    status: boolean | string;
    group: string;
    flag: boolean;
}


export function updateLocalStorage(id: string, question: string, group: string, flag: boolean | undefined) {
    const localS = localStorage.getItem('result');
    let resultData: Result[] = [];

    if (localS) {
        try {
            resultData = JSON.parse(localS);
            if (!Array.isArray(resultData)) resultData = [];
        } catch (error) {
            console.error('Failed to parse local storage data:', error);
        }
    }

    const isQuestionPresent = resultData.some((elem: Result) => elem.id === id);

    if (!isQuestionPresent) {
        resultData.push({ id, question, status: 'pass', group, flag: flag ?? false });
    } else {
        resultData = resultData.map((elem: Result) =>
            elem.id === id ? { ...elem, flag: flag ?? false } : elem
        );
    }

    localStorage.setItem('result', JSON.stringify(resultData));
}
