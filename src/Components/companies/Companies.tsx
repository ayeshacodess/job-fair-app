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
import { getData } from '../Helper/httpClient';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Company } from '../Model/CompanyModels';
import { AppContext } from '../Context/AppContext';

interface Column {
    id: 'id' | 'name' | 'contact1' | 'status' | 'action';
    label: string;
    minWidth?: number;
    align?: 'center'
    format?: (value: number) => string | JSX.Element;
}

const columns: readonly Column[] = [
    {
        id: 'name',
        label: 'Company Name',
        align: 'center'
    },
    {
        id: 'contact1',
        label: 'Contact1',
        minWidth: 170
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170
    },
    {
        id: 'action',
        label: 'Actions',
        minWidth: 170
    },
];

interface CompanyModel extends Company {
    action: JSX.Element;
}

const CompanyComponent = () => {
    const { userProfile } = React.useContext(AppContext);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [companies, setCompanies] = useState([] as CompanyModel[]);
    const [selectedCompany, setSelectedCompany] = React.useState({} as Company);
    const [openAddEditCompanyDialogue, setOpenAddEditCompanyDialogue] = useState(false);

    React.useEffect(() => {
            fetchCompanies();
        }, []);

    const fetchCompanies = async () => {
        var companiesFromDb = await getData<CompanyModel[]>(`https://localhost:44309/api/companies?role=${userProfile.role}&userId=${userProfile.userProfileId}`);
        setCompanies(companiesFromDb);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const acceptRejectCompany = async (status: string, companyId: number) => {
        var url = `https://localhost:44309/api/company/status?status=${status}&companyId=${companyId}`;
        var com = await getData<CompanyModel[]>(url);
        setCompanies(com);
    }

    const select_UnselectCompany = async (companyId: number) => {
        var url = `https://localhost:44309/api/company/studentapply?companyId=${companyId}&studentId=${userProfile.userProfileId}`;
        var com = await getData<CompanyModel[]>(url);
        setCompanies(com);
    }

    const createData = (currentCompany: CompanyModel): CompanyModel => {
        return { 
            id: currentCompany.id,
            name: currentCompany.name,
            noOfInterviewers: currentCompany.noOfInterviewers,
            contact1: currentCompany.contact1,
            contact2: currentCompany.contact2,
            status: currentCompany.status,
            timeSlot: currentCompany.timeSlot,
            profile: currentCompany.profile,
            skills: currentCompany.skills,
            userId: currentCompany.userId,
            email: currentCompany.email,
            action: <div>
                {(userProfile.role === "Admin" || userProfile.role === "SocietyMember") && 
                    <>
                        <Button
                            disabled={currentCompany.status === "Accept"}
                            variant="contained"
                            color="success"
                            size="medium"
                            onClick={() => acceptRejectCompany("Accept", currentCompany.id)}>
                            Accept
                        </Button>
                        <Button
                            disabled={currentCompany.status === "Reject"}
                            variant="outlined"
                            color="error"
                            size="medium"
                            onClick={() => acceptRejectCompany("Reject", currentCompany.id)}>
                            Reject
                        </Button>
                    </>
                }
                {userProfile.role === "Student" && 
                    <>
                        <Button
                            disabled={currentCompany.status === "Selected"}
                            variant="contained"
                            color="success"
                            size="medium"
                            onClick={() => select_UnselectCompany(currentCompany.id)}>
                            Select
                        </Button>
                        <Button
                            variant="outlined"
                            disabled={currentCompany.status !== "Selected"}
                            color="error"
                            size="medium"
                            onClick={() => select_UnselectCompany(currentCompany.id)}>
                            UN-Select
                        </Button>
                    </>
                }
            </div>
        };
    }

    const handleDialog = (value: boolean) => {
        if (!value) {
            setOpenAddEditCompanyDialogue(value);
            setSelectedCompany({} as Company);
        }
    }

    const rows = companies && companies.map(x => createData(x));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Companies
                    </Typography>
                    {/* {userProfile.role !== "Student" &&  <>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                            setSelectedCompany({} as Company);
                            setOpenAddEditCompanyDialogue(true);
                        }}>
                        Add Company
                    </Button>
                    </>} */}
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

export default CompanyComponent;