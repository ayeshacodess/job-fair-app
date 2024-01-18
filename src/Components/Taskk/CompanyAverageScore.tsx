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
  id: 'CompanyName' | 'CompanyAverageOfFeedbacks' ;
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string | JSX.Element;
}

const columns: readonly Column[] = [
  {
    id: 'CompanyName',
    label: 'Company Name',
    align: 'center',
  },
  {
    id: 'CompanyAverageOfFeedbacks',
    label: 'Company Feedback Average',
    minWidth: 170,
  },
];
interface CompanyAvgModel{
    CompanyName: string,
    CompanyAverageOfFeedbacks: number,
}
export const CompanyAverageComponent = () => {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [companiesAverage, setCompaniesAverage] = useState([] as CompanyAvgModel[]);

  React.useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const companiesFromAPI = await getData<CompanyAvgModel[]>("https://localhost:44309/api/CompaniesAverage");
    setCompaniesAverage(companiesFromAPI);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ( event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const createData = (currentCompany: CompanyAvgModel): CompanyAvgModel => {
    return {
        CompanyName: currentCompany.CompanyName,
        CompanyAverageOfFeedbacks: currentCompany.CompanyAverageOfFeedbacks,
    };
  };

  const rows = companiesAverage && companiesAverage.map((x) => createData(x));

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Companies Average
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
                      key={row.CompanyName}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}
                          >
                            {column.id === 'CompanyName' && value}
                            {column.id === 'CompanyAverageOfFeedbacks' && value}
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

