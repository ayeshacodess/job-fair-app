import { Dialog, DialogTitle, DialogContent, Box, TextField, DialogActions, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'
import { Skill } from '../Model/SkillModels';
import { getData } from '../Helper/httpClient';
import { DisplaySchedule } from '../Model/DisplayScheduleModels';

interface GIveFeedbackProp {
	openDialog: boolean;
	handleDialog: (value: boolean) => void;
	schedule: DisplaySchedule;
}
const GiveFeedback = (props: GIveFeedbackProp) => {
	const { openDialog, schedule, handleDialog } = props;
	const [stdSkills, setStdSkills] = useState([] as Skill[]);

	const handleClose = () => {
		handleDialog(false);
	};

	React.useEffect(() => {
		if(schedule.aridNumber) {
			fetchStdSkills();
		}
	}, [schedule?.aridNumber]);

	const fetchStdSkills = async () => {
		const skillsFromDb = await getData<Skill[]>(`https://localhost:44309/api/studentSkills/get?aridno=${schedule.aridNumber}`);
		setStdSkills(skillsFromDb);
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>, value: string): void {
		alert("Save cliked");
	}

	return (
		<div>
			<Dialog open={openDialog} onClose={handleClose} fullWidth={true}>
				<DialogTitle>Feedback</DialogTitle>
				<DialogContent>
					<Box sx={{ mt: 1 }}>
						{stdSkills.map(stdSkill => <>
							<FormControl component="fieldset" required>
								<FormLabel component="legend" style={{ paddingTop: "2rem", paddingLeft: "2rem" }}>
									{stdSkill.technology}
								</FormLabel>

								<RadioGroup
									aria-label="stdSkill"
									name="rate"
									id="rate"
									value={0}
									onChange={handleChange}
									sx={{ padding: 2 }}
								>
									<Grid container spacing={2} padding={2}>
										<Grid item xs={12} sm={4}>
											<FormControlLabel

												value={5}
												control={<Radio />}
												label="Excellent"
											/>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FormControlLabel
												value={4}
												control={<Radio />}
												label="Good"
											/>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FormControlLabel value={3} control={<Radio />} label="Fair" />
										</Grid>
										<Grid item xs={12} sm={4}>
											<FormControlLabel
												value={2}
												control={<Radio />}
												label="Avg"
											/>
										</Grid>
										<Grid item xs={12} sm={4}>
											<FormControlLabel
												value={1}
												control={<Radio />}
												label="Worst"
											/>
										</Grid>
									</Grid>
								</RadioGroup>
							</FormControl>
						</>)}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						//disabled={skill?.technology?.length < 2 || !skill?.technology}
						variant="contained"
						type="button"
						sx={{ mt: 3, mb: 2 }}
					//onClick={(e) => handleOnSave(e)}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default GiveFeedback
