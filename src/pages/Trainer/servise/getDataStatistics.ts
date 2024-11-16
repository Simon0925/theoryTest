import { Dispatch } from "react";
import hostname from "../../../config/hostname";
import { setLoading } from "../../../store/currentData/currentData.slice";

interface TrainerOnceTwice {
  once: number | null;
  twice: number | null;
}

export const getDataStatistics = async (
  dispatch: Dispatch<any>,
  setTrainerOnceTwice: React.Dispatch<React.SetStateAction<TrainerOnceTwice>>,
  idUser: string
) => {
  const requestUrl = `${hostname}/api/trainer?id=${idUser}`;

  try {
    dispatch(setLoading({ testId: "Trainer", isLoading: true }));
    const response = await fetch(requestUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch trainer data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
  
    setTrainerOnceTwice(prev => ({
      ...prev,
      once: Math.floor(data.correctAnswersOnce),
      twice: Math.floor(data.correctAnswersTwice),
    }));

    return data;
  } catch (error) {
    console.error("Error fetching trainer statistics:", error);
    throw error;
  } finally {
    dispatch(setLoading({ testId: "Trainer", isLoading: false }));
  }
};
