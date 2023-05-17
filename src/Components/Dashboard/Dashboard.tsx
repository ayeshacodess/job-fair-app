import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuItems from './listItems';
import { MenuItemList } from '../Helper/SharedModel';
import Students from '../Students/Students';
import SkillComponent from '../skills/Skills';
import CompanyComponent from '../companies/Companies';
import SocietyMember from '../societyMembers/SocietyMember';
import UploadCV from '../CV/UploadCV';
import { AppContext } from '../Context/AppContext';
import GenerateSchedule from '../Schedule/GenerateSchedule';

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		'& .MuiDrawer-paper': {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			boxSizing: 'border-box',
			...(!open && {
				overflowX: 'hidden',
				transition: theme.transitions.create('width', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				width: theme.spacing(7),
				[theme.breakpoints.up('sm')]: {
					width: theme.spacing(9),
				},
			}),
		},
	}),
);

const mdTheme = createTheme();

function DashboardContent() {
	const [open, setOpen] = React.useState(true);
	const [renderItem, setRenderItem] = React.useState(MenuItemList.Dashboard);
    const {userProfile} = React.useContext(AppContext);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	const dashboardMenueItemClick = (clickedItem: MenuItemList) => {
		console.log("Dashboard ", clickedItem);
		setRenderItem(clickedItem);
	}
	console.log(userProfile);
	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: 'flex' }}>
				
				<CssBaseline />
				<Drawer variant="permanent" open={open}>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<MenuItems 
						onMenueItemClick={(item: MenuItemList) => dashboardMenueItemClick(item)}/>
				</Drawer>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: '80vh',
						paddingLeft: '1rem',
						overflow: 'auto',
					}}
				>
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
							{renderItem === MenuItemList.Dashboard && 
								<p>
									Hi, welcome to you dashboard!
								</p>
							}
							{renderItem === MenuItemList.Student && 
								<Students />
							}
							{renderItem === MenuItemList.Skill && 
								<SkillComponent />
							}
							{renderItem === MenuItemList.Company && 
							 	<CompanyComponent />
							}
							{renderItem === MenuItemList.SocietyMember &&
							  <SocietyMember />
							}
							{renderItem === MenuItemList.UploadCV &&
							  	<UploadCV />
							}
							{renderItem === MenuItemList.GenerateSchedule &&
							  	<GenerateSchedule />
							}
						</Grid>
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function Dashboard() {
	return <DashboardContent />;
}