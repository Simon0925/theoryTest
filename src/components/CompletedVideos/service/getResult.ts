import hostname from "../../../config/hostname";

interface Time {
    time: string;
}

interface Results {
    id: string;
    flag: Time[];
}

export interface Hpt {
    results: Results[];
}

const getResult = async (data:Results[],token:string) => {

    const jsonString =  JSON.stringify({
        token:token,
        result:data
    }); 
    
    try {
        const response = await fetch(`${hostname}/api/videoResult`, {
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


export default getResult