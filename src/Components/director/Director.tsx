import React, { useState } from 'react'
import AcceptedCompanies from './AcceptedCompanies';
import { Company } from '../Model/CompanyModels';
import { getData } from '../Helper/httpClient';
import StudentsInterviewedInCompanyComponent from './StudentsInterviewedInCompany';
import StudentCVComponent from './StudentCV';

const Director = () => {
  const [selectedComId, setSelectedComId] = useState(0);
  const [selectedStdId, setSelectedStdId] = useState(0);
  const [companies, setCompanies] = useState([] as Company[]);
  const [renderComponent, setRenderComponent] = useState("Companies");

  React.useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    var companiesFromDb = await getData<Company[]>("https://localhost:44309/api/AcceptedCompanies");
    setCompanies(companiesFromDb);
    console.log(companies)
  }

  const handleSelectedCompany = (id: number) => {
    setSelectedComId(id);
    setRenderComponent("Students");
    console.log(id);
  }

  const handleSelectedStudent = (id: number) => {
    setSelectedStdId(id);
    setRenderComponent("StudentCV");
    console.log(id);
  }

  return (
    <div>
      {renderComponent === "Companies" && <AcceptedCompanies companies={companies} onCompanySelect={handleSelectedCompany} />}
      {renderComponent === "Students" && <StudentsInterviewedInCompanyComponent companyId = {selectedComId}  onStudentSelect={handleSelectedStudent}/>}
      {renderComponent === "StudentCV" && <StudentCVComponent StudentId = {selectedStdId}/>}

    </div>
  )
}

export default Director
