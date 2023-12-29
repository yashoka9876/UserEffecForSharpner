import React, { useContext, useEffect, useReducer, useState,useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';


  const emailReducer=(state,action)=>{
    if(action.type ==='USER_INPUT'){
      if(action.val.includes('@')){
        return {value:action.val,isvalid:true}
      }else{

        return {value:action.val,isValid:null}
      }
    }
    if(action.type === 'INPUT_BLUR'){
      return {value:state.value,isValid:state.value.includes('@')};
    }
    return {value:state.value,isValid: state.value.includes('@')}
  };

  const passwordReducer=(state,action)=>{
    console.log(state);
    if(action.type==='USER_PASSWORD'){
      if(action.val.trim().length > 6){
        return {value:action.val,isValid:true}
      }else{
        console.log("hai this is ashok ")
        return {value:action.val,isValid:false}
      }
    }
    if(action.type === 'INPUT_BLUR'){
      return {value:state.value,isValid:state.value.trim().length > 6};
    }

    return { value:state.value,isValid:state.value.trim().length > 6 }
  }


  const collegeReducer= (state,action)=>{
    console.log(action)
    if(action.type==='USER_COLLEGE'){
      if(action.val.trim().length > 3){
        return {value:action.val,isValid:true}
      }else{
        return {value:action.val,isValid:false}
      }
    }

    if(action.type==='INPUT_BLUR'){
      return {value:state.value,isValid:state.value.trim().length > 3}
    }
    return {value:state.value,isValid:state.val.trim().length>3}
  }

const Login = (props) => {

  const emailInputRef=useRef();
  const passwordInputRef=useRef();

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  
  // const [enteredCollegeName,setEnteredCollegeName]=useState('');
  // const [collegeNameIsvalid,setCollegeNameIsValid]=useState();

  const [formIsValid, setFormIsValid] = useState(false);
  
 const [emailState,dispatchEmail]= useReducer(emailReducer,{
  value:'',
  isValid:null
 });

 const [passwordState,dispatchPasswrod]=useReducer(passwordReducer,{
  value:'',
  isValid:null
 })

 const [collegeState,dispatchCollege]=useReducer(collegeReducer,{
  value:'',
  isValid:null
 })

 const authCtx=useContext(AuthContext);

 const {isValid:emailIsValid}=emailState;
 const {isvalid:passwordIsValid}=passwordState;
 const {isvalid:collegeNameIsvalid}=collegeState;

 useEffect(()=>{
  const identifier = setTimeout(()=>{
    console.log('Cheking form validity');
    setFormIsValid(
      emailIsValid && passwordIsValid && collegeNameIsvalid
    )
  },500);

  return ()=>{
    console.log('CLEANUP');
    clearTimeout(identifier);
  }
 },[emailIsValid,passwordIsValid,collegeNameIsvalid])

  
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value});
    setFormIsValid(
            event.target.value.includes('@') && passwordState.isValid && collegeState.value.trim().length > 3
          );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPasswrod({type:"USER_PASSWORD",val:event.target.value});
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && collegeState.value.trim().length > 3
    );
  };

  const collegeChangeHandler=(event)=>{
    dispatchCollege({type:'USER_COLLEGE',val:event.target.value})
    setFormIsValid(
      emailState.isValid && passwordState.isValid && event.target.value.trim().length > 3
    );
  }
    
  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
   dispatchPasswrod({type:'INPUT_BLUR'})
  };

  const validateCollegeHandler = ()=> {
    dispatchCollege({type:'INPUT_BLUR'})
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailInputRef.current.focus();
    }else{
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
            ref={emailInputRef}
            id="email"
            label="E-Mail"
            type="email"
            isValid={emailIsValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            />

        <Input
            ref={passwordInputRef}
            id="password"
            label="Password"
            type="password"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            />
       <Input
        type="text"
        id="college_name"
        label="colllege name"
        isvalid={collegeState.isValid}
        value={collegeState.value}
        onChange={collegeChangeHandler}
        onBlur={validateCollegeHandler}
        
       />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
