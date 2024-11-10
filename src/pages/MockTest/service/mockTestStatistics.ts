import hostname from "../../../config/hostname"

export const mockTestStatistics = async (userId: string) => {
  
    try {
        const response = await fetch(`${hostname}/api/userGetStatisticsMockTest?id=${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching data:", error); 
        return null; 
    }
}
