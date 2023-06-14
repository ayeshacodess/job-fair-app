import { Paper, AppBar, Toolbar, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import React from 'react'
import { Skill } from '../Model/SkillModels';
import { CompanySummary } from '../Model/CompanySummaryModels';
import { getData } from '../Helper/httpClient';
import { format } from 'path';
import HoverRating from './Rating';

interface Column {
    id: 'companyId' | 'companyName' | 'totalInterviews' | 'totalShortlisted' | 'teerAvg' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string | JSX.Element;
}

const columns: readonly Column[] = [
    {
        id: 'companyName',
        label: 'company Name',
        minWidth: 170
    },
    {
        id: 'totalInterviews',
        label: 'Interviewed',
        minWidth: 170
    },
    {
        id: 'totalShortlisted',
        label: 'Shortlisted',
        minWidth: 170
    },
    {
        id: 'teerAvg',
        label: 'Teer Avg',
        minWidth: 170
    },
    {
        id: 'action',
        label: 'Rating',
        minWidth: 170
    }
];

interface CompanySummaryModel extends CompanySummary {
    action: JSX.Element;
}

const CompanySummaryComponent = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [summaries, setSummaries] = React.useState([] as CompanySummary[]);
    const [openAddEditSkillDialog, setOpenAddEditSkillDialog] = React.useState(false);

    React.useEffect(() => {
        fetchSkills();
    }, [])

    const fetchSkills = async () => {
        const dbData = await getData<CompanySummary[]>("https://localhost:44309/api/summary/companies");
        setSummaries(dbData);
    }                                        

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createData = (currentData: CompanySummary): CompanySummaryModel => {
        return { 
            companyId: currentData.companyId, 
            companyName: currentData.companyName,
            companyRate: currentData.companyRate,
            teerAvg: currentData.teerAvg,
            totalInterviews: currentData.totalInterviews,
            totalShortlisted: currentData.totalShortlisted,
            action: <div>
                <HoverRating rate={currentData.companyRate} companyId={currentData.companyId}/>
            </div>
        };
    }

    const rows = summaries.map(s => createData(s));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Companies Summaries 
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
                                    <TableRow hover role="checkbox" tabIndex={-1}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
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

export default CompanySummaryComponent
