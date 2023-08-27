import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { getData } from '../Helper/httpClient';
import { Company } from '../Model/CompanyModels';
import { MenuProps } from '../Shared/Helper';

interface JumpTheQueueProp {
	openDialog: boolean;
	onClose: () => void;
    onJump: () => void;
}

const JumpTheQueueComponent = (props: JumpTheQueueProp) => {
	const { openDialog, onClose, onJump } = props;
    const { userProfile } = useContext(AppContext);
    
    const [companiesNotSelectedByStudent, setCompaniesNotSelectedByStudent] = useState([] as Company[]);
    const [selectedCompanyIdForJump, setSelectedCompanyIdForJump] = React.useState(0);

	const handleClose = () => {
		onClose();
	};

	React.useEffect(() => {
        fetchCompanies();
	}, []);

	const fetchCompanies = async () => {
        var companiesFromDb = await getData<Company[]>(`https://localhost:44309/api/notSelectedCompanies?studentId=${userProfile.userProfileId}`);
        setCompaniesNotSelectedByStudent(companiesFromDb);
    }

    const handleChange = (event: SelectChangeEvent<number>) => {
        const { target: { value } } = event;
        setSelectedCompanyIdForJump(value as number);
    };

	const handleOnSave = async () => {
        console.log("selectedCompanyIdForJump => ", selectedCompanyIdForJump);
        const url = `https://localhost:44309/api/schedule/jumpQueue?companyId=${selectedCompanyIdForJump}&studentId=${userProfile.userProfileId}`;
        
        console.log("selectedCompanyIdForJump URL => ", url);
        await getData(url);
        onClose();
		onJump();
	}

	return (
		<div>
			<Dialog open={openDialog} onClose={handleClose} fullWidth={true}>
				<DialogTitle>Jump the Queue</DialogTitle>
				<DialogContent>
					<Box sx={{ mt: 1 }}>
						<FormControl sx={{ m: 1 }} fullWidth>
                            <InputLabel id="demo-multiple-name-label">Jump the Queue</InputLabel>
                            <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={selectedCompanyIdForJump}
                            onChange={handleChange}
                            input={<OutlinedInput label="Select Company" />}
                            MenuProps={MenuProps}>
                                {/* <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem> */}
                            {companiesNotSelectedByStudent.map((com) => (
                                <MenuItem key={com.id} value={com.id}>
                                    {com.name}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleClose}>Close</Button>
					<Button variant="contained" type="button" onClick={handleOnSave}> Jump </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default JumpTheQueueComponent;
