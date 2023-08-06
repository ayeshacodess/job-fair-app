import React, { useState } from 'react'
import { Company } from '../Model/CompanyModels';
import { getData } from '../Helper/httpClient';
import { AppBar, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from '@mui/material';
import Students from '../Students/Students';
import { Student } from '../Model/StudentModels';

interface Column {
  id: 'id' | 'name';
  label: string;
  minWidth?: number;
  align?: 'center'
  format?: (value: number) => string | JSX.Element;
}

const columns: readonly Column[] = [
  {
    id: 'name',
    label: 'Name',
    align: 'center'
  },
];
const StudentsInterviewedInCompanyComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [students, setStudents] = useState([] as Student[]);

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    var studentsFromDb = await getData<Student[]>("https://localhost:44309/api/StudentsInterviewedInCompany?companyId=1024");
    setStudents(studentsFromDb);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createData = (currentStudent: any): any => {
    return {
      id: currentStudent.id,
      name: currentStudent.name,
    };
  }
  const rows = students && students.map(x => createData(x));
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Students Interviewed In the Company
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

                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>

                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                              {/* {column.id === 'name' && value} */}
                            {column.id === 'name' && (
                              <Link  color="inherit">
                                {value}
                              </Link>
                            )}
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

export default StudentsInterviewedInCompanyComponent;
