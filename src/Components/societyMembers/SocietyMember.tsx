import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { SocietyMember } from '../Model/SocietyMemberModels';
import Button from '@mui/material/Button';
import { getData } from '../Helper/httpClient';
import { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
interface Column {
	id: 'name' | 'gender' | 'contact';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: any) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{
		id: 'gender', 
		label: 'Gender', 
		minWidth: 170,
		format: (value: boolean) => value ? "Male" : "Female",
	},
	{
		id: 'contact',
		label: 'Contact',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	}
];

interface SocietyMemberModel extends SocietyMember {
	action: JSX.Element;
}

const MemberComponent = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [members, setMembers] = useState([] as SocietyMemberModel[]);
	const [SelectedMember, setSelectedMember] = React.useState({} as SocietyMember);
	const [openAddEditMemberDialogue, setOpenAddEditMemberDialogue] = useState(false);
	const [openDeleteMemberDialogue, setOpenDeleteMemberDialog] = useState(false);

	React.useEffect(
		() => {
			fetchMembers();
		}, []
	)
	const fetchMembers = async () => {
		var membersFromDb = await getData<SocietyMemberModel[]>("https://localhost:44309/api/members");
		setMembers(membersFromDb);
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const createData = (currentMember: SocietyMemberModel): SocietyMemberModel => {
		return {
			id: currentMember.id,
			userId: currentMember.userId,
			name: currentMember.name,
			gender: currentMember.gender,
			contact: currentMember.contact,
			action: <>
				<Button
					variant="contained"
					color="success"
					size="medium"
					onClick={() => {
						// setSelectedCompany(currentCompany);
						// setOpenAddCompanyDialog(true);
						alert('comming soon.... !');
					}}>
					Edit
				</Button>
				<Button
					variant="outlined"
					color="error"
					size="medium"
					onClick={() => {
						alert('comming soon.... !');
					}}>
					Delete
				</Button>
			</>
		}
	}


	const handleDialog = (value: boolean) => {
		if (!value) {
			setOpenAddEditMemberDialogue(value);
			setSelectedMember({} as SocietyMember);
		}
	}

	const rows = members && members.map((x: SocietyMemberModel) => createData(x));

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Society Members
					</Typography>
					<Button
						variant="contained"
						color="success"
						onClick={() => {
							//alert("Comming soon....!");
							setSelectedMember({} as SocietyMember);
							setOpenAddEditMemberDialogue(true);
						}}>
						Add Society Member
					</Button>
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
														{column.id === 'contact' && column.format && column.format(value)}
														{column.id === 'gender' && column.format && column.format(value)}
														{column.id === 'name' && value}
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
	);
}
export default MemberComponent;
