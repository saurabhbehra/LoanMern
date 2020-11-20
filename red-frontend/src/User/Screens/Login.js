import React, { useContext,useState} from 'react'
import { VALIDATOR_REQUIRE } from '../../Shared/utils/validation';
import Input from '../components/Input'
import { useForm } from '../../Shared/hooks/form-hook.js';
import { AuthContext } from '../../Shared/context/auth-context';
import config from '../../config/config'



//IMPORT CSS
import './login.css'

const Login = () => {
    const auth=useContext(AuthContext);
    const [isLoading ,setIsLoading]=useState(false);
    const [error ,setError]=useState();
    const [formState, inputHandler] = useForm(
        {

            loginEmail: {
                value: '',
                isValid: false
            },
            loginPassword: {
                value: '',
                isValid: false
            },
          
        },
        false
    );

 const placeSubmitHandler = async event => {
    event.preventDefault();
    try{
        setIsLoading(true);
        const response=await fetch(`${config.url}/user/login`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: formState.inputs.loginEmail.value,
                password: formState.inputs.loginPassword.value,
            })
        })
        const responseData=await response.json();
        if(!response.ok){
            throw new Error(responseData.message)
        }

        alert(responseData.message)
        console.log(responseData)
        auth.login(responseData.userId, responseData.token, responseData.role,responseData.name,responseData.email);
    }
    catch(err){
      alert(err)
      console.log(err)
      setError(err || 'Something went wrong, please try again.');
    }
    setIsLoading(false)
    
};
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-sm-4 col-md-4"></div>
                <div className="col -12 col-sm-4 col-md-4">
                    <div className="card mt-5 mb-5 login-card">
                         <div className="card-body">
                            <form className="text-center p-5" action="#!" autoComplete="off" onSubmit={placeSubmitHandler}>
                                <p className="h4 mb-4">Sign In</p>
                                <Input element="input" type="email" id="loginEmail" className="form-control mb-2" placeholder="E-mail" 
                                     validators={[VALIDATOR_REQUIRE()]}
                                     onInput={inputHandler}
                                     errorText="Please enter the Email"
                                />
                                <Input element="input" type="password" id="loginPassword" className="form-control mb-2" placeholder="Password" 
                                     validators={[VALIDATOR_REQUIRE()]}
                                     onInput={inputHandler}
                                     errorText="Please enter the Password"
                                />
                                <hr />
                                <button className="btn my-4 btn-block" id="signup" type="submit" disabled={!formState.isValid}>Sign In</button>
                                <span style={{fontSize:14,color:"red"}}>Forgot Password ?</span><br />
                                <div style={{fontSize:14,color:"red"}}>Don't have account ? <span style={{color:"blue"}}>Sign-Up</span></div>
                            </form>
                         </div>
                    </div>
                </div>
                <div className="col-sm-4 col-md-4"></div>
            </div>
        </div>

    )
}

export default Login
