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
import { getData, postData } from '../Helper/httpClient';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Skill } from '../Model/SkillModels';
import AddEditSkill from './AddEditSkill';

interface Column {
    id: 'id' | 'technology' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string | JSX.Element;
}

const columns: readonly Column[] = [
    {
        id: 'technology',
        label: 'Technology Name',
        minWidth: 170
    },
    {
        id: 'action',
        label: 'Actions',
        minWidth: 170
    },
];

interface SkillModel extends Skill {
    action: JSX.Element;
}

const SkillComponent = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [skills, setSkills] = React.useState([] as SkillModel[]);
    const [selectedSkill, setSelectedSkill] = React.useState({} as Skill);
    const [openAddEditSkillDialog, setOpenAddEditSkillDialog] = React.useState(false);

    React.useEffect(() => {
        fetchSkills();
    }, [])

    const fetchSkills = async () => {
        const skillsFromDb = await getData<SkillModel[]>("https://localhost:44309/api/skill/Get");
        setSkills(skillsFromDb);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDelete = async (id: number) =>{
        let newSkills = await getData<SkillModel[]>(`https://localhost:44309/api/skill/delete?skill_Id=${id}`);
        setSkills(newSkills);
    }

    const handleOnSkillClick = (skillM: SkillModel) => {
        debugger;
        console.log(skillM);
        
        const skillData: Skill = {
            id: skillM.id,
            technology: skillM.technology
        };

        setSelectedSkill(skillData);
        setOpenAddEditSkillDialog(true);
    }

    const createData = (currentSkill: SkillModel): SkillModel => {
        return { 
            id: currentSkill.id, 
            technology: currentSkill.technology,
            action: <div>
                <Button 
                    variant="contained" 
                    color="success" 
                    size="small" 
                    style={{marginRight: '5px'}}
                    onClick={() => handleOnSkillClick(currentSkill)}>
                    Edit
                </Button>
                <Button 
                    variant="outlined" 
                    color="error" 
                    size="small" 
                    onClick={() => {
                        handleDelete(currentSkill.id); 
                    }}>
                    Delete
                </Button>
            </div>
        };
    }

    const handleDialog = (value: boolean) => {
        if (!value) {
            setOpenAddEditSkillDialog(value);
            setSelectedSkill({} as Skill);
            fetchSkills();
        }
    }
    
    const rows = skills.map(s => createData(s));

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Skills
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="success"  
                        onClick={() => {
                            setSelectedSkill({} as Skill);
                            setOpenAddEditSkillDialog(true);
                        }}>
                            Add Skill
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
                                <TableCell> No record found !</TableCell>
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

            <AddEditSkill 
                openDialog={openAddEditSkillDialog}
                selectedSkill={selectedSkill}
                handleDialog={handleDialog}
            />
        </Paper>
    );
}
export default SkillComponent;
