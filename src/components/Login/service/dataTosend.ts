import hostname from "../../../config/hostname";
import  FormValues  from '../interface';

const dataTosend = async (formValues: FormValues) => {
    const jsonString = JSON.stringify(formValues);

    try {
        const response = await fetch(`${hostname}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonString,
        });

     
        if (!response.ok) {
            const errorData = await response.json();
            return { errors: errorData.errors || "An error occurred" };
        }

     
        const data = await response.json();
        
        
        return data;
    } catch (error) {
        console.error("Error posting registration data:", error);
        throw error;  
    }
};

export default dataTosend;
