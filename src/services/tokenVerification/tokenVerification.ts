import hostname from "../../config/hostname";
import { isLoading } from "../../store/auth/auth";

async function tokenVerification(dispatch: any,token:string) { 
  

    if (!token) return null;

    try {
        dispatch(isLoading(true)); 
        const response = await fetch(`${hostname}/api/verify-token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });

        const responseData = await response.json();
        dispatch(isLoading(false)); 

        if (responseData.areEqual) {
            return { areEqual: true, id: responseData.userId, userName: responseData.userName };
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        dispatch(isLoading(false)); 
    }
}

export default tokenVerification;
