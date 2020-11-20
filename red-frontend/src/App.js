import React , { useState, useCallback, useEffect } from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

import Nav from './Shared/Components/Nav'
import Login from './User/Screens/Login'
import Signup from './User/Screens/Signup'
import Customer from './Loan/Screen/Customer'
import EditCustomer from './Loan/Screen/EditCustomer'
import Apply from './Loan/Screen/Apply'
import EditStatus from './Loan/Screen/EditStatus'
import EditLoan from './Loan/Screen/EditLoan'
import AllLoansView from './Loan/Screen/AllLoanView'
import Home from './Loan/Screen/Home'

import { AuthContext } from './Shared/context/auth-context'; 

const  App =() =>{
  const [token,setToken]=useState(false);
  const [userId,setuserId]=useState(false);
  const [role,setrole]=useState(false);
  const [name,setName]=useState(false);
  const [email,setEmail]=useState(false);

  const login=useCallback((uid,token,role,cname,email) => {
    setToken(token)
    setuserId(uid)
    setrole(role)
    setName(cname)
    setEmail(email)
    
    localStorage.setItem(
      'userData',
      JSON.stringify({userId:uid,token:token,email:email,name:cname,role:role}) 
    )
  },[]);


 const logout=useCallback(() => {
  setToken(null)
  setuserId(null)
  setrole(null)
  setName(null)
  setEmail(null)
    localStorage.removeItem('userData')
  },[]);


  useEffect(()=>{
    const storedData=JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token ){
      login(storedData.userId ,storedData.token,storedData.email,storedData.name,storedData.role)
    }
  },[login])

  let routes;
  if(token)
  {
    routes=(
    <React.Fragment>
      <Switch>
      <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/view-customers" exact>
            <Customer />
        </Route>
        <Route path="/edit-customer/:id" exact>
            <EditCustomer />
        </Route>
        <Route path="/apply-loan" exact>
            <Apply />
        </Route>
        <Route path="/edit-status/:id" exact>
            <EditStatus />
        </Route>
        <Route path="/edit-loan/:id" exact>
            <EditLoan />
        </Route>
        <Route path="/loans-applied" exact>
            <AllLoansView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
   )
  }
  else
  {
   routes=(
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup/>
        </Route>
        <Redirect to="/login" />
    </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token:token, userId:userId, name:name, email:email, role:role, login: login, logout:logout}}>
       <Router>
        <Nav /> 
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
