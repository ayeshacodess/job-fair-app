import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Member } from '../Model/SocietyMemberModels';
import { postData } from '../Helper/httpClient';
import { useNavigate } from 'react-router';
import { MenuItemList } from '../Helper/SharedModel';

const AddSocietyMember = () => {
    const navigate = useNavigate();
    const [member, setMember] = useState<Member>({} as Member);
    const [membersList, setMembersList] = useState(MenuItemList.SocietyMember);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const smember = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        setMember({ ...member, [name]: smember, });
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        postData<Member>("https://localhost:44309/api/member/add", member);
        alert("Member Added Successfully");
        // {membersList === MenuItemList.SocietyMember && 
        //     <SocietyMember />
            
        // }
        navigate('/Dashboard')
    }
    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        bgcolor: "white",
                        p: 2,
                        borderRadius: "10px"
                    }}
                >
                    <>
                        <Typography variant="h6" component="h2" style={{ textDecoration: 'underline' }} sx={{ mt: 2, textAlign: 'center' }}>
                            Society Member
                        </Typography>
                        <Grid container spacing={2} padding={2} alignItems={'center'}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    id="email"
                                    autoComplete="Email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="contact"
                                    label="Contact"
                                    id="contact"
                                    autoComplete="Contact"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <FormControl component="fieldset" required>
                                <FormLabel component="legend" style={{ paddingTop: "2rem", paddingLeft: "3rem" }}>
                                    Gender
                                </FormLabel>

                                <RadioGroup
                                    aria-label="gender"
                                    name="gender"
                                    id="gender"
                                    value={member.gender}
                                    onChange={handleChange}
                                    sx={{ padding: 2 }}
                                >
                                    <Grid container spacing={2} padding={2}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControlLabel
                                                value={true}
                                                control={<Radio />}
                                                label="Male"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControlLabel
                                                value={false}
                                                control={<Radio />}
                                                label="Female"
                                            />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid container spacing={2} padding={2} alignItems={'center'}>
                            <Grid item xs={12} md={4} sm={4}></Grid>
                            <Grid item xs={12} md={4} sm={4}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained">
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                </Box>
            </Box>
        </form>
    );
}

export default AddSocietyMember;
