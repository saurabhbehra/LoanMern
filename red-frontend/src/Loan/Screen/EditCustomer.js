import React, { useState, useContext,useEffect} from 'react'
import {  useHistory,useParams } from 'react-router-dom'
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'


const EditCustomer = () => {
    const [name, setName] =useState()
    const [email, setEmail] =useState()
    const [password, setPassword] =useState()

    const auth=useContext(AuthContext);
    let history=useHistory();

    let cusId=useParams().id

    const nameHandler = event =>{
        setName(event.target.value)
    }
    const emailHandler = event =>{
        setEmail(event.target.value)
    }
    const passwordHandler = event =>{
        setPassword(event.target.value)
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
                let data=responseData.doc
                let len=responseData.doc.length
                for(let i=0;i<len;i++)
                {
                    if(data[i]._id ==cusId)
                    {
                       setName(data[i].name)
                       setEmail(data[i].email)
                       setPassword(data[i].password)
                    }
                }
                
            }
            catch(err){}
        }
        fetchUser()
    },[])

const SubmitHandler = async event => {
    event.preventDefault();
    try{
        const response=await fetch(`${config.url}/customer/${cusId}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer' + ' ' +  auth.token
            },
            body:JSON.stringify({
                name: name,
                email:email,
                password:password,
               
                
            })
        })
        const responseData=await response.json();
        if(!response.ok){
            throw new Error(responseData.error.message)
        }

        alert(responseData.msg);
        console.log(responseData)
        history.push('/view-customers') 
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
                    <p className="h4 mb-4">Edit Customer</p>
                    <input type="text" element="input" id="name" className="form-control mb-2" placeholder="Full Name"
                     value={name}   
                     onChange={nameHandler}  
                     required/>
                    <input type="email" element="input" id="email" className="form-control mb-2" placeholder="Email"
                        value={email}
                        onChange={emailHandler} 
                       
                        required/>
                    <input type="password" element="input" id="password" className="form-control mb-2" placeholder="Password"
                      
                       onChange={passwordHandler}
                    required/>
                    <button className="btn my-4 btn-block" id="signup" type="submit">Update</button>

                </form>
            </div>
            </div>
            <div className="col-sm-4 col-md-4"></div>            
        </div>
    </div>
    )
}


export default EditCustomer
