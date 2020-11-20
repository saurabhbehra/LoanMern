import React, { useContext,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'

const Customer =()=>{
    const auth=useContext(AuthContext);
    const [user, setUser] =useState()
    let i=1;
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
    return (
        <div className="container">
            <div className="row" style={{marginTop:"5rem"}}>
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user && user.doc.map(x=>
                            <tr>
                                <th scope="row">{i}</th>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td><Link to={`/edit-customer/${x._id}`}><button className="btn btn-primary">Edit</button></Link></td>
                                <div style={{visibility:"hidden"}}>{i=i+1}</div>
                            </tr>
                            )}
                            
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    )
}

export default Customer
