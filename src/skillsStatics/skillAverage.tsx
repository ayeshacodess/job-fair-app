import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { AppContext } from '../Components/Context/AppContext';
import { Company } from '../Components/Model/CompanyModels';
import { getData } from '../Components/Helper/httpClient';
import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { MenuProps } from '../Components/Shared/Helper';

interface Column {
    id: 'Skill_Id' | 'TechnologyName' | 'Average' | 'status';
    label: string;
    minWidth?: number;
    align?: 'center'
    format?: (value: number) => string | JSX.Element;
}

const columns: readonly Column[] = [
    // {
    //     id: 'Skill_Id',
    //     label: 'Company Name',
    //     align: 'center'
    // },
    {
        id: 'TechnologyName',
        label: 'Technology Name',
        minWidth: 170
    },
    {
        id: 'Average',
        label: 'Average',
        minWidth: 170
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170
    }
];

interface SkillAverageModel {
    Skill_Id: number;
    TechnologyName: string;
    Average: number;
    status: string;
}

export const SkillAverageComponent = () => {
    const { userProfile } = React.useContext(AppContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [skillAverageData, setSkillAverageData] = useState([] as SkillAverageModel[]);
    const [companies, setCompanies] = useState([] as Company[]);
    const [selectedCompany, setSelectedCompany] = React.useState({} as Company);

    React.useEffect(() => {
        fetchCompanies();
        fetchSkillAverage();
    }, []);

    React.useEffect(() => {
        fetchSkillAverage();
    }, [selectedCompany]);

    const fetchCompanies = async () => {
        var companiesFromDb = await getData<Company[]>(`https://localhost:44309/api/AcceptedCompanies`);
        setCompanies(companiesFromDb);
    }

    const fetchSkillAverage = async () => {
        var url = `https://localhost:44309/api/technoAvg?companyId=${selectedCompany?.id ? selectedCompany?.id : ''}`;
        var skills = await getData<SkillAverageModel[]>(url);
        setSkillAverageData(skills);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const grtStatusOfAvg = (avg: number)=>{
if(avg === 5){
    return "excellent";
}
else if(avg >= 4 && avg < 5){
    return "good";
}
else if(avg >= 3 && avg < 4){
    return "fair";
}
else if(avg >= 2 && avg < 3){
    return "avg";
}
else if(avg >= 1 && avg < 2){
    return "worst";
}
else{
    return "";
}
    }
    const createData = (currentSkillAverageData: SkillAverageModel): SkillAverageModel => {
        return { 
            Skill_Id: currentSkillAverageData.Skill_Id,
            TechnologyName: currentSkillAverageData.TechnologyName,
            Average: currentSkillAverageData.Average,
            status: grtStatusOfAvg(currentSkillAverageData.Average),
        };
    }

    const rows = skillAverageData && skillAverageData.map(x => createData(x));

    const handleOnDropDownChange = (event: SelectChangeEvent<number>) => {
        const companyIndex = companies.findIndex(x => x.id === event.target.value);
        if (companyIndex > -1) {
            setSelectedCompany(companies[companyIndex]);
        }
    }

    const handleOnReset = () => {
        setSelectedCompany({} as Company);
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Skill Average Data
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
                                    value={selectedCompany?.id ?? -1}
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
                        <Grid item xs={6} sm={3}></Grid>
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