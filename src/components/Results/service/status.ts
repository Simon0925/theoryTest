interface UserQuestionsResult {
    userId: string|null;
    data: Data[];
    statisticData?: any; 
}

interface Data {
    id: string;
    question: string;
    status: boolean | string;
}

const status = (data: UserQuestionsResult, typeOftest: string) => {
    const updatedData = data.data.map((item: Data) => ({
        ...item,
        status: item.status ?? "pass", 
    }));

    let newData: any = {}; 

    if (typeOftest === 'MockTest') {
        newData = {
            userId: data.userId,
            data: updatedData,
            statisticData: data.statisticData,
            mockTest: "MockTest"
        };
    } else {
        newData = {
            userId: data.userId,
            data: updatedData
        };
    }

    return newData;
};

export default {
    status
};
