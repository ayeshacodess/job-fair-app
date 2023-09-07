import * as React from 'react';
import { useState } from 'react';
import { AppContext } from '../Components/Context/AppContext';
import { Company } from '../Components/Model/CompanyModels';
import { getData } from '../Components/Helper/httpClient';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { MenuProps } from '../Components/Shared/Helper';

interface Column {
    id: 'Skill_Id' | 'TechnologyName' | 'Average' | 'TotalNumberOfStudent' | 'NumberOfStudentExcellent' | 'NumberOfStudentGood' |
    'NumberOfStudentFair' | 'NumberOfStudentAverage' | 'NumberOfStudentBad' | 'PercentageStudentExcellent' | 'PercentageStudentGood' |
    'PercentageStudentFair' | 'PercentageStudentAverage' | 'PercentageStudentBad';
    label: string;
    minWidth?: number;
    align?: 'center'
    format?: (value: number) => string | JSX.Element;
}

const columns: readonly Column[] = [
    {
        id: 'TechnologyName',
        label: 'Technology Name',
        minWidth: 100
    },
    {
        id: 'Average',
        label: 'Overall Average',
        minWidth: 100
    },
    {
        id: 'TotalNumberOfStudent',
        label: 'Total Students',
        minWidth: 100
    },
    {
        id: 'NumberOfStudentExcellent',
        label: 'Excellent Students',
        minWidth: 100
    },
    {
        id: 'NumberOfStudentGood',
        label: 'Good Students',
        minWidth: 100
    },
    {
        id: 'NumberOfStudentFair',
        label: 'Fair Students',
        minWidth: 100
    },
    {
        id: 'NumberOfStudentAverage',
        label: 'Average Students',
        minWidth: 100
    },
    {
        id: 'NumberOfStudentBad',
        label: 'Worst Students',
        minWidth: 100
    },
    // {
    //     id: 'PercentageStudentExcellent',
    //     label: 'Excellent Percentage',
    //     minWidth: 100
    // },
    // {
    //     id: 'PercentageStudentGood',
    //     label: 'Good Percentage',
    //     minWidth: 100
    // },
    // {
    //     id: 'PercentageStudentFair',
    //     label: 'Fair Percentage',
    //     minWidth: 100
    // },
    // {
    //     id: 'PercentageStudentAverage',
    //     label: 'Average Percentage',
    //     minWidth: 100
    // },
    // {
    //     id: 'PercentageStudentBad',
    //     label: 'Worst Percentage',
    //     minWidth: 100
    // }
];

interface StudentSkillCountModel {
    Skill_Id: number;
    TechnologyName: string;
    Average: number;
    TotalNumberOfStudent: number;
    NumberOfStudentExcellent: number;
    NumberOfStudentGood: number;
    NumberOfStudentFair: number;
    NumberOfStudentAverage: number;
    NumberOfStudentBad: number;
}

interface StudentSkillCountViewModel extends StudentSkillCountModel {
    PercentageStudentExcellent: string;
    PercentageStudentGood: string;
    PercentageStudentFair: string;
    PercentageStudentAverage: string;
    PercentageStudentBad: string;
}

export const SkillCountComponent = () => {
    const { userProfile } = React.useContext(AppContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [skillCountData, setSkillCountData] = useState([] as StudentSkillCountModel[]);
    const [companies, setCompanies] = useState([] as Company[]);
    const [selectedCompany, setSelectedCompany] = React.useState({} as Company);

    React.useEffect(() => {
        fetchCompanies();
        fetchSkillAnalytics();
    }, []);

    React.useEffect(() => {
        fetchSkillAnalytics();
    }, [selectedCompany]);

    const fetchCompanies = async () => {
        var companiesFromDb = await getData<Company[]>(`https://localhost:44309/api/AcceptedCompanies`);
        setCompanies(companiesFromDb);
    }

    const fetchSkillAnalytics = async () => {
        var url = `https://localhost:44309/api/StudentSkillCountModel?companyId=${selectedCompany?.id ? selectedCompany?.id : ''}`;
        var skills = await getData<StudentSkillCountModel[]>(url);
        setSkillCountData(skills);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const createData = (currentData: StudentSkillCountModel): StudentSkillCountViewModel => {
        return {
            Skill_Id: currentData.Skill_Id,
            TechnologyName: currentData.TechnologyName,
            Average: currentData.Average,
            NumberOfStudentAverage: currentData.NumberOfStudentAverage,
            TotalNumberOfStudent: currentData.TotalNumberOfStudent,
            NumberOfStudentBad: currentData.NumberOfStudentBad,
            NumberOfStudentFair: currentData.NumberOfStudentFair,
            NumberOfStudentGood: currentData.NumberOfStudentGood,
            NumberOfStudentExcellent: currentData.NumberOfStudentExcellent,

            PercentageStudentExcellent: (currentData.NumberOfStudentExcellent / currentData.TotalNumberOfStudent).toFixed(2),
            PercentageStudentGood: (currentData.NumberOfStudentGood / currentData.TotalNumberOfStudent).toFixed(2),
            PercentageStudentFair: (currentData.NumberOfStudentFair / currentData.TotalNumberOfStudent).toFixed(2),
            PercentageStudentAverage: (currentData.NumberOfStudentAverage / currentData.TotalNumberOfStudent).toFixed(2),
            PercentageStudentBad: (currentData.NumberOfStudentBad / currentData.TotalNumberOfStudent).toFixed(2),
        };
    }

    const handleOnDropDownChange = (event: SelectChangeEvent<number>) => {
        const { target: { value } } = event;
        const companyIndex = companies.findIndex(x => x.id === value);
        if (companyIndex > -1) {
            setSelectedCompany(companies[companyIndex]);
        }
    }

    const handleOnReset = () => {
        setSelectedCompany({} as Company);
    }

    const rows = skillCountData && skillCountData.map(x => createData(x));

    return (

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Skill Anylytics
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ mt: 1 }}>
                <React.Fragment >
                    <Grid container spacing={3} padding={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-name-label">select Company or Overall analytics</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value={selectedCompany.id}
                                    onChange={handleOnDropDownChange}
                                    input={<OutlinedInput label="Select Company" />}
                                    MenuProps={MenuProps}>
                                    {companies.map((com) => (
                                        <MenuItem key={com.id} value={com.id}>
                                            {com.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3}> </Grid>
                        <Grid item xs={6} sm={3}>
                            <Button variant="contained" type="button" onClick={handleOnReset}> Reset </Button>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Box>
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.Skill_Id}>
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
                                <p>No record found !</p>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
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