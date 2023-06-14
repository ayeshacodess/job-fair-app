import React, { useState } from 'react'
import { EventFeedbackContent } from '../Model/EventFeedbackContent'
import { DisplayFeedbackModel } from '../Model/DisplayFeedbackModel';
import { AppBar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from '@mui/material';
import { getData } from '../Helper/httpClient';
import { removeHtmlCharacter } from '../Shared/Helper';



interface Column {
    id:  'companyName' | 'feedback';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: readonly Column[] = [
    {
        id: 'companyName',
        label: 'Company Name',
    },
    {
        id: 'feedback',
        label: 'Feedback',
    },
];
const DisplayEventFeedbackComponent = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [openAddEditSkillDialog, setOpenAddEditSkillDialog] = React.useState(false);
    const [feedbacks, setFeedbacks] = useState([] as DisplayFeedbackModel[])

    React.useEffect(() => {
        fetchFeedbacks();
    }, [])

    const fetchFeedbacks = async () => {
        const feedbacksFromDb = await getData<DisplayFeedbackModel[]>("https://localhost:44309/api/feedbacks");
        setFeedbacks(feedbacksFromDb);
    }                                        

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createData = (currentFeedback: DisplayFeedbackModel): DisplayFeedbackModel => {
        return { 
            companyName: currentFeedback.companyName,
            feedback: removeHtmlCharacter(currentFeedback.feedback),
        };
    }
    
    const rows = feedbacks.map(s => createData(s));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Event Feedbacks 
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.companyName}>
                                        {columns.map((column) => {
                                            const value: any = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                   {column.id === 'companyName' && value}
												   {column.id === 'feedback' && value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            }
                        )}
                        {(!rows || rows.length === 0) && 
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell> No record found !</TableCell>
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
    );
}



export default DisplayEventFeedbackComponent
