export const getBackgroundColor = (index: number, correct: boolean,typeOftest:string,selectedOption:number|null) => {
        
    if (selectedOption === index) {
        if (typeOftest === "MockTest") {
            return "#FEEC49"; 
        }
        return correct ? '#00B676' : '#AA3B36'; 
    }
    return 'white'; 
};

export const getTextColor = (index: number,typeOftest:string,selectedOption:number|null)=>{
    if (selectedOption === index) {
        if (typeOftest === "MockTest") {
            return "#0078AB"; 
        }
        return selectedOption === index ? 'white' : '#0078AB'; 
    }
    return '#0078AB';
}