import hostname from "../../../config/hostname";

import idUser from "../../../config/idUser"

export const getDataStatistics = async () => {


    const requestUrl = `${hostname}/api/trainer?id=${idUser}`;


    try {
        const response = await fetch(requestUrl);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error fetching data:', errorBody);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
};
