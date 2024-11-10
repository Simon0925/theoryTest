import { Dispatch } from "react";
import hostname from "../../../config/hostname";
import { setCurrentQuestions, setLoading } from "../../../store/currentData/currentData.slice";

export const getData = async (dispatch: Dispatch<any>, userId: string) => {
    const requestUrl = `${hostname}/api/trainer?id=${userId}`;

    try {
        dispatch(setLoading({ testId: "Trainer", isLoading: true }));

        const response = await fetch(requestUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        dispatch(setCurrentQuestions({ testId: "Trainer", questions: data.trainerQuestions }));
        dispatch(setLoading({ testId: "Trainer", isLoading: false }));

        return data;
    } catch (error) {
        console.error("Error fetching trainer data:", error);
        dispatch(setLoading({ testId: "Trainer", isLoading: false })); 
        throw error;
    }
};
