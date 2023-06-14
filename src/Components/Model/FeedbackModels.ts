export interface Feedback{
    rate: number;
    skill_ld: number;   
}

export interface StudentFeedback{
    studentId: number;
    companyId: number;
    stdFeedback: Feedback[];
}


export interface DisplayFeedback{
    rate: number;
    skill_ld: number;   
    skillName: string;
}

export interface DisplayStudentFeedback{
    studentId: number;
    companyId: number;
    companyName: string;
    stdFeedback: DisplayFeedback[];
}


export interface  DisplayStudentFeedbackTableModel {
    companyName: string;
    rate: number;
    skillName: string;
}