import React, { useContext, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postData } from '../Helper/httpClient';
import { EventFeedbackContent } from '../Model/EventFeedbackContent';
import { AppContext } from '../Context/AppContext';

const GiveEventFeedBackComponent = () => {
	const { userProfile } = useContext(AppContext);
	const [content, setContent] = useState("");

	const handleChange = (value: any) => {
		console.log(value);
		setContent(value);
	};

	const handleSubmit = async () => {
		var feedback: EventFeedbackContent = {
			companyId: userProfile.userProfileId,
			feedbackContent: content
		};
		console.log(feedback);
		await postData<EventFeedbackContent>("https://localhost:44309/api/eventFeedback/save", feedback);
	}

	return (
		<div>
			<Grid container spacing={3} padding={2}>
				<Grid item xs={12} sm={8} md={8} lg={8}>
					<ReactQuill
						//value={content} 
						onChange={handleChange} />
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={4}>
					<Button variant="contained"
						
						onClick={handleSubmit}>
						Submit
					</Button>
				</Grid>
			</Grid>

		</div>
	);


}

export default GiveEventFeedBackComponent;
