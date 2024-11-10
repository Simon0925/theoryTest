import hostname from "../../config/hostname";
import { loading } from "../../store/auth/auth";

async function tokenVerification(dispatch: any) { 
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
        dispatch(loading(true)); 
        const response = await fetch(`${hostname}/api/verify-token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });

        const responseData = await response.json();
        dispatch(loading(false)); 

        if (responseData.areEqual) {
            return { areEqual: true, id: responseData.userId, userName: responseData.userName };
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        dispatch(loading(false)); 
    }
}

export default tokenVerification;
