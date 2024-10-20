import userId from "../../../config/idUser";
import hostname from "../../../config/hostname";

export const assessmentData = async () =>{
    
  try {
      const response = await fetch(`${hostname}/api/mock-test?id=${userId}`);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  
      return data;

  }catch (error) {
      console.error("Error posting questions group:", error);
      throw error;
  }
}