const isTest = (path: string, testsData: any) => {
    const currenPath = window.location.pathname;
    const typeOftests = ['PracticeTest', "MockTest", "Trainer"];
  
    return typeOftests.some((testType) => {
      const questions = testsData[testType]?.questions || [];
      return currenPath !== path && questions.length > 0;
    });
  };


export default isTest