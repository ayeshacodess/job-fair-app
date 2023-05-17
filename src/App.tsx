
import NavTab from './Components/Navigation/NavTab';
import Login from './Components/Login/Login';
import { AppContext } from './Components/Context/AppContext';
import React from 'react';
import { MainApp } from './MainApp';
import CompanySignUpComponent from './Components/companies/CompanySignUp';

function App() {

	const { isLoggedIn } = React.useContext(AppContext);

	return (
		<div className="App">
			<NavTab />
			{!isLoggedIn && <Login />}
			
			{isLoggedIn && <MainApp />}
		</div>
	);
}

export default App;
