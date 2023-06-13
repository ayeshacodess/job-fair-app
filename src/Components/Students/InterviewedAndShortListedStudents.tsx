import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Member } from '../Model/SocietyMemberModels';
import Button from '@mui/material/Button';
import { getData } from '../Helper/httpClient';
import { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { InterviewedAndShortListed } from '../Model/InterviewedAndShortListedStudentsModels';

interface Column {
	id: 'companyName' | 'aridNumber' | 'studentName' | 'interviewed' | 'shortListed' ;
	label: string;
	minWidth?: number;
	align?: 'right';
}

const columns: readonly Column[] = [
	{ 
        id: 'companyName',
        label: 'Company Name',
        minWidth: 170 
    },
	{ 
        id: 'aridNumber',
        label: 'AridNumber',
        minWidth: 170 
    },
	{
		id: 'studentName',
		label: 'Student Name',
		minWidth: 170,
		
	},
    { 
        id: 'interviewed',
        label: 'Interviewed',
        minWidth: 170 
   },
   {
       id: 'shortListed',
       label: 'shortListed',
       minWidth: 170,
       
   },
];


const InterviewedAndShortListedStudentsComponent = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [students, setStudents] = useState([] as InterviewedAndShortListed[]);


	React.useEffect(
		() => {
			fetchStudents();
		}, []
	)
	const fetchStudents = async () => {
		var studentsFromDb = await getData<InterviewedAndShortListed[]>("https://localhost:44309/api/schedule/interviewedAndShortListed");
		setStudents(studentsFromDb);
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const createData = (currentStudent: InterviewedAndShortListed): InterviewedAndShortListed => {
		return {
			companyName: currentStudent.companyName,
			aridNumber: currentStudent.aridNumber,
			studentName: currentStudent.studentName,
			interviewed: currentStudent.interviewed,
			shortListed: currentStudent.shortListed,
			
		}
	}

	const rows = students && students.map((x: InterviewedAndShortListed) => createData(x));

	return (
		<>

			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Interviewed and ShortListed Students
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
											<TableRow hover role="checkbox" tabIndex={-1} key={row.aridNumber}>
												{columns.map((column) => {
													const value = row[column.id];
													return (
														<TableCell key={column.id} align={column.align}>
															{column.id === 'companyName' && value}
															{column.id === 'aridNumber' && value}
															{column.id === 'studentName' && value}
															{column.id === 'interviewed' && value}
															{column.id === 'shortListed' && value}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
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
		</>);

								}
export default InterviewedAndShortListedStudentsComponent;
