import React, { useState, useContext,useEffect} from 'react'
import {  useHistory,useParams } from 'react-router-dom'
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'


const EditLoan = () => {
    const [amount, setAmount] =useState()
    const [duration, setDuration] =useState()
    

    const auth=useContext(AuthContext);
    let history=useHistory();

    let Id=useParams().id

    const amountHandler = event =>{
        setAmount(event.target.value)
    }
    const durationHandler = event =>{
        setDuration(event.target.value)
    }
   

    useEffect(()=>{
        const fetchLoan=async () =>{
            try{
                let response=await fetch(`${config.url}/loan/all-loans`,{
                    headers:{
                        'Authorization':'Bearer' + ' ' +  auth.token
                    }
                })
                let responseData=await response.json()
                let data=responseData.doc
                let len=responseData.doc.length
                console.log(data)
                for(let i=0;i<len;i++)
                {
                    if(data[i]._id ==Id)
                    {
                       setAmount(data[i].amount)
                       setDuration(data[i].duration)
                       
                    }
                }
                
            }
            catch(err){}
        }
        fetchLoan()
    },[])

const SubmitHandler = async event => {
    event.preventDefault();
    try{
        const response=await fetch(`${config.url}/loan/edit-loan/${Id}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer' + ' ' +  auth.token
            },
            body:JSON.stringify({
                amount: amount,
                duration:duration,
                
               
                
            })
        })
        const responseData=await response.json();
        if(!response.ok){
            throw new Error(responseData.error.message)
        }

        alert(responseData.msg);
        console.log(responseData)
        history.push('/loans-applied') 
    }
    catch(err){
      alert(err)
      console.log(err)
    }
  
  
};

return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4 col-md-4"></div>
            <div className="col-12 col-sm-4 col-md-4">
            <div className="card register-card">
                <form className="text-center p-5" action="#!" autoComplete="off" onSubmit={SubmitHandler}>
                    <p className="h4 mb-4">Edit Loan</p>
                    <input type="text" element="input" id="amount" className="form-control mb-2" placeholder="Amount"
                     value={amount}   
                     onChange={amountHandler}  
                    />
                   
                    <input type="text" element="input" id="duartion" className="form-control mb-2" placeholder="Duration"
                       value={duration}
                       onChange={durationHandler}
                    />
                    <button className="btn my-4 btn-block" id="signup" type="submit">Update</button>

                </form>
            </div>
            </div>
            <div className="col-sm-4 col-md-4"></div>            
        </div>
    </div>
    )
}


export default EditLoan
