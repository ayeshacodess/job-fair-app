import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { getData } from '../Helper/httpClient';
import { Skill } from '../Model/SkillModels';
import { Company } from '../Model/CompanyModels';
import { Student } from '../Model/StudentModels';

const GenerateSchedule = () => {
    const [skills, setSkills] = useState([] as Skill[]);
    const [selectedSkill, setSelectedSkill] = useState(0);
    const [companies, setCompanies] = useState([] as Company[]);
    const [selectedCompanies, setSelectedCompanies] = useState([] as Company[]);
    const [students, setStudents] = useState([] as Student[]);
    const [selectedStudents, setSelectedStudents] = useState([] as number[]);

    React.useEffect(() => {
        fetchSkillsCompaniesStudents();
    }, [])

    const fetchSkillsCompaniesStudents = async () => {
        var skillsFromDb = await getData<Skill[]>("https://localhost:44309/api/skill/Get");
        setSkills(skillsFromDb);
        var companiesFromDb = await getData<Company[]>("https://localhost:44309/api/companies");
        setCompanies(companiesFromDb);
        var studentsFromDb = await getData<Student[]>("https://localhost:44309/api/students");
        setStudents(studentsFromDb);
    }

    const handleSkillChange = (event: SelectChangeEvent<number>) => {
        setSelectedSkill(event.target.value as number);
    };
    function handleCompanyChange(event: SelectChangeEvent<number[]>, child: ReactNode) {
        console.log("Company Select", event, child); //just log on cosole, and observe which data is in child
        //setSelectedCompanies(companies);
    }

    function handleStudentChange(event: SelectChangeEvent<Student[]>, child: ReactNode) {
        console.log("Student Slecte", event, child)
        //setSelectedStudents(student_Id);
    }

    return (
        <Grid>
            <Grid item xs={12} sm={6}>
                <FormControl >
                    <InputLabel id="skill">Select Skill</InputLabel>
                    <Select
                        labelId="skill"
                        id="skill"
                        value={selectedSkill}
                        label="Select Skill"
                        onChange={handleSkillChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {/* Jani, observeur mistake g am observing */}
                        {skills.map(skill => <MenuItem value={skill.id}> {skill.technology} </MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Companies</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        multiple
                        value={selectedCompanies.map(company => company.id)}
                        label="Companies that required the selected skills"
                        onChange={handleCompanyChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {companies.map(company =>
                            <MenuItem value={company.id}>
                                {/* //u have to show company name, not company skill - it was simple jan, u dont have to worries, isi liy kaha tha page py draw kr k code bad mai kro*/}
                                {company.name}
                            </MenuItem>)}

                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Students</InputLabel>
                    <Select
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

                    </Select>
                </FormControl>
            </Grid>
            <Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Generate Schedule
                </Button>
            </Grid>
        </Grid>


    )
}

export default GenerateSchedule
