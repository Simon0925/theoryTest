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




const assessmentData = async (userId:string) =>{
    
    try {
        const response = await fetch(`${hostname}/api/mock-test?id=${userId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
    
        return data;

    }catch (error) {
        console.error("Error posting questions group:", error);
        throw error;
    }
}

export default {
    postQuestionsGroup,
    postQuestionsMDB,
    assessmentData
};
