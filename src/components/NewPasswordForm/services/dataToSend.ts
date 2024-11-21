import hostname from "../../../config/hostname";
import { FormValues } from '../interface';

const dataToSend = async (formData: FormValues) => {
    try {
        const response = await fetch(`${hostname}/api/new-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const status = response.status;

        if (!response.ok) {
            const errorData = await response.json();
            return { status, errors: errorData.errors || "An error occurred" };
        }

        const responseData = await response.json();
        return { status, data: responseData };

    } catch (error) {
        console.error("Error posting data:", error);
        throw new Error("Server error. Please try again later.");
    }
}

export default dataToSend;
