import hostname from "../config/hostname";

const getFlags = async (userId:string) => {
    try {
        const response = await fetch(`${hostname}/api/flags?id=${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("getFlags:",data)
        return data;
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

const getQuestionsGroup = async (userId:string) => {
    try {
        const response = await fetch(`${hostname}/api/usersGet?id=${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
    
        return data;
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
};


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



 interface QuestionData {
    id: string;
  }
  
  interface GetQuestions {
    type:string;
    quantity: string;
    questions: QuestionData[];
  }
  
   const postQuestionsMDB = async (questions: GetQuestions): Promise<any> => {

    const jsonString = JSON.stringify(questions);
  
  
    try {
        const response = await fetch(`${hostname}/api/questionsMDB`, {
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


const questionFilter = async (type: { type: string; userId:string;quantity:string; questions: { id: string }[] }) => {
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
    getFlags,
    postQuestionsGroup,
    getQuestionsGroup,
    postQuestionsMDB,
    questionFilter
};
