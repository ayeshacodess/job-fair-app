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
    selectedSkill: Skill;
    openDialog: boolean;
    handleDialog: (value: boolean) => void;
}

const AddEditSkill = (props: AddEditSkillProp) => {
    const { openDialog, selectedSkill, handleDialog } = props;
    const [skill, setSkill] = React.useState({...selectedSkill} as Skill);

    const handleClose = () => {
        handleDialog(false); 
    };

    React.useEffect(() => {
        setSkill(selectedSkill);
    }, [selectedSkill])

    const handleOnSave = async (event: any) => {
        debugger;
        event.preventDefault();

        const skillToSave: Skill = {
            id: skill.id,
            technology: skill.technology
        };

        var dbSkills = await postData<Skill[]>("https://localhost:44309/api/skill/addupdate", skillToSave);
        handleClose();
    }

    const handleOnChange = (event: any) => {
        let temSkill: Skill = {...skill};
        temSkill.technology = event.target.value;
        setSkill(temSkill);
    }

    return (
        <div>
            <Dialog open={openDialog} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Skill</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="technology"
                            label="Technology"
                            type="text"
                            id="technology"
                            value={skill.technology}
                            onChange={handleOnChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={skill?.technology?.length < 2 || !skill?.technology}
                        variant="contained"
                        type="button"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => handleOnSave(e)}
                        >
                     Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddEditSkill;