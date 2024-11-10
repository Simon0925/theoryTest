import hostname from "../../../config/hostname";


export const hptGetData = async (idUser:string) =>{
    try {
        const response = await fetch(`${hostname}/api/htp-videos?id=${idUser}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error posting questions group:", error);
        throw error;
    }
}