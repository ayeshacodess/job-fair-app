import { Button, Paper, AppBar, Toolbar, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import React, { useState } from "react";
import { getData } from "../Helper/httpClient";
import { Company } from "../Model/CompanyModels";
import { Student } from "../Model/StudentModels";
import AddEditCompany from "../companies/AddEditCompany";
import AddEditStudent from "./AddEditStudent";


interface Column {
    id: 'id' | 'name' | 'aridNumber' | 'studyStatus' | 'contact1' | 'gender' | 'cgpa' | 'action' ;
    label: string;
    minWidth?: number;
    align?: 'center'
    format?: (value: any) => string | JSX.Element;
}

const columns: readonly Column[] = [
    {
        id: 'name',
        label: 'Student Name',
        align: 'center'
    },
    {
        id: 'aridNumber',
        label: 'Arid Number',
        minWidth: 120
    },
    {
        id: 'studyStatus',
        label: 'Status',
        minWidth: 170
    },
    {
        id: 'contact1',
        label: 'Contact1',
        minWidth: 100
    },
    {
        id: 'gender',
        label: 'Gender',
        format: (value: boolean) => value ? "Male" : "Female",
        minWidth: 50
    },
	{
        id: 'cgpa',
        label: 'CGPA',
        minWidth: 50
    },
	{
        id: 'action',
        label: 'Action',
        minWidth: 170
    },
];

interface StudentModel extends Student{
	action : JSX.Element;
}

const StudentComponent = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [students, setStudents] = useState([] as StudentModel[]);
    const [selectedStudent, setSelectedStudent] = React.useState({} as Student);
    const [openAddEditStudentDialogue, setOpenAddEditStudentDialogue] = useState(false);

    React.useEffect(
        () => {
            fetchStudents();
        }, []
    )
    const fetchStudents = async () => {
        var studentsFromDb = await getData<StudentModel[]>("https://localhost:44309/api/students");
        setStudents(studentsFromDb);
    }    
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createData = (currentStudent: StudentModel): StudentModel => {
        return {
            id: currentStudent.id,
            name: currentStudent.name,
            aridNumber: currentStudent.aridNumber,
            cgpa: currentStudent.cgpa,
            contact1: currentStudent.contact1,
            contact2: currentStudent.contact2,
            gender: currentStudent.gender,
            userId: currentStudent.userId,
			studyStatus: currentStudent.studyStatus,
            cvpath: currentStudent.cvpath,
            hasFYP: currentStudent.hasFYP,
            FypTitle: currentStudent.FypTitle,
            FypTech: currentStudent.FypTech,
            FypGrade: currentStudent.FypGrade,
            studentSkills: currentStudent.studentSkills,
            action: <div>
                <Button
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={() => {
                        // setSelectedCompany(currentCompany);
                        // setOpenAddCompanyDialog(true);
                        alert('comming soon.... !');
                    }}>
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={() => {
                        alert('comming soon.... !');
                    }}>
                    Delete
                </Button>
            </div>
        };
    }

    const handleDialog = (value: boolean) => {
        if (!value) {
            setOpenAddEditStudentDialogue(value);
            setSelectedStudent({} as Student);
        }
    }

    const rows = students && students.map(x => createData(x));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Students
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            //alert("Comming soon....!");
                            setSelectedStudent({} as Student);
                            setOpenAddEditStudentDialogue(true);
                        }}>
                        Add Student
                    </Button>
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
                                <p>No record found !</p>
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
            <AddEditStudent
                openDialog={openAddEditStudentDialogue}
                selectedStudent={selectedStudent}
                handleDialog={handleDialog}
            />
        </Paper>
    )
}
export default StudentComponent;