import hostname from "../../../config/hostname";

const resetStatistics = async (token: string, type: string): Promise<string> => {
    const jsonString = JSON.stringify({ type });
    
    try {
        const response = await fetch(`${hostname}/api/reset-statistics`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: jsonString,
        });

        if (!response.ok) {
            const contentType = response.headers.get('Content-Type');
            let errorDetails;
            if (contentType && contentType.includes('application/json')) {
                errorDetails = await response.json();
            } else {
                errorDetails = await response.text(); 
            }
            console.error("Failed to reset statistics:", errorDetails);
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result.message; 
    } catch (error) {
        console.error("Error in resetStatisics:", error);
        throw error;
    }
};


export default resetStatistics;
