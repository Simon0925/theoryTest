import { Dispatch } from "react";
import hostname from "../../config/hostname";
import { setCurrentQuestions, setLoading } from "../../store/currentData/currentData.slice";

export const allData = async (dispatch: Dispatch<any>, token: string,typeOftest:string) => {

    const requestUrl = `${hostname}/api/all-data?token=${token}`;

    try {
        
        console.log("allData:")
        
        // dispatch(setLoading({ testId: typeOftest, isLoading: true }));

        const response = await fetch(requestUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        console.log("data:",data)

        // dispatch(setCurrentQuestions({ testId: typeOftest, questions: data.trainerQuestions }));
        // dispatch(setLoading({ testId: typeOftest, isLoading: false }));

        return data;
    } catch (error) {
        console.error("Error fetching trainer data:", error);
        // dispatch(setLoading({ testId: typeOftest, isLoading: false })); 
        throw error;
    }
};
