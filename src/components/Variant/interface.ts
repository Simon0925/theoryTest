export interface VariantProps {
    answer: string;
    correct: boolean;
    backgroundColor: string;
    click: () => void;
    color: string;
    photo: boolean | string;
    selectedOption: null | number;
    index: number;
    typeOftest:string;
    textColor:string;
}