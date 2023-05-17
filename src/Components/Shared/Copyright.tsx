// import Link from '@mui/material/Link';
// import Typography from '@mui/material/Typography';
import {Typography, Link} from '@mui/material';

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://www.biit.edu.pk/">
          Barani Institute of information technology
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  export default Copyright;