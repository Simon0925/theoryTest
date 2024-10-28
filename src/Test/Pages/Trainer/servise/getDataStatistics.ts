import hostname from "../../../../config/hostname";
import idUser from "../../../../config/idUser";
import { setCurrentQuestions, setLoading } from "../../../../store/currentData/currentData.slice";
import { Dispatch } from "react";


export const getDataStatistics = async (
  dispatch: Dispatch<any>,
  setTrainerOnceTwice: React.Dispatch<React.SetStateAction<{ once: number | null, twice: number | null }>> 
) => {
  const requestUrl = `${hostname}/api/trainer?id=${idUser}`;
  try {
    dispatch(
      setLoading({
        testId: "Trainer",
        isLoading: true,
      })
    );

    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    dispatch(
      setCurrentQuestions({
        testId: "Trainer",
        questions: data.trainerQuestions,
      })
    );

   
    setTrainerOnceTwice((prev) => ({
      ...prev,
      once: data.correctAnswersOnce,
      twice: data.correctAnswersTwice,
    }));

    dispatch(
      setLoading({
        testId: "Trainer",
        isLoading: false,
      })
    );

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
