import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getData } from '../Helper/httpClient';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { RegularAndJumped } from '../Model/regularAndJumpedModel';

interface Column {
  id: 'companyName' | 'JumpedStudentsInterviews' | 'regularInterviews' ;
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
    id: 'JumpedStudentsInterviews',
    label: 'Jumped Students Interview',
    minWidth: 170,
  },
  {
    id: 'regularInterviews',
    label: 'Regular Interviews',
    minWidth: 170,
  },
];
interface RegularAndJumpedProps{
  onRegularStudentClick: (id: number) => void;
  onJumpedStudentClick: (id: number) => void;
}
const RegularAndJumpedCOmponent: React.FC<RegularAndJumpedProps> = (props: RegularAndJumpedProps) => {
  
  const { onRegularStudentClick, onJumpedStudentClick } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [companiesRegularAndJumpedCount, setCompaniesRegularAndJumpedCount] = useState([] as RegularAndJumped[]);

  React.useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const companiesFromAPI = await getData<RegularAndJumped[]>("https://localhost:44309/api/companiesAndNoOfRegularAndJumpedStudents");
    setCompaniesRegularAndJumpedCount(companiesFromAPI);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ( event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const createData = (currentCompany: RegularAndJumped): RegularAndJumped => {
    return {
      id : currentCompany.id,
      companyName: currentCompany.companyName,
      JumpedStudentsInterviews: currentCompany.JumpedStudentsInterviews,
      regularInterviews: currentCompany.regularInterviews,
    };
  };

  const rows = companiesRegularAndJumpedCount && companiesRegularAndJumpedCount.map((x) => createData(x));

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
                          <TableCell key={column.id} align={column.align}
                          onClick={()=> {
                            if(column.id === 'JumpedStudentsInterviews'){
                              onJumpedStudentClick(row.id)
                            }
                            if(column.id === 'regularInterviews'){
                              onRegularStudentClick(row.id)
                            }
                        } }
                          >
                            {column.id === 'companyName' && value}
                            {column.id === 'JumpedStudentsInterviews' && value}
                            {column.id === 'regularInterviews' && value}
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
