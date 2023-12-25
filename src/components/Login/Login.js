import React, { useEffect, useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


  const emailReducer=(state,action)=>{
    if(action.type ==='USER_INPUT'){
      return {value:action.val,isValid:action.val.includes('@')}
    }
    if(action.type === 'INPUT_BLUR'){
      return {value:state.value,isValid:state.value.includes('@')};
    }
    return {value:state.value,isValid: state.value.includes('@')}
  };

  const passwordReducer=(state,action)=>{
    if(action.type==='USER_PASSWORD'){
      return {value:action.val,isValid:action.val.trim()>6}
    }
    if(action.type === 'INPUT_BLUR'){
      return {value:state.value,isValid:state.value.trim()>6};
    }

    return { value:state.value,isValid:state.value.trim().length > 6 }
  }

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [enteredCollegeName,setEnteredCollegeName]=useState('');
  const [collegeNameIsvalid,setCollegeNameIsValid]=useState();

 const [emailState,dispatchEmail]= useReducer(emailReducer,{
  value:'',
  isValid:null
 });

 const [passwordState,dispatchPasswrod]=useReducer(passwordReducer,{
  value:'',
  isValid:null
 })

  
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value});
    setFormIsValid(
            event.target.value.includes('@') && passwordState.isValid && enteredCollegeName.trim().length > 3
          );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPasswrod({type:"USER_PASSWORD",val:event.target.value});
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && enteredCollegeName.trim().length > 3
    );
  };

  const collegeChangeHandler=(event)=>{
    setEnteredCollegeName(event.target.value);
    setFormIsValid(
      emailState.isValid && passwordState.isValid && event.target.value.trim().length > 3
    );
  }
    
  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
   dispatchPasswrod({type:'INPUT_BLUE'})
  };

  const validateCollegeHandler = ()=> {
    setCollegeNameIsValid(enteredCollegeName.trim() > 3)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div 
        className={`${classes.control} ${
          collegeNameIsvalid === false ? classes.invalid :''
        }`}
        >
          <label>CollegeName</label>
          <input
          type="text"
          id="collegeName"
          value={enteredCollegeName}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
