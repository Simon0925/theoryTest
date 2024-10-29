import userId from "../../../config/idUser";
import hostname from "../../../config/hostname";
import { setCurrentQuestions, setLoading } from "../../../store/currentData/currentData.slice";
import { Dispatch } from "react"; 

export const assessmentData = async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading({
        testId: 'MockTest',
        isLoading: true,
      }));
    const response = await fetch(`${hostname}/api/mock-test?id=${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    dispatch(setCurrentQuestions({
      testId: 'MockTest',
      questions: data,
    }));

    dispatch(setLoading({
        testId: 'MockTest',
        isLoading: false,
      }));

  } catch (error) {
    console.error("Error posting questions group:", error);
    throw error;
  }
};
