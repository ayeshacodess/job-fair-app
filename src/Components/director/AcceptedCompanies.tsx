import React, { useState } from 'react'
import { Company } from '../Model/CompanyModels';
import { AppBar, Link, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Toolbar, Typography } from '@mui/material';

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
interface DirectorCompanyModel{
	id: number;
	name: string;
}
interface AcceptedCompaniesProps {
	companies: Company[];
	onCompanySelect: (id: number) => void;
}
const AcceptedCompanies: React.FC<AcceptedCompaniesProps> = (props: AcceptedCompaniesProps) => {
	const { companies, onCompanySelect } = props;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};


	const createData = (currentCompany: Company): DirectorCompanyModel => {
		return {
			id: currentCompany.id,
			name: currentCompany.name,
		};
	}

	const rows = companies && companies.map(x => createData(x));
	
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
						{rows && rows.length > 0 &&
							rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
											{columns.map((column) =>
												column.id === 'name' && (
													<TableCell key={column.id} align={column.align} onClick={() => onCompanySelect(row.id)}>
														<Link color="inherit"> {row[column.id]} </Link>
													</TableCell>
												)
											)}
										</TableRow>
									);
								}
							)}
						{(!rows || rows.length === 0) &&
							<TableRow hover role="checkbox" tabIndex={-1}>
								<TableCell>No record found !</TableCell>
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

export default AcceptedCompanies
