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

interface RateCompanyProp {
    companyId: number;
    rate: number;
    openDialog: boolean;
    handleDialog: (value: boolean) => void;
    saveRating: (companyId: number, rating: number) => void;
}

const CompanyRateComponent = (props: RateCompanyProp) => {
    const { openDialog, handleDialog, companyId, rate, saveRating } = props;
    const [companyRate, setCompanyRate] = React.useState(0);

    const handleClose = () => {
        handleDialog(false); 
    };

    React.useEffect(() => {
        setCompanyRate(rate);
    }, [rate]);

    const handleOnSave = async (event: any) => {
        event.preventDefault();
        const skillToSave = {
            companyId: companyId,
            companyRate: companyRate 
        };

        var dbSkills = await postData<Skill[]>("https://localhost:44309/api/skill/addupdate", skillToSave);
        handleClose();
    }

    const handleOnChange = (event: any) => {
        const temp = event.target.value;
        setCompanyRate(temp as number);
    }

    return (
        <div>
            <Dialog open={openDialog} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Company Rate</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="rating"
                            label="Rating"
                            type="number"
                            id="rating"
                            value={companyRate}
                            onChange={handleOnChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={companyRate === 0}
                        variant="contained"
                        type="button"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={(e) => handleOnSave(e)}
                        >
                     Rate
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CompanyRateComponent;