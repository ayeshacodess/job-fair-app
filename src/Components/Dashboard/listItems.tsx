import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import List from '@mui/material/List';
import { Divider } from '@mui/material';
import { MenuItemList } from '../Helper/SharedModel';
import { AppContext } from '../Context/AppContext';

interface MenuItemProps {
	onMenueItemClick: (clickedItem: MenuItemList) => void;
}

const MenuItems = (props: MenuItemProps) => {

	const { userProfile } = React.useContext(AppContext);

	const onClickHandler = (value: MenuItemList) => {
		console.log("Menue Item clicked in listItem ", value);
		const { onMenueItemClick } = props;
		onMenueItemClick(value);
	}

	const adminAndSocieyMemberLinks = <React.Fragment>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Dashboard)}>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon >
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Schedule)}>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Schedule" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Student)}>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Students" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Company)}>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Companies" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.SocietyMember)}>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<ListItemText primary="Society Members" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Skill)}>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary="Skills" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.UploadCV)}>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary="Upload CV" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.GenerateSchedule)}>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary="Generate Schedule" />
		</ListItemButton>
	</React.Fragment>


	const studentLinks = <React.Fragment>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Dashboard)}>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon >
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Schedule)}>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Schedule" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Company)}>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Companies" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.UploadCV)}>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary="Upload CV" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Feedback)}>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary="Feedback" />
		</ListItemButton>
	</React.Fragment>

	const companyLinks = <React.Fragment>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Dashboard)}>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon >
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton onClick={() => onClickHandler(MenuItemList.Schedule)}>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Schedule" />
		</ListItemButton>
	</React.Fragment>

return (
	<List component="nav">
		{userProfile.role === "Student" && studentLinks}
		{userProfile.role === "Admin" && adminAndSocieyMemberLinks}
		{userProfile.role === "SocietyMember" && adminAndSocieyMemberLinks}
		{userProfile.role === "Company" && companyLinks}
	</List>
);
}

export default MenuItems;