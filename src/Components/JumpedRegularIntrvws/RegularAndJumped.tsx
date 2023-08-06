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
import { RegularAndJumped } from '../Model/regularAndJumpedModel';

interface Column {
  id: 'companyName' | 'totalJumpedStudents' | 'regularInterviews' | 'action';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string | JSX.Element;
}

const columns: readonly Column[] = [
  {
    id: 'companyName',
    label: 'Company Name',
    align: 'center',
  },
  {
    id: 'totalJumpedStudents',
    label: 'Contact1',
    minWidth: 170,
  },
  {
    id: 'regularInterviews',
    label: 'Status',
    minWidth: 170,
  },
  {
    id: 'action',
    label: 'Actions',
    minWidth: 170,
  },
];

interface RegularAndJumpedModel extends RegularAndJumped {
  action: JSX.Element;
}

const RegularAndJumpedCOmponent = () => {
  const { userProfile } = React.useContext(AppContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [companies, setCompanies] = useState([] as RegularAndJumpedModel[]);
  const [openTotalJumpedDialogue, setOpenTotalJumpedDialogue] = useState(false);
  const [openRegularInterviewsDialogue, setRegularInterviewsDialogue] =
    useState(false);

  React.useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const companiesFromDb = await getData<RegularAndJumpedModel[]>(
      `https://localhost:44309/api/companiesRegAndJump?role=${userProfile.role}&userId=${userProfile.userProfileId}`
    );
    setCompanies(companiesFromDb);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRegularInterviews = (): void => {
    // Implement your logic for handling regular interviews here
  };

  const handleJumpedStudents = (): void => {
    // Implement your logic for handling jumped students here
  };

  const createData = (currentCompany: RegularAndJumpedModel): RegularAndJumpedModel => {
    return {
      companyName: currentCompany.companyName,
      totalJumpedStudents: currentCompany.totalJumpedStudents,
      regularInterviews: currentCompany.regularInterviews,
      action: (
        <>
          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={() => handleRegularInterviews()}
          >
            Regular Interviewed Students
          </Button>

          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={() => handleJumpedStudents()}
          >
            Total Jumped Students
          </Button>
        </>
      ),
    };
  };

  const handleJumpedDialogue = (value: boolean) => {
    if (!value) {
      setOpenTotalJumpedDialogue(value);
    }
  };

  const rows = companies && companies.map((x) => createData(x));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Companies
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
                      key={row.companyName}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'companyName' && value}
                            {column.id === 'totalJumpedStudents' && value}
                            {column.id === 'regularInterviews' && value}
                            {column.id === 'action' && value}
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
};

export default RegularAndJumpedCOmponent;
