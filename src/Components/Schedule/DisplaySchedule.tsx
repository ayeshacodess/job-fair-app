import { Button, Paper, AppBar, Toolbar, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, FormGroup, Checkbox, FormControlLabel, Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { getData } from "../Helper/httpClient";
import { DisplaySchedule } from "../Model/DisplayScheduleModels";
import { AppContext } from "../Context/AppContext";

interface Column {
    id: 'id' | "studentId" | 'studentName' | 'aridNumber' | 'companyId' | 'compnayName' | 'createorId' | 'creatorRole' | 'date' | 'startTime' | 'endTime' | 'allocatedRoom' | 'action';
    label: string;
    minWidth?: number;
    align?: 'center'
    format?: (value: any) => string | JSX.Element;
}

const columns: readonly Column[] = [
    {
        id: 'compnayName',
        label: 'Company Name',
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
    },
    {
        id: 'action',
        label: 'Actions',
        minWidth: 170
    },
];

interface DisplayScheduleModel extends DisplaySchedule {
    action: JSX.Element;
}

const DisplayScheduleComponent = () => {
    const { userProfile } = useContext(AppContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [info, setInfo] = useState([] as DisplayScheduleModel[]);

    React.useEffect(
        () => {
            fetchInfo();
        }, []
    )
    const fetchInfo = async () => {
        const url = `https://localhost:44309/api/schedule/get?role=${userProfile.role}&userId=${userProfile.userProfileId}`
        var infoFromDb = await getData<DisplayScheduleModel[]>(url);
        setInfo(infoFromDb);
    }
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeShortLIst = async (scheduleRow: DisplayScheduleModel) => {
        var tempList = [...info]
        const scheduleindex = tempList.findIndex(x => scheduleRow.id == x.id);
        if(scheduleindex > -1){
            const shortListed = !scheduleRow.isShortListed;
            tempList[scheduleindex].isShortListed = shortListed;
            setInfo(tempList);

            //save to db as well
            //create action in schdlue controller, add the param as given below url
            //then save to db
            const url = `https://localhost:44309/api/schedule/shortlist?isShortList=${shortListed}&studentId=${scheduleRow.studentId}&companyId=${scheduleRow.companyId}&scheduleId=${scheduleRow.id}`;

            await getData(url);
        }
    };

    const handleChangeInterviewed = async (scheduleRow: DisplayScheduleModel) => {
        var tempList = [...info]
        const scheduleindex = tempList.findIndex(x => scheduleRow.id == x.id);
        if(scheduleindex > -1){
            const interviewed = !scheduleRow.interviewed;
            tempList[scheduleindex].interviewed = interviewed;
            setInfo(tempList);

            const url = `https://localhost:44309/api/schedule/interviewed?isInterviewed=${interviewed}&studentId=${scheduleRow.studentId}&companyId=${scheduleRow.companyId}&scheduleId=${scheduleRow.id}`;

            await getData(url);
        }
    };

    const handleStudentFeedbackClick = (aridNumber: string) => {
        alert(`${aridNumber}`);
    }

    const createData = (currentInfo: DisplayScheduleModel): DisplayScheduleModel => {
        return {
            id: currentInfo.id,
            companyId: currentInfo.companyId,
            compnayName: currentInfo.compnayName,
            studentId: currentInfo.studentId,
            studentName: currentInfo.studentName,
            aridNumber: currentInfo.aridNumber,
            allocatedRoom: currentInfo.allocatedRoom,
            createorId: currentInfo.createorId,
            creatorRole: currentInfo.creatorRole,
            startTime: currentInfo.startTime,
            endTime: currentInfo.endTime,
            date: currentInfo.date,
            interviewed: currentInfo.interviewed,
            description: currentInfo.description,
            isShortListed: currentInfo.isShortListed,
            action: <div>
                {(userProfile.role === "Company") &&
                <>
                    <FormControlLabel
                        control={<Checkbox 
                            checked={currentInfo.interviewed}
                            onChange={() => handleChangeInterviewed(currentInfo)}
                            name="interviewed"
                            id='interviewed' />
                        }
                        label="Interviewed"
                    />
                    <FormControlLabel
                        control={<Checkbox 
                            checked={currentInfo.isShortListed}
                            onChange={() => handleChangeShortLIst(currentInfo)}
                            name="isShortListed"
                            id='isShortListed' />
                        }
                        label="Shortlist"
                    />
                    <Button
                        disabled={!currentInfo.interviewed}
                        variant="contained"
                        color="success"
                        size="medium"
                        onClick={() => handleStudentFeedbackClick(currentInfo.aridNumber)}>
                        Feedback
                    </Button>
                </>
                }
            </div>
        };
    }

    const rows = info && info.map(x => createData(x));

                return (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Schedule
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows && rows.length > 0 &&
                                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format ? column.format(value) : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        }
                                        )}
                                {(!rows || rows.length === 0) &&
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        <TableCell>No record found !</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                )
}

                export default DisplayScheduleComponent;
