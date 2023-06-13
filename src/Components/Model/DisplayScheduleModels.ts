export interface DisplaySchedule {
    id: number;
    studentId: number;
    percentile: string;
    studentName: string;
    aridNumber: string;
    companyId: number;
    compnayName: string;
    createorId: number;
    creatorRole: string;
    date: string;
    startTime: string | null;
    endTime: string | null;
    interviewed: boolean;
    description: string;
    allocatedRoom: string;
    isShortListed: boolean;
}