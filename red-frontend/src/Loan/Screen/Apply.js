import React, { useState, useContext,useEffect,useCallback} from 'react'
import {  useHistory } from 'react-router-dom'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../Shared/utils/validation';
import Input from '../../User/components/Input'
import { useForm } from '../../Shared/hooks/form-hook.js';
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'


const Apply = () => {
    const auth=useContext(AuthContext);
    let history=useHistory();
    const [user ,setUser]=useState();
    const [name ,setName]=useState();
    const [amount ,setAmount]=useState();
    const [duration ,setDuration]=useState();

    const [emi ,setEmi]=useState();
    const [rDate ,setRdate]=useState();
    const [total ,setTotal]=useState();
   
   
   
   
       
       
const check= () =>{
    let pm = amount/duration
    let interest = 0.02*amount
    let e = pm+interest
     setEmi(e)
    let totalPayable = emi*duration
     setTotal(totalPayable)
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 30)
}   
  
const nameHandler = event=>{
    setName(event.target.value)
}
const amountHandler = event=>{
    setAmount(event.target.value)
    
   
}

const durationHandler = event=>{
    setDuration(event.target.value)
   
}


   
useEffect(()=>{
    const fetchUser=async () =>{
        try{
            let response=await fetch(`${config.url}/customer/list`,{
                headers:{
                    'Authorization':'Bearer' + ' ' +  auth.token
                }
            })
            let responseData=await response.json()
            console.log(responseData)
            setUser(responseData)
            
        }
        catch(err){}
    }
    fetchUser()
},[])

const SubmitHandler = async event => {
    event.preventDefault();
    
    try{
        const response=await fetch(`${config.url}/loan/${name}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer' + ' ' +  auth.token
            },
            body:JSON.stringify({
              amount:amount,
              duration:duration
            })
        })
        const responseData=await response.json();
        if(!response.ok){
            throw new Error(responseData.error.message)
        }

        alert(responseData.message);
        console.log(responseData)
        history.push('/view-loans') 
    }
    catch(err){
      alert(err)
      console.log(err)
    }
  
  
};

return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-2 col-md-2"></div>
            <div className="col-12 col-sm-5 col-md-5">
            <div className="card register-card">
                <form className="text-center p-5" action="#!" autoComplete="off" onSubmit={SubmitHandler}>
                    <p className="h4 mb-4">Loan</p>
                    <select className="form-control mb-2" value={name} onChange={nameHandler}>
                        <option valu="" disabled selected>Select</option>
                        {user && user.doc.map(x=>
                             <option value={x._id}>{x.name}</option>
                        )}
                    </select>
                    <input type="text" element="input" id="amount" className="form-control mb-2" placeholder="Amount"
                    value={amount} onChange={amountHandler}/>
                    
                    <input type="text" element="input" id="duration" className="form-control mb-2" placeholder="Duration"
                       
                    value={duration} onChange={durationHandler}
                    />
                   
                    <button className="btn my-4 btn-block" id="signup" type="submit">Apply</button>

                </form>
            </div>
            </div>
            <div className="col-sm-5 col-md-5">
               <card className="card register-card" width="6rem" height="5rem">
                    <h4 className="px-4">EMI: {emi}</h4>
                    <h4 className="px-4">Total Payable: {total}</h4>
                    <button classname="btn" onClick={check}>Check before Proceeding</button>
                    
               </card>
            </div>            
        </div>
    </div>
    )
}
// {isLoading && <LoadingSpinner />}

export default Apply
