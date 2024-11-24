import hostname from "../../../config/hostname";

import status from './status'

interface UserQuestionsResult {
    token: string | null; 
    data: Data[];
}
interface Data {
    id: string;
    question: string;
    status: boolean|string;
}
export const postResult = async (questions: UserQuestionsResult, typeOftest: string): Promise<any> => {

    
    if (!questions.token) {
        throw new Error("Token is null or invalid");
    }

    const dataToSend = status.status(questions, typeOftest);

    const jsonString = JSON.stringify(dataToSend);


    try {
        const response = await fetch(`${hostname}/api/result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonString,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting questions:", error);
        throw error;
    }
};
