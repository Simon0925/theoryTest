const isTest = (path:string) =>{
    const currenPath = window.location.pathname;
    if(currenPath !== path){   
        return true
    }
}

export default isTest