import React from 'react'
import { useState } from 'react'
import './SignUp.css'
import '../Global.css'

export const SignUp = () => {
    const [signUpEmail, setsignUpEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
  return (
    <>
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
        <button type='submit' >Log in</button>
    </form>
    </>
  )
}
