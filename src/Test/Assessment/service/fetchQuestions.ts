import service from "../../../service/service";
import idUser from "../../../config/idUser";
import { Question } from "../Assessment";

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    return await service.assessmentData(idUser);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};