import { Dispatch } from "react";
import hostname from "../../../config/hostname";
import { setCurrentQuestions, setLoading } from "../../../store/currentData/currentData.slice";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

export const getData = async (
  
    dispatch: Dispatch<any> 
  ) => {
  const userId = useSelector((state: RootState) => state.auth.userId);

    const requestUrl = `${hostname}/api/trainer?id=${userId}`;
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