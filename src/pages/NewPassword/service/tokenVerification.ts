import hostname from "../../../config/hostname";

async function tokenVerification(token: string) {
    console.log("tokenVerification:",token)
    try {
        const response = await fetch(`${hostname}/api/check-reset-token`, {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error("Token verification error:", error);
        throw error; 
    }
}

export default tokenVerification;
