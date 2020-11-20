import React, { useState, useContext} from 'react'
import {  useHistory } from 'react-router-dom'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../../Shared/utils/validation';
import Input from '../components/Input'
//import LoadingSpinner from '../../Shared/components/LoadingSpinner';
import { useForm } from '../../Shared/hooks/form-hook.js';
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'



//IMPORT CSS
import './register.css'

const Register = () => {
    const auth=useContext(AuthContext);
    let history=useHistory();
    const [isLoading ,setIsLoading]=useState(false);
    const [role ,setRole]=useState();
    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }

        },
        false
    );

const roleHandler=event=>{
    setRole(event.target.value)
}
const placeSubmitHandler = async event => {
    event.preventDefault();
    try{
        setIsLoading(true);
        const response=await fetch(`${config.url}/user/signup`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
                role: role
                
            })
        })
        const responseData=await response.json();
        if(!response.ok){
            throw new Error(responseData.error.message)
        }

        alert(responseData.message);
        console.log(responseData)
        history.push('/login') 
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
                <form className="text-center p-5" action="#!" autoComplete="off" onSubmit={placeSubmitHandler}>
                    <p className="h4 mb-4">Sign up</p>
                    <Input type="text" element="input" id="name" className="form-control mb-2" placeholder="Full Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter the name"
                    />
                    <Input type="email" element="input" id="email" className="form-control mb-2" placeholder="Email"
                        validators={[VALIDATOR_REQUIRE()], [VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        errorText="Please enter the email"
                    />
                    <Input type="password" element="input" id="password" className="form-control mb-2" placeholder="Password"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter the password"
                    />
                    <select className="form-control mb-2" value={role} onChange={roleHandler}>
                        <option>customer</option>
                        <option>agent</option>
                        <option>admin</option>
                    </select>
                    <button className="btn my-4 btn-block" id="signup" type="submit" disabled={!formState.isValid}>Sign Up </button>
                    <hr />
                    <p>By clicking&nbsp;
                       <em>Sign up</em> you agree to our &nbsp;
                       <a>terms of service .</a>
                    </p>
                </form>
            </div>
            </div>
            <div className="col-sm-4 col-md-4"></div>            
        </div>
    </div>
    )
}
// {isLoading && <LoadingSpinner />}

export default Register
