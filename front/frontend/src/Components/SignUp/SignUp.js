import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './SignUp.css'
import '../Global.css'

export const SignUp = () => {
    let navigate = useNavigate();

    const [signUpEmail, setsignUpEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
  return (
    <>
      <h3 className='homeButton' onClick={()=>{navigate('/')}} >HOME</h3>


    <form>
    <label htmlFor='email' >Email:</label>
        <input type='email'  value={signUpEmail} name= 'email' id= 'email' onChange = {(e)=>{
            setsignUpEmail(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='password' >Password:</label>
        <input type='text'  value={password} name= 'password' id= 'password' onChange = {(e)=>{
            setpassword(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='Cpassword' >Confirm Password:</label>
        <input type='text'  value={confirmPassword} name= 'Cpassword' id= 'password' onChange = {(e)=>{
            setconfirmPassword(e.target.value)
        }} ></input>
        <br></br>
        <button type='submit' >Sign Up</button>
        <h4 className='formCaption' >Already Registered?</h4>
      <h3 className='formCaptionAction' onClick={()=>{navigate('/login')}} >LogIn</h3>
    </form>
    </>
  )
}
