
import userId from "../../../config/idUser"
import hostname from "../../../config/hostname"

export const mockTestStatistics = async () =>{
    try{
        const response = await fetch(`${hostname}/api/userGetStatisticsMockTest?id=${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data:",data)
        return data;

    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}