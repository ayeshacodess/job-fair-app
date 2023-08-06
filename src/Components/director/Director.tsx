import React, { useState } from 'react'
import CompnentA from './compnentA';
import CompnentB from './compnentB';
import AcceptedCompanies from './AcceptedCompanies';
import { Company } from '../Model/CompanyModels';
import { getData } from '../Helper/httpClient';

const Director = () => {
  const [selectedComId, setSelectedComId] = useState(0);
  const [selectedStdId, setSelectedStdId] = useState(0);
  const [companies, setCompanies] = useState([] as Company[]);

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
    console.log(id);
  }

  return (
    <div>
      {<AcceptedCompanies companies={companies} onCompanySelect={handleSelectedCompany} />}
      {selectedComId > 0 && <CompnentA />}
      {selectedStdId > 0 && <CompnentB />}

    </div>
  )
}

export default Director
