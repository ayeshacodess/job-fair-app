import { AppBar, Button, Checkbox, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { getData } from "../Helper/httpClient";
import { DisplaySchedule } from "../Model/DisplayScheduleModels";
import GiveFeedback from "./GiveFeedback";
import JumpTheQueueComponent from "./JumpTheQueue";
import { getColumnForAdminOrSocietyMember, getColumnForCompany, getColumnForStudent } from "./ScheduleUtility";

interface DisplayScheduleModel extends DisplaySchedule {
    action: JSX.Element;
}

const DisplayScheduleComponent = () => {
    const { userProfile } = useContext(AppContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [info, setInfo] = useState([] as DisplayScheduleModel[]);
    const [openGiveFeedbackDialog, setOpenGiveFeedbackDialog] = React.useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState({} as DisplaySchedule);
    const [isJumpTheQueuePopup, setIsJumpTheQueuePopup] = React.useState(false);

    React.useEffect(() => {
        fetchInfo();
    }, []);

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
        if (scheduleindex > -1) {
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
        if (scheduleindex > -1) {
            const interviewed = !scheduleRow.interviewed;
            tempList[scheduleindex].interviewed = interviewed;
            setInfo(tempList);

            const url = `https://localhost:44309/api/schedule/interviewed?isInterviewed=${interviewed}&studentId=${scheduleRow.studentId}&companyId=${scheduleRow.companyId}&scheduleId=${scheduleRow.id}`;

            await getData(url);
        }
    };
    
    const jumpTheQueueHandler = async (companyId: number, studentId: number) => {
        const url = `https://localhost:44309/api/schedule/jumpTheQueue?companyId=${companyId}&studentId=${studentId}`;
        await getData(url);
        fetchInfo();
    }

    const createData = (currentInfo: DisplayScheduleModel): DisplayScheduleModel => {
        return {
            id: currentInfo.id,
            companyId: currentInfo.companyId,
            compnayName: currentInfo.compnayName,
            studentId: currentInfo.studentId,
            percentile: currentInfo.percentile,
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
                            onClick={() => {
                                setSelectedSchedule(currentInfo);
                                setOpenGiveFeedbackDialog(true);
                            }}>
                            Feedback
                        </Button>
                    </>
                }
                {userProfile.role === "Student" && <>
                    <Button
                    disabled={!info}
                        //disabled={!currentInfo.interviewed}
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => {
                            jumpTheQueueHandler(currentInfo.companyId, currentInfo.studentId)
                        }}>
                        Jump the Queue
                    </Button>
                </>}
            </div>
        };
    }

    const handleDialog = (value: boolean) => {
        if (!value) {
            setOpenGiveFeedbackDialog(value);
            setSelectedSchedule({} as DisplaySchedule);
        }
    }

    const columns = userProfile.role === "Company" ? getColumnForCompany() :
        userProfile.role === "Student" ? getColumnForStudent() : getColumnForAdminOrSocietyMember();

    const rows = info && info.map(x => createData(x));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Schedule
                    </Typography>
                    {userProfile.role === "Student" && Number(userProfile.cgpa) > Number(2.99) && <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => setIsJumpTheQueuePopup(true)}>
                            Jump the Queue
                        </Button>}
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
            <GiveFeedback
                openDialog={openGiveFeedbackDialog}
                handleDialog={handleDialog}
                schedule={selectedSchedule}
            />
            <JumpTheQueueComponent 
                onJump={() => fetchInfo()}
                onClose={() => setIsJumpTheQueuePopup(false)} openDialog={isJumpTheQueuePopup} />
        </Paper>
    )
}

export default DisplayScheduleComponent;
