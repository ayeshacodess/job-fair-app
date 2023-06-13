export interface DisplayScheduleColumn {
    id: 'id' | "studentId" | "percentile" | 'studentName' | 'aridNumber' | 'companyId' | 'compnayName' | 'createorId' | 'creatorRole' | 'date' | 'startTime' | 'endTime' | 'allocatedRoom' | 'action';
    label: string;
    minWidth?: number;
    align?: 'center'
    format?: (value: any) => string | JSX.Element;
}

export const getColumnForCompany  = () : DisplayScheduleColumn[] => {
    const columns: DisplayScheduleColumn[] = [
        {
            id: 'percentile',
            label: 'Percentile ',
            align: 'center'
        },
        {
            id: 'studentName',
            label: 'Student Name',
            align: 'center'
        },
        {
            id: 'aridNumber',
            label: 'Arid Number',
            align: 'center'
        },
        {
            id: 'startTime',
            label: 'Start Time',
            format: (value: any) => {
                if (value) {
                    const endDT = new Date(value);
                    return `${endDT.getHours().toString().padStart(2, '0')}:${endDT.getMinutes().toString().padStart(2, '0')}`;
                }
                return "---"
            }
        },
        {
            id: 'endTime',
            label: 'End Time',
            format: (value: any) => {
                if (value) {
                    const endDT = new Date(value);
                    return `${endDT.getHours().toString().padStart(2, '0')}:${endDT.getMinutes().toString().padStart(2, '0')}`;
                }
                return "---"
            }
        },
        {
            id: 'allocatedRoom',
            label: ' Allocated Room'
        },
        {
            id: 'action',
            label: 'Actions',
            minWidth: 170
        },
    ];
    return columns;
}

export const getColumnForStudent = () : DisplayScheduleColumn[] => {
    const columns: DisplayScheduleColumn[] = [
        {
            id: 'compnayName',
            label: 'Company Name',
            align: 'center'
        },
        {
            id: 'startTime',
            label: 'Start Time',
            format: (value: any) => {
                if (value) {
                    const endDT = new Date(value);
                    return `${endDT.getHours().toString().padStart(2, '0')}:${endDT.getMinutes().toString().padStart(2, '0')}`;
                }
                return "---"
            }
        },
        {
            id: 'endTime',
            label: 'End Time',
            format: (value: any) => {
                if (value) {
                    const endDT = new Date(value);
                    return `${endDT.getHours().toString().padStart(2, '0')}:${endDT.getMinutes().toString().padStart(2, '0')}`;
                }
                return "---"
            }
        },
        {
            id: 'allocatedRoom',
            label: ' Allocated Room'
        }
    ];
    return columns;
}

export const getColumnForAdminOrSocietyMember  = () : DisplayScheduleColumn[] => {
    const columns: DisplayScheduleColumn[] = [
        {
            id: 'compnayName',
            label: 'Company Name',
            align: 'center'
        },
        {
            id: 'percentile',
            label: 'Percentile ',
            align: 'center'
        },
        {
            id: 'studentName',
            label: 'Student Name',
            align: 'center'
        },
        {
            id: 'aridNumber',
            label: 'Arid Number',
            align: 'center'
        },
        {
            id: 'creatorRole',
            label: 'Created By',
            align: 'center'
        },
        {
            id: 'startTime',
            label: 'Start Time',
            format: (value: any) => {
                if (value) {
                    const endDT = new Date(value);
                    return `${endDT.getHours().toString().padStart(2, '0')}:${endDT.getMinutes().toString().padStart(2, '0')}`;
                }
                return "---"
            }
        },
        {
            id: 'endTime',
            label: 'End Time',
            format: (value: any) => {
                if (value) {
                    const endDT = new Date(value);
                    return `${endDT.getHours().toString().padStart(2, '0')}:${endDT.getMinutes().toString().padStart(2, '0')}`;
                }
                return "---"
            }
        },
        {
            id: 'allocatedRoom',
            label: ' Allocated Room'
        }
    ];
    return columns;
}