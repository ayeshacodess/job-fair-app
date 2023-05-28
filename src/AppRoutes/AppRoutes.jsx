import React from 'react'

const AppRoutes = () => {
  return (
    <div>
      <React.StrictMode>
		<ContextProvider>
			<BrowserRouter>
			<Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/CompanySignUP' element={<CompanySignUp />} /> 
		      	<Route path='/Dashboard' element={<Dashboard />}/>
            <Route path='/nav' element={<NavTab/>}/>
            {/* <Route element={<NavTab/>}> */}
              
            {/* <Route path='/' element={<Login/>} /> */}
			{/* </Route> */}
            {/* <Route path='' element={<Dashboard />}>
                
            {/* </Route> */}
        </Routes>
			</BrowserRouter>
		</ContextProvider>
	</React.StrictMode>
    </div>
  )
}

export default AppRoutes
