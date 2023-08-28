import { AppBar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getData } from '../Helper/httpClient';
import { Student } from '../Model/StudentModels';

interface Column {
    id: 'studentName'
    label: string;
    minWidth?: number;
    align?: 'center';
}

const columns: readonly Column[] = [
    {
        id: 'studentName',
        label: 'Jumped interviewed Students in Company',
        align: 'center',
    },
];
interface JumpedStudentsProps {
    compId: number;
}
const JumpedStudentsComponent: React.FC<JumpedStudentsProps> = (props: JumpedStudentsProps) => {
    const { compId } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [students, setStudents] = useState([] as Student[]);

    useEffect(() => {
        loadStudents();
    }, [])

    const loadStudents = async () => {
        const studentsFromAPI = await getData<Student[]>(`https://localhost:44309/api/JumpedStudents?companyId=${compId}`);
        setStudents(studentsFromAPI);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const createData = (student: Student): string => {
        return student.name
    };
    const rows = students && students.map((x) => createData(x));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Jumped Interviewed Students
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
                        {rows &&
                            rows.length > 0 &&
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row}
                                        >
                                            {columns.map((column) => {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === 'studentName' && row}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        {(!rows || rows.length === 0) && (
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell colSpan={columns.length}>
                                    <p>No record found!</p>
                                </TableCell>
                            </TableRow>
                        )}
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
    );
}

export default JumpedStudentsComponent;
