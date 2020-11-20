import React, { useContext,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'

const CloanView =()=>{
    const auth=useContext(AuthContext);
    const [user, setUser] =useState()
    let i=1;
    useEffect(()=>{
        const fetchUser=async () =>{
            try{
                let response=await fetch(`${config.url}/loan/loan-applied`,{
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
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Amount</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Emi</th>
                            <th scope="col">TotalPayable</th>
                            <th scope="col">First Repayment Date</th>
                            <th scope="col">Applied On</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user && user.doc.map(x=>
                            <tr>
                                <th scope="row">{i}</th>
                                <td>{x.amount}</td>
                                <td>{x.duration}</td>
                                <td>{x.emi}</td>
                                <td>{x.totalPayable}</td>
                                <td>{x.firstRepaymentDate}</td>
                                <td>{x.createdAt}</td>
                                <td>{x.status}</td>
                              
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

export default CloanView
