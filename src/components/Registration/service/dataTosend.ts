import hostname from "../../../config/hostname";
import {FormValues} from '../interface'


const dataTosend = async (formValues:FormValues) =>{

    const jsonString = JSON.stringify(formValues);

    try {
        const response = await fetch(`${hostname}/api/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonString,
        });

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


export default dataTosend