import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { Company } from '../Model/CompanyModels';
import { Student } from '../Model/StudentModels';


interface AddEditStudentProp {
    openDialog: boolean;
    handleDialog: (value: boolean) => void;
    selectedStudent?: Student;
}

const AddEditStudent = (props: AddEditStudentProp) => {
    const { openDialog, selectedStudent, handleDialog } = props;
    const [student, setStudent] = React.useState({...selectedStudent});

    const handleClose = () => {
        handleDialog(false);
    };

    const handleOnSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            id: selectedStudent?.id,
            technology: data.get('technology'),
        });
        alert("Save Clicked")
    }

    return (
        <div>
            <Dialog open={openDialog} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Student</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={handleOnSave} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="technology"
                            label="Student Name"
                            type="text"
                            id="technology"
                            value={"Comming soon..... !"}
                            onChange={(value) => setStudent(Object.assign({}, student, 
                                    { id: selectedStudent?.id }))
                            }
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddEditStudent;