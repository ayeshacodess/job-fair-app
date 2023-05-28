import React, { SyntheticEvent, useState } from 'react';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Typography, Button, Autocomplete, Grid, Container, RadioGroup, Radio, AutocompleteChangeReason } from '@mui/material';
import { Skill } from '../Model/SkillModels';
import { getData, postData } from '../Helper/httpClient';
import { Company} from '../Model/CompanyModels';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useNavigate } from 'react-router';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CompanySignUpComponent = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState<Company>({} as Company);
    const [skills, setSkills] = React.useState([] as Skill[]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        setValues({
            ...values,
            [name]: value,
        });
    };

    // const handleAutoCompleteChange = (event: SyntheticEvent<Element, Event>, selectedValues: Skill[], reason: AutocompleteChangeReason) => {
        
    //     console.log(selectedValues);
    //     var selectedSkills = selectedValues.map(s => s.technology);
    //     setValues({ ...values, skills : selectedSkills });
    // }

    
     const handleAutoCompleteChange = (event: SyntheticEvent<Element, Event>, selectedValues: Skill[], reason: AutocompleteChangeReason) => {
        debugger
        setValues({ ...values, skills : selectedValues });
     }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postData<Company>("https://localhost:44309/api/company/add", values);
        alert("Sign up Successfully, will inform you after your Registeration");
        navigate("/");
    }


    React.useEffect(() => {
        fetchSkills();
    }, [])

    const fetchSkills = async () => {
        var skillsFromDb = await getData<Skill[]>("https://localhost:44309/api/skill/Get");
        setSkills(skillsFromDb);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "grey.200",
                        p: 2,
                        m: 2,
                        borderRadius: "10px",
                        boxShadow: 5,
                    }}
                >
                    <React.Fragment>
                        <Typography variant="h6" component="h2" style={{ textDecoration: 'underline' }} sx={{ mt: 4, padding: 2, textAlign: 'center' }}>
                            BARANI INSTITUTE OF INFORMATION TECHNOLOGY
                        </Typography>
                        <Grid container spacing={2} padding={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="name"
                                    id="name"
                                    label="Company Name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    id="email"
                                    label="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="noOfInterviewers"
                                    id="noOfInterviewers"
                                    label="No. of Interviewers to Visit"
                                    value={values.noOfInterviewers}
                                    onChange={handleChange}
                                    type='number'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    name="contact1"
                                    id="contact1"
                                    label="Contact No. 1"
                                    value={values.contact1}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="contact2"
                                    id="contact2"
                                    label="Contact No. 2"
                                    value={values.contact2}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <FormControl component="fieldset" required>
                            <FormLabel component="legend" style={{ paddingTop: "2rem", paddingLeft: "2rem" }}>
                                Required Time Slot
                            </FormLabel>

                            <RadioGroup
                                aria-label="timeSlot"
                                name="timeSlot"
                                id="timeSlot"
                                value={values.timeSlot}
                                onChange={handleChange}
                                sx={{ padding: 2 }}
                            >
                                <Grid container spacing={2} padding={2}>
                                    <Grid item xs={12} sm={4}>
                                        <FormControlLabel

                                            value={1}
                                            control={<Radio />}
                                            label="9:00 AM to 12:00 PM"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControlLabel
                                            value={2}
                                            control={<Radio />}
                                            label="2:00 PM to 5:00 PM"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControlLabel value={3} control={<Radio />} label="full day" />
                                    </Grid>
                                </Grid>
                            </RadioGroup>
                        </FormControl>

                        <FormLabel component="legend" style={{ marginTop: '0rem', paddingLeft: '2rem' }}>Recruitment area(s) :(Please click as many you want)</FormLabel>
                        {/* <FormGroup>
                            <Grid container spacing={2} padding={2} >
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={<Checkbox checked={values.iOSDevelopment} onChange={handleChange} name="iOSDevelopment" />}
                                        label="iOS Development"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={<Checkbox checked={values.androidDevelopment} onChange={handleChange} name="androidDevelopment" />}
                                        label="Android Development"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={<Checkbox checked={values.flutter} onChange={handleChange} name="flutter" />}
                                        label="Flutter"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={<Checkbox checked={values.reactNative} onChange={handleChange} name="reactNative" />}
                                        label="React Native"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={<Checkbox checked={values.databaseDevelopment} onChange={handleChange} name="databaseDevelopment" />}
                                        label="Database Development"
                                    />
                                </Grid>
                            </Grid>
                        </FormGroup> */}


                        <Grid container padding={2}>
                            <Grid item sm={6} xs={12} >
                                {/* <Autocomplete
                                    id="combo-box"
                                    options={options}
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => <TextField {...params} label="Search skills" />}
                                    fullWidth
                                /> */}
                                <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    options={skills}
                                    disableCloseOnSelect
                                    getOptionLabel={(skill) => skill.technology}
                                    renderOption={(props, skill, { selected }) => (
                                        <li {...props}>
                                            <Checkbox
                                                icon={icon}
                                                checkedIcon={checkedIcon}
                                                style={{ marginRight: 8 }}
                                                checked={selected}
                                            />
                                            {skill.technology}
                                        </li>
                                    )}
                                    onChange={handleAutoCompleteChange}
                                    style={{ width: 500 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Required Skill(es)" placeholder="Skill(es)" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ m: 5 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>

                    </React.Fragment>
                </Box>
            </Box>
        </form>

    )
}

export default CompanySignUpComponent;