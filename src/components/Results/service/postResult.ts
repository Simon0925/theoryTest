import hostname from "../../../config/hostname";

import status from './status'

interface UserQuestionsResult {
    userId: string| null ;
    data: Data[];
}
interface Data {
    id: string;
    question: string;
    status: boolean|string;
}
export const postResult = async (questionsGroup: UserQuestionsResult, typeOftest: string): Promise<any> => {
    
    if (!questionsGroup.userId) {
        throw new Error("User ID is null or invalid");
    }

    const dataToSend = status.status(questionsGroup, typeOftest);

    const jsonString = JSON.stringify(dataToSend);

    try {
        const response = await fetch(`${hostname}/api/usersPost`, {
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
        console.error("Error posting questions group:", error);
        throw error;
    }
};
