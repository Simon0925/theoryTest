import { QuestionResult, Question } from '../interface/interface';

export const mockTestData = (mockTestData: Question[], localStorageData: QuestionResult[]) => {
    const localStorageDataMap: { [key: string]: QuestionResult } = {};
    localStorageData.forEach(l => {
        localStorageDataMap[l.id] = l;
    });

    let data: QuestionResult[] = mockTestData.map(m => {
        if (localStorageDataMap[m._id]) {
            const l = localStorageDataMap[m._id];
            return {
                id: l.id,
                group: l.group,   
                flag: l.flag,     
                question: l.question,
                status: l.status   
            };
        } else {
            return {
                id: m._id,
                group: m.group,
                flag: m.flag,
                question: m.question,
                status: "pass"    
            };
        }
    });
    return data; 
};
