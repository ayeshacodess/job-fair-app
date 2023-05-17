import Register from './Components/Register/Register';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import CompanySignUp from './Components/companies/CompanySignUp';

export const MainApp = () => {
    return (
        <Routes>
            <Route path='' element={<Dashboard />} />
            <Route path='Register' element={<Register />} />
            { <Route path='CompanySignUp' element={<CompanySignUp />} /> }
        </Routes>
    )
}