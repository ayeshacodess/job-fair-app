import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { Skill } from '../Model/SkillModels';
import { postData } from '../Helper/httpClient';

interface AddEditSkillProp {
    openDialog: boolean;
    handleDialog: (value: boolean) => void;
    selectedSkill?: Skill
}

const AddEditSkill = (props: AddEditSkillProp) => {
    const { openDialog, selectedSkill, handleDialog } = props;
    const [skill, setSkill] = React.useState({...selectedSkill});

    const handleClose = () => {
        handleDialog(false);
    };

    const handleOnSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        var skills = await postData<Skill>("https://localhost:44309/api/addSkills", skill);
    }

    return (
        <div>
            <Dialog open={openDialog} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Skill</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={handleOnSave} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="technology"
                            label="Technology"
                            type="text"
                            id="technology"
                            value={selectedSkill?.technology}
                            onChange={
                                (value) => setSkill(Object.assign({}, skill, 
                                    { technology: value, id: selectedSkill?.id }))
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

export default AddEditSkill;