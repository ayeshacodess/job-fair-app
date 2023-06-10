export interface Feedback{
    rate: number;
    skill_ld: number;   
}

export interface StudentFeedback{
    studentId: number;
    companyId: number;
    stdFeedback: Feedback[];
}