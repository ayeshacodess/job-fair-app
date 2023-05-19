import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { getData } from '../Helper/httpClient';
import { Skill } from '../Model/SkillModels';
import { Company } from '../Model/CompanyModels';
import { Student } from '../Model/StudentModels';
import { AppContext } from '../Context/AppContext';

const GenerateSchedule = () => {
    const { userProfile } = React.useContext(AppContext);
    
    const [skills, setSkills] = useState([] as Skill[]);
    const [selectedSkill, setSelectedSkill] = useState(0);
    const [companies, setCompanies] = useState([] as Company[]);
    const [selectedCompanies, setSelectedCompanies] = useState([] as number[]);
    const [students, setStudents] = useState([] as Student[]);
    const [selectedStudents, setSelectedStudents] = useState([] as number[]);

    React.useEffect(() => {
        fetchSkillsCompaniesStudents();
    }, [])

    const fetchSkillsCompaniesStudents = async () => {
        var skillsFromDb = await getData<Skill[]>("https://localhost:44309/api/skill/Get");
        setSkills(skillsFromDb);
        var companiesFromDb = await getData<Company[]>(`https://localhost:44309/api/companies?role=${userProfile.role}&userId=${userProfile.userProfileId}`);
        setCompanies(companiesFromDb);
        var studentsFromDb = await getData<Student[]>("https://localhost:44309/api/students");
        setStudents(studentsFromDb);
    };

    const handleSkillChange = (event: SelectChangeEvent<number>) => {
        setSelectedSkill(event.target.value as number);
    };

    function handleCompanyChange(event: SelectChangeEvent<number[]>, child: ReactNode) {
        console.log("Company Selected", event, child);
        if (child && typeof child === 'object' && 'value' in child) {
            const company: number[] = child.value as number[];
            setSelectedCompanies(company);
        }
    };

    function handleStudentChange(event: SelectChangeEvent<Student[]>, child: ReactNode) {
        console.log("Student Slecte", event, child)
        //setSelectedStudents(student_Id);
    };

    return (<>
        <Grid container gap={1}>
            <Grid item xs={12} sm={6}>
                <FormControl 
                    fullWidth>
                    <InputLabel id="skill">Select Skill</InputLabel>
                    <Select
                        labelId="skill"
                        id="skill"
                        value={selectedSkill}
                        label="Select Skill"
                        onChange={handleSkillChange}>
                        {skills.map(skill => <MenuItem value={skill.id}> {skill.technology} </MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="demo-select-small-label">Companies</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select Skill"> 
                         {companies.map(company => <MenuItem value={10}> {company.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Students</InputLabel>
                    {/* <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            multiple
                            value={students}
                            label="Age"
                            onChange={handleStudentChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {students.map(student => <MenuItem value={student.id}> {student.name} </MenuItem>)}

                        </Select> */}
                </FormControl>
            </Grid>
            <Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained">
                    Generate Schedule
                </Button>
            </Grid>
        </Grid>
    </>
    )
}


export default GenerateSchedule;
