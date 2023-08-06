import { Label } from '@mui/icons-material';
import { Typography, Grid, Paper, FormLabel, AppBar, Button, Toolbar, TextField, Box } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'
import { ExectiveSummaryViewModel } from '../Model/SummaryModel';
import { getData, postData } from '../Helper/httpClient';
import { Skill } from '../Model/SkillModels';
import { TeerPassesModel } from '../Model/TeerPassesModel';

const SetPassesComponent = () => {
	const [teerPasses, setTeerPasses] = useState({} as TeerPassesModel);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name;
		const value = event.target.value;

		setTeerPasses({ ...teerPasses, [name]: value, });
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		console.log(teerPasses);

		postData<TeerPassesModel>("https://localhost:44309/api/set/teerPasses", teerPasses);
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Passes Setting
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
						Teer-1 Passes
					</FormLabel>
					<TextField
						required
						id="teer1Pass"
						name="teer1Pass"
						fullWidth
						onChange={handleChange}
					/>
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
						Teer-2 passes
					</FormLabel>
					<TextField
						required
						id="teer2Pass"
						name="teer2Pass"
						//label="teer-2 Pass"
						fullWidth
						onChange={handleChange}
					/>
				</Grid>
                <Grid m={3}> <Button onClick={handleSubmit} variant='contained'>Set Passes</Button> </Grid>
			</Grid>
		</Paper>
	)
}

export default SetPassesComponent;

