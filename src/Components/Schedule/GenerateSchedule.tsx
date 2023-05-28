import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Button, TextField, Typography } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { getData, postData } from '../Helper/httpClient';
import { Skill } from '../Model/SkillModels';
import { Company } from '../Model/CompanyModels';
import { AppContext } from '../Context/AppContext';
import { Schedule } from '../Model/ScheduleModels';


const GenerateSchedule = () => {
    const { userProfile } = React.useContext(AppContext);
    const [scheduleValues, setScheduleValues] = useState<Schedule>({} as Schedule);
    const [selectedCompany, setSelectedCompany] = useState(0);
    const [companies, setCompanies] = useState([] as Company[]);
    React.useEffect(() => {
        fetchCompanies();
    }, [])

    const fetchCompanies = async () => {
        var companiesFromDb = await getData<Company[]>(`https://localhost:44309/api/companies?role=${userProfile.role}&userId=${userProfile.userProfileId}`);
        setCompanies(companiesFromDb);
    };


    function handleCompanySelectChange(event: SelectChangeEvent<number>, child: ReactNode) {
        setSelectedCompany(event.target.value as number);
    };

    function handleRoomSelectChange(event: SelectChangeEvent<number>, child: ReactNode) {
        setSelectedCompany(event.target.value as number);
    };

    var ob = Object.assign({}, scheduleValues, { selectedCompany, UserProfile: userProfile.Id });
    const handleSubmit = async () => {
        var com = await postData<Schedule[]>("https://localhost:44309/api/schedule/generate", ob);
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        setScheduleValues({ ...scheduleValues, [name]: value, });
    }
    return (<>
        <Typography variant="h6" component="h2" style={{ textDecoration: 'underline' }} sx={{ mt: 4, padding: 6, textAlign: 'center' }}>
            Schedule
        </Typography>
        <Grid container gap={1}>
            <Grid item xs={12} sm={6}>
                <FormControl
                    fullWidth>
                    <InputLabel id="company">Select Company</InputLabel>
                    <Select
                        labelId="company"
                        id="company"
                        value={selectedCompany}
                        label="Select Company"
                        onChange={handleCompanySelectChange}>
                        {companies.map(company => <MenuItem value={company.id}> {company.name} </MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="allocatedRoom"
                    label="Allocate Room to company"
                    id="allocatedRoom"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="timeDuration"
                    label="Time Duration"
                    id="timeduration"
                    type='number'
                    onChange={handleChange}
                />
            </Grid>
            <Grid item md={12} lg={12}>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Generate Schedule
                </Button>
            </Grid>
        </Grid>
    </>
    )
}


export default GenerateSchedule;
