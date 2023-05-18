import { Skill } from "./SkillModels";

export interface Company {
    //findIndex(arg0: (s: any) => boolean): string | number | readonly string[] | undefined;
    id: number;
    userId: number | null;
    name: string;
    noOfInterviewers: number | null;
    contact1: string;
    contact2: string;
    timeSlot: number;
    profile: string;
    status: string;
    skills: Skill[];
   // skill_Ids: number;
}