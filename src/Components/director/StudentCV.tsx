import React, { useContext, useState } from 'react'
import { Student } from '../Model/StudentModels';
import { getData } from '../Helper/httpClient';
import { Grid, InputLabel, TextField } from '@mui/material';
import { AppContext } from '../Context/AppContext';

interface StudentCVProps {
    StudentId: number;
}
const StudentCVComponent: React.FC<StudentCVProps> = (props: StudentCVProps) => {
    const { userProfile } = useContext(AppContext);
    const { StudentId } = props;
    const [student, setStudent] = useState({} as Student);
    React.useEffect(() => {
        fetchCV();
        console.log(student);
    }, []);

    const fetchCV = async () => {
        var studentFromDb = await getData<Student>(`https://localhost:44309/api//GetStudent?studentId=${StudentId}`);
        setStudent(studentFromDb);
    }
    return (
        <div>
            <Grid container spacing={3} padding={2}>
                <Grid item xs={12} sm={6}>
                    <InputLabel> Study Status </InputLabel>
                    <TextField
                        id="studyStatus"
                        name="studyStatus"
                        fullWidth
                        aria-readonly
                        value={student.studyStatus}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel> CGPA </InputLabel>
                    <TextField
                        aria-readonly
                        value={userProfile.cgpa}
                        id="cgpa"
                        name="cgpa"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel> Contact 1 </InputLabel>
                    <TextField
                        aria-readonly
                        id="contact1"
                        name="contact1"
                        fullWidth
                        value={student.contact1}
                        autoComplete="contact1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel> Contact 2 </InputLabel>
                    <TextField
                        aria-readonly
                        id="contact2"
                        name="contact2"
                        fullWidth
                        autoComplete="contact2"
                        value={student.contact2}
                    />

                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel> Fyp Title </InputLabel>
                    <TextField
                        aria-readonly
                        id="FypTitle"
                        name="FypTitle"
                        fullWidth
                        autoComplete="FYP-title"
                        value={student.FypTitle}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel> FYP Technology </InputLabel>
                    <TextField
                        aria-readonly
                        id="FypTech"
                        name="FypTech"
                        fullWidth
                        autoComplete="FYP-technology"
                        value={student.FypTech}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <InputLabel> Fyp Grade </InputLabel>
                    <TextField
                        aria-readonly
                        value={userProfile.FypGrade}
                        id="FypGrade"
                        name="FypGrade"
                        fullWidth
                        autoComplete="FYP-grade"/>
                </Grid>
            </Grid>
        </div>
    )
}

export default StudentCVComponent
