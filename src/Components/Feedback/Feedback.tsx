import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'
import { getData } from '../Helper/httpClient';
import { Skill } from '../Model/SkillModels';
import { Feedback } from '../Model/FeedbackModels';

const FeedbackComponent = () => {
  const [skills, setSkills] = useState([] as Skill[]);
  const [val, setVal] = useState({} as Feedback);

  const fetchSkills = async () => {
    const skillsFromDb = await getData<Skill[]>(`https://localhost:44309/api/studentSkills/get?aridno=${val.aridNo}`);
    setSkills(skillsFromDb);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    setVal({
      ...val,
      [name]: value,
    });
  };
  return (
    <>
      <Typography variant="h6" component="h2" style={{ textDecoration: 'underline' }} sx={{ mt: 4, padding: 2, textAlign: 'center' }}>
        Company Feedback
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="aridNo"
        label="Arid No."
        id="aridNo"
        onChange={handleChange}
      />
      {skills.map(stdSkill => <>
        <FormControl component="fieldset" required>
          <FormLabel component="legend" style={{ paddingTop: "2rem", paddingLeft: "2rem" }}>
            {stdSkill.technology}
          </FormLabel>

          <RadioGroup
            aria-label="stdSkill"
            name="rate"
            id="rate"
            value={val.rate}
            onChange={handleChange}
            sx={{ padding: 2 }}
          >
            <Grid container spacing={2} padding={2}>
              <Grid item xs={12} sm={4}>
                <FormControlLabel

                  value={1}
                  control={<Radio />}
                  label="Excellent"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label="Good"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel value={3} control={<Radio />} label="Fair" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  value={4}
                  control={<Radio />}
                  label="Avg"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  value={5}
                  control={<Radio />}
                  label="Worst"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </RadioGroup>
        </FormControl>
      </>)}
    </>
  )
}

export default FeedbackComponent;
