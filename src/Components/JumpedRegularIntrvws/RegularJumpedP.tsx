import React, { useState } from 'react'
import RegularAndJumpedCount from './RegularAndJumpedCount';
import RegularStudents from './RegularStudents';
import JumpedStudents from './JumpedStudents';

const RegularJumpedP = () => {
  const [renderComponent, setRenderComponent] = useState("RegularAndJumpedCount");
  const [companyId, setCompanyId] = useState(0);
  
  const handleJumpedSelect = (compnyId: number) => {
    setCompanyId(compnyId);
    setRenderComponent("JumpedStudents");
    console.log("jumped select is called");
    console.log(companyId)
  }
  const handleRegularSelect = (compnyId: number) => {
    setCompanyId(compnyId);
    setRenderComponent("RegularStudents");
    console.log("Regular select is called");
    console.log(companyId)
  }
  return (
    <div>
      {renderComponent === "RegularAndJumpedCount" && <RegularAndJumpedCount onRegularStudentClick={handleRegularSelect}
        onJumpedStudentClick={handleJumpedSelect} />}
      {renderComponent === "JumpedStudents" && <JumpedStudents compId={companyId} />}
      {renderComponent === "RegularStudents" && <RegularStudents compId={companyId} />}
    </div>
  )
}

export default RegularJumpedP
