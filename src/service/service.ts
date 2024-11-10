import hostname from "../config/hostname";




interface Data {
    id: string;
    question: string;
    status: boolean|string;
}

interface UserQuestionsResult {
    userId: string;
    data: Data[];
}

const postQuestionsGroup = async (questionsGroup: UserQuestionsResult): Promise<any> => {
    const jsonString = JSON.stringify(questionsGroup);

    console.log("jsonString",jsonString)
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



const questionFilter = async (type: { type: string; userId:string;flagged:boolean;quantity:string; questions: { id: string }[] }) => {
    const jsonString = JSON.stringify(type);
    try {
        const response = await fetch(`${hostname}/api/questions`, {
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




export default {
    postQuestionsGroup,
    questionFilter,
   
}