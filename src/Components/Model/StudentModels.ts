export interface Student {
    id: number;
    userId: number | null;
    name: string;
    aridNumber: string;
    studyStatus: string;
    contact1: string;
    contact2: string;
    gender: boolean | null;
    cgpa: number | null;
    cvpath: string;
    hasFYP: boolean | null;
    FypTitle: string;
    FypTech: string;
    FypGrade: string;
    studentSkills: StudentSkill[];
}

export interface StudentSkill {
    skill_Id: number;
    level_Id: number;
}