import {updateLocalStorageWithAnswer} from './updateLocalStorageWithAnswer'

export const handleSelect = (
    index: number,
    _id: string,
    setSelectedOption: React.Dispatch<React.SetStateAction<number | null>>,
    setSelected: React.Dispatch<React.SetStateAction<{ _id: string; index: number }[]>>,
    selectedOption: number | null,
    typeOftest: string,
    currentPage: number | null,
    nextPage: ((e: number) => void) | null,
    click: (e: string) => void,
    shuffledAnswers: { tOF: boolean }[]
) => {
    if (selectedOption !== null && typeOftest !== "MockTest") return;

    if (typeOftest === "MockTest" && selectedOption !== null) {
        setSelected(prev =>
            prev.map(item => (item._id === _id ? { ...item, index } : item))
        );
    } else {
        setSelected(prev => [...prev, { index, _id }]);
        if (currentPage !== null && nextPage !== null) {
            nextPage(currentPage + 1);  
        }
    }

    setSelectedOption(index);
    click(_id);
    updateLocalStorageWithAnswer(index, _id, shuffledAnswers);
};
