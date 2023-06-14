import React, { SyntheticEvent, useContext, useState } from 'react';
import { Autocomplete, AutocompleteChangeReason, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, NativeSelect, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { getData, postData, postData2 } from '../Helper/httpClient';
import { Skill } from '../Model/SkillModels';
import { Student, StudentSkill } from '../Model/StudentModels';
import { AppContext } from '../Context/AppContext';

const UploadCV = () => {
    const { userProfile } = useContext(AppContext);
    const [values, setValues] = useState<Student>({} as Student);
     const  [skills, setSkills] = useState([] as Skill[]);
    const [selectedSkills, setSelectedSkills] = useState([] as StudentSkill[]);
    const [selectedFile, setSelectedFile] = useState({} as File);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        setValues({ ...values, [name]: value, });
    };

    const handleSelectChange = (event: SelectChangeEvent<number>, skill_Id: number) => {
        console.log(event, skill_Id);
        let skillIndex = selectedSkills.findIndex(s => s.skill_Id === skill_Id);

        let temp = [...selectedSkills];

        temp[skillIndex].level_Id = event.target.value as number;

        setSelectedSkills(temp);
    }

    const handleAutoCompleteChange = (event: SyntheticEvent<Element, Event>, selectedValue: any, reason: AutocompleteChangeReason) => {
        console.log("selectedValue:", selectedValue);
        if (selectedValue) {
            var s: StudentSkill = {
                skill_Id: selectedValue.id,
                level_Id: 1
            };
            if (selectedSkills.findIndex(x => x.skill_Id === s.skill_Id) < 0) {

                let tempSkill = [...selectedSkills, s];
                setSelectedSkills(tempSkill);

                var stdData = Object.assign({}, values, { studentSkills: tempSkill });
                setValues(stdData);
            }
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        var data = Object.assign({}, values, { userId: userProfile.Id, aridNumber: userProfile.aridNumber,file:selectedFile })
        
        postData<Student>("https://localhost:44309/api/student/uploadcv", data);
    }

    React.useEffect(() => {
        fetchSkills();
    }, [])

    const fetchSkills = async () => {
        var skillsFromDb = await getData<Skill[]>("https://localhost:44309/api/skill/Get");
        setSkills(skillsFromDb);
    }

    const handleUploadCVFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name=event.target.name
        const file = event.target.files;
        
        if (file && file.length > 0) {
            const selectFile = file[0];
            setSelectedFile(selectFile as File);
            setValues({ ...values, [name]: selectedFile.name, });
        }
    }
    return (

        <form onSubmit={handleSubmit} >
            <React.Fragment >
                <Typography variant="h6" gutterBottom>
                    {userProfile.name} - {userProfile.aridNumber}
                </Typography>
                <Grid container spacing={3} padding={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="studyStatus"
                            name="studyStatus"
                            label="Study Status"
                            fullWidth
                            autoComplete="study-status"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            aria-readonly
                            value={userProfile.cgpa}
                            id="cgpa"
                            name="cgpa"
                            label="CGPA"
                            fullWidth
                            autoComplete="cgpa"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="contact1"
                            name="contact1"
                            label="contact 1"
                            fullWidth
                            onChange={handleChange}
                            autoComplete="contact1"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="contact2"
                            name="contact2"
                            label="contact 2"
                            fullWidth
                            autoComplete="contact2"
                            onChange={handleChange}
                        />
                 
                     </Grid>
                    {/* <input  type="file"  name='cvpath' onChange={(e) => {
             handleUploadCVFile(e)
            }}  /> */}
                </Grid> 

                <FormLabel component='legend' style={{ marginTop: '2rem', paddingLeft: '2rem' }}>
                    Select your Skill(s)
                </FormLabel>
                {/* <FormGroup>
                <Grid container spacing={2} padding={2} >
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={<Checkbox  name='iOSDevelopment' onChange={handleChange} />}
                                label='iOS Development'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={<Checkbox  onChange={handleChange} name="androidDevelopment" />}
                                label="Android Development"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={<Checkbox  onChange={handleChange} name="flutter" />}
                                label="Flutter"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={<Checkbox  onChange={handleChange} name="reactNative" />}
                                label="React Native"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={<Checkbox  onChange={handleChange} name="databaseDevelopment" />}
                                label="Database Development"
                            />
                        </Grid>
                    </Grid>
                </FormGroup> */}
                <Grid container spacing={2} padding={2} >
                    {selectedSkills.length > 0 && selectedSkills.map(selectedSkill => <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                aria-readonly
                                label="Skill"
                                fullWidth
                                value={skills.filter(s => s.id == selectedSkill.skill_Id)?.[0].technology}
                            />




                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="level">Level</InputLabel>
                                <Select
                                    label="Level"
                                    value={selectedSkill.level_Id}
                                    onChange={(e) => handleSelectChange(e, selectedSkill.skill_Id)}>
                                    <MenuItem value={1}>Beginner</MenuItem>
                                    <MenuItem value={2}>Medium</MenuItem>
                                    <MenuItem value={3}>Advance</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </>)
                    }
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            id="skill_ids"
                            options={skills}
                            onChange={handleAutoCompleteChange}
                            fullWidth
                            getOptionLabel={(skil) => skil.technology}
                            renderInput={(params) => <TextField {...params} label="Search skills" />}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button size='large' variant="contained">
                        Attach CV
                        <input
                            hidden
                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                            type="file"
                            onChange={handleUploadCVFile}
                        />
                    </Button>
                </Grid>

                <FormControlLabel
                    sx={{ padding: 2 }}
                    control={<Checkbox checked={values.hasFYP ?? false} onChange={handleChange}
                        name="hasFYP"
                        id='hasFYP' />}
                    label="Have you done the FYP?"
                />
                {
                    values.hasFYP && (
                        <Grid container spacing={1} padding={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="FypTitle"
                                    name="FypTitle"
                                    label="FYP Title"
                                    fullWidth
                                    autoComplete="FYP-title"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="FypTech"
                                    name="FypTech"
                                    label="FYP Technology"
                                    fullWidth
                                    autoComplete="FYP-technology"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    aria-readonly
                                    value={userProfile.FypGrade}
                                    id="FypGrade"
                                    name="FypGrade"
                                    label="'FYP Grade"
                                    fullWidth
                                    autoComplete="FYP-grade"
                                    
                                />
                            </Grid>
                        </Grid>
                    )
                }
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

                {/* </Box > */}
            </React.Fragment>
        </form >

    );
}
export default UploadCV;