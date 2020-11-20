import React, { useReducer, useEffect } from 'react'
import { validate } from '../../Shared/utils/validation';


//IMPORT CSS 
import './Input.css'

const inputReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,  //spread operator creates copy of old data
          value: action.val,
          //action.validators is coming from changeHandler function
          isValid: validate(action.val, action.validators)
        };
      case 'TOUCH': {
        return {
          ...state,
          isTouched: true
        }
      }
      default:
        return state;
    }
  };
  
  const Input = props => {
   //STATE MANAGEMENT
    const [inputState, dispatch] = useReducer(inputReducer, {
      value: props.initialValue || '',
      isTouched: false,
      isValid: props.initialValid || false
    });
  
    //USE EFFECT DECLARATION
    const {id,onInput}=props;
    const {value,isValid}=inputState;
  
    //THIS FUNCTION IS CALLED WHEN THERE IS A CHANGE IN INPUT PROPERTIES
    useEffect(()=>{
        onInput(id,value,isValid)
    },[id,value,isValid,onInput]);//[dependancies]
  
  
    const changeHandler = event => {
      dispatch({
        type: 'CHANGE',
        val: event.target.value,
        validators: props.validators
      });
    };
  
    const touchHandler = () => {
      dispatch({
        type: 'TOUCH'
      });
    };
    // props.element === 'input' ? (
      //   <input
      //     id={props.id}
      //     type={props.type}
      //     className={props.className}
      //     placeholder={props.placeholder}
      //     onChange={changeHandler}
      //     onBlur={touchHandler}
      //     value={inputState.value}
      //   />
      // ) : (
      //   <textarea
      //     id={props.id}
      //     rows={props.rows || 3}
      //     className={props.className}
      //     placeholder={props.placeholder}
      //     onChange={changeHandler}
      //     onBlur={touchHandler}
      //     value={inputState.value}
      //   />
      // );
      let element;
      if(props.element == 'input'){
        element= <input
        id={props.id}
        type={props.type}
        className={props.className}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
      }
      else if(props.element == 'select'){
          element=<select 
          id={props.id}
          className={props.className}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}       
        >
        
        </select> 
      }
      else{
          element=<textarea
          id={props.id}
          rows={props.rows || 3}
          className={props.className}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      }

  
    return (
      <div>
        {element}
        {!inputState.isValid && inputState.isTouched && <p className="error-text">{props.errorText}</p>}
      </div>
    );
  };
  
  
export default Input

