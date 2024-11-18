import hostname from "../../../config/hostname";


 const getFlags = async (token:string) => {
    
    try {
        const response = await fetch(`${hostname}/api/flags?token=${token}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export {
    getFlags
}
