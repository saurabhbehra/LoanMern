import React,{useState,useEffect,useContext} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'


function EditStatus() {
    const auth = useContext(AuthContext)
    const [status,setStatus] =useState()
    const history =useHistory()
    let id = useParams().id
    

    const statusHandler =event =>{
        setStatus(event.target.value)
    }

    const formHandler = async event =>{
        event.preventDefault()
        try{
            const response=await fetch(`${config.url}/loan/approval-or-reject/${id}`, {
                method:'PATCH',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer' + ' ' +  auth.token
                },
                body:JSON.stringify({
                   status:status
                    
                })
            })
            const responseData=await response.json();
            if(!response.ok){
                throw new Error(responseData.error.message)
            }
    
            alert(responseData.msg);
            console.log(responseData)
            history.push('/') 
        }
        catch(err){
          alert(err)
          console.log(err)
        }
    }
    
    return (
       <div className="conatiner">
           <div className="row" style={{marginTop:"5rem"}}>
               <div className="col-sm-4"></div>
               <div className="col-sm-4">
                   <form method="post"  onSubmit={formHandler}>
                       <select className="form-control" onChange={statusHandler} value={status}>
                            <option  value="" disabled selected>select</option>
                            <option value="approved">approve</option>
                            <option value="rejected">reject</option>
                       </select>
                       <button type="submit" className="btn mt-3">Update Status</button>
                   </form>
               </div>
               <div className="col-sm-4"></div>
           </div>
       </div>

    )
}

export default EditStatus
