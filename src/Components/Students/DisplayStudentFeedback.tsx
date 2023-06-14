import React from 'react'
import { DisplayFeedback, DisplayStudentFeedback, DisplayStudentFeedbackTableModel } from '../Model/FeedbackModels'
import { getData } from '../Helper/httpClient';
import { AppContext } from '../Context/AppContext';
import { AppBar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from '@mui/material';

interface Column {
    id:  'companyName' | 'skillName' | 'rate';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string | JSX.Element;
}

const columns: readonly Column[] = [
    {
        id: 'companyName',
        label: 'Company Name',
    },
    {
        id: 'skillName',
        label: 'skill',
    },
    {
        id: 'rate',
        label: 'Rating',
        format: (val: number) => {
            var text = "None";
            if (val === 5) {
                text = "Excellent";
            }
            else if (val === 4) {
                text = "Good"
            }

            return text;
        }
    },
];

const DisplayStudentFeedbackComponent = () => {
    const { userProfile } = React.useContext(AppContext);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [feedbacks, setFeedbacks] = React.useState([] as DisplayStudentFeedback[])

    React.useEffect(() => {
        fetchFeedbacks();
    }, [])

    const fetchFeedbacks = async () => {
        const url = `https://localhost:44309/api/student/getStudentFeedback?id=${userProfile.userProfileId}`;
        const feedbacksFromDb = await getData<DisplayStudentFeedback[]>(url);
        setFeedbacks(feedbacksFromDb);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createData = (currentFeedback: DisplayStudentFeedback): DisplayStudentFeedbackTableModel[] => {
        const models : DisplayStudentFeedbackTableModel[] = [];
        
        currentFeedback.stdFeedback.map(x => {
            const model: DisplayStudentFeedbackTableModel = {
                companyName: currentFeedback.companyName,
                rate: x.rate,
                skillName: x.skillName
            }
        });

        return models;
    }

    const rows: DisplayStudentFeedbackTableModel[] = [];

    feedbacks.forEach(element => {
        element.stdFeedback.forEach(it => {
            const d: DisplayStudentFeedbackTableModel = {
                companyName: element.companyName,
                rate: it.rate,
                skillName: it.skillName
            }
            rows.push(d);
        })
    });

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Your Feedbacks 
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
                                    <TableRow hover role="checkbox" tabIndex={-1} >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                   {column.format ? column.format(value as number) : value}
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

export default DisplayStudentFeedbackComponent
