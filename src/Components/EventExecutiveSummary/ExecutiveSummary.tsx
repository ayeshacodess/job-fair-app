import { Label } from '@mui/icons-material';
import { Typography, Grid, Paper, FormLabel, AppBar, Button, Toolbar } from '@mui/material';
import React, { useState } from 'react'
import { ExectiveSummaryViewModel } from '../Model/SummaryModel';
import { getData } from '../Helper/httpClient';
import { Skill } from '../Model/SkillModels';

const ExecutiveSummary = () => {
	const [summary, setSummary] = useState({} as ExectiveSummaryViewModel);
	React.useEffect(() => {
		fetchSkills();
	}, [])

	const fetchSkills = async () => {
		const summaryFromDb = await getData<ExectiveSummaryViewModel>("https://localhost:44309/api/summary/exective");
		setSummary(summaryFromDb);
	}
	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Exective Summary
                    </Typography>
                </Toolbar>
            </AppBar>
			<Grid container spacing={3} padding={2}>
				<Grid item xs={12} sm={6}>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						Total Number of Companies
					</FormLabel>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						{`:  ${summary.numberOfCompanies}`}
					</FormLabel>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						Total Students Interviewed
					</FormLabel>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						{`:  ${summary.totalInterviewedStudents}`}
					</FormLabel>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						number of Interviews
					</FormLabel>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						{`:  ${summary.numberOfInterviews}`}
					</FormLabel>
				</Grid>

				<Grid item xs={12} sm={6}>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						Total ShotListed
					</FormLabel>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						{`:  ${summary.totalShortlistStudents}`}
					</FormLabel>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						First Teer Students
					</FormLabel>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						{`:  ${summary.firstTearCount}`}
					</FormLabel>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						Second Teer Count
					</FormLabel>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						{`:  ${summary.secondTearCount}`}
					</FormLabel>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						Third Teer Students
					</FormLabel>
					<FormLabel
						id="radios"
						sx={{
							maxWidth: 200,
							whiteSpace: "nowrap",
							textOverflow: "ellipsis",
							overflow: "hidden"
						}}>
						{`:  ${summary.thirdTearCount}`}
					</FormLabel>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default ExecutiveSummary;

