import { Dispatch } from "react";
import { setCurrentQuestions, setLoading } from "../../../store/currentData/currentData.slice";
import hostname from "../../../config/hostname";

export const assessmentData = async (dispatch: Dispatch<any>,token:string) => {


  try {
    dispatch(setLoading({
      testId: "MockTest",
      isLoading: true,
    }));

    const response = await fetch(`${hostname}/api/mock-test?token=${token}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch(setCurrentQuestions({
      testId: "MockTest",
      questions: data,
    }));

    dispatch(setLoading({
      testId: "MockTest",
      isLoading: false,
    }));
  } catch (error) {
    console.error("Error posting questions group:", error);
    throw error;
  }
};
