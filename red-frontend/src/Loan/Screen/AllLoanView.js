import React, { useContext,useState,useEffect} from 'react'
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'
import {Link} from 'react-router-dom'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"




const AllLoanView =()=>{

   

    const auth=useContext(AuthContext);
    const [user, setUser] =useState()
    let i=1;
    useEffect(()=>{
       const fetchUser=async () =>{
            try{
                let response=await fetch(`${config.url}/loan/all-loans`,{
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


    return (
        <div className="container">
            <div className="row" style={{marginTop:"5rem"}}>
               
                <div className="col-sm-12">
                    <table class="table" id="example"> 
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Emi</th>
                            <th scope="col">TotalPayable</th>
                            <th scope="col">First Repayment Date</th>
                            <th scope="col">Applied On</th>
                            <th scope="col">Status</th>
                            {auth.isLoggedIn && auth.role!='customer' && <th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            
                            {user && user.doc.map(x=>
                           
                            <tr>
                                <th scope="row">{i}</th>
                                <td>{x.customer.name}</td>
                                <td>{x.amount}</td>
                                <td>{x.duration}</td>
                                <td>{x.emi}</td>
                                <td>{x.totalPayable}</td>
                                <td>{x.firstRepaymentDate}</td>
                                <td>{x.createdAt}</td>
                                <td>{x.status}</td>
                                <td>{auth.isLoggedIn && auth.role=='admin' && <Link to={`/edit-status/${x.customer}`}><button className="btn btn-primary">Edit</button></Link>}</td>
                                <td>{auth.isLoggedIn && auth.role=='agent' && <Link to={`/edit-loan/${x._id}`}><button className="btn btn-primary">Edit</button></Link>}</td>
                                <div style={{visibility:"hidden"}}>{i=i+1}</div>
                            </tr>
                            )} 
                            
                        </tbody>
                    </table>
                </div>
               
            </div>
        </div>
    )
}

export default AllLoanView
