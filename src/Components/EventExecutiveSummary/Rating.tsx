import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { getData } from '../Helper/httpClient';

const labels: { [index: string]: string } = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent'
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface RatingProp {
    companyId: number;
    rate: number;
}

const HoverRating = (props: RatingProp) => {
    const [value, setValue] = React.useState<number | null>(props.rate);
    const [hover, setHover] = React.useState(-1);

    const onchangeHandler = async (_event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
        const url = `https://localhost:44309/api/company/rating?companyId=${props.companyId}&rating=${newValue}`;
        await getData(url);
        setValue(newValue);
    }
    
    return (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChange={onchangeHandler}
                onChangeActive={(event, newHover) => {
                    setHover(newHover); 
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
        </Box>
    );
}

export default HoverRating;