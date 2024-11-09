import hostname from "../../config/hostname";

async function tokenVarification () {


    const token = localStorage.getItem('accessToken');

    if (!token) return null

    if (token) {
      try {
        const response = await fetch(`${hostname}/api/verify-token`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
      
        const responseData = await response.json();
       
        if (responseData.areEqual) {
            return {areEqual:true,id:responseData.userId,userName:responseData.userName}
        } else {
          return false
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


export default tokenVarification