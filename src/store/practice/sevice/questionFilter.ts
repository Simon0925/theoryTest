import hostname from "../../../config/hostname";


const questionFilter = async (type: { type: string; token:string | null;flagged:boolean;quantity:string; topics: { id: string }[] }) => {
    const jsonString = JSON.stringify(type);

    console.log("topics:",type)
  
    try {
        const response = await fetch(`${hostname}/api/questions-filter`, {
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
        console.error("Error posting questions:", error);
        throw error;
    }
};
export default {
    questionFilter,
};
