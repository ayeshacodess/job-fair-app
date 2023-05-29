
import NavTab from './Components/Navigation/NavTab';
import Login from './Components/Login/Login';
import { AppContext } from './Components/Context/AppContext';
import React from 'react';
import CompanySignUpComponent from './Components/companies/CompanySignUp';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import SocietyMember from './Components/societyMembers/SocietyMember';
import AddSocietyMember from './Components/societyMembers/AddSocietyMember';

function App() {

	const { isLoggedIn } = React.useContext(AppContext);

	return (
		<div className="App">
			<NavTab />
			{/* {!isLoggedIn && <Login />}  
			 {!isLoggedIn && <CompanySignUpComponent />} 
	{isLoggedIn && <MainApp />} */}

			<Routes>
				<Route path='/' element={!isLoggedIn ? <Login /> : null} />
				<Route path='/CompanySignUP' element={!isLoggedIn ? <CompanySignUpComponent /> : null} />
				<Route path='/Dashboard' element={!isLoggedIn ? <Login /> : <Dashboard />} />
				<Route path='/AddSocietyMember' element={<AddSocietyMember />} />
				<Route path='/SocietyMember' element={<SocietyMember />} />
			</Routes>

		</div>
	);
}

export default App;
