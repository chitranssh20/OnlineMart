import React from 'react'
import { useState } from 'react'
import './Login.css'
import '../Global.css'

export const Login = () => {
    const [loginEmail, setloginEmail] = useState('')
    const [password, setpassword] = useState('')
  return (
    <>

    <form>
        <label htmlFor='email' >Email:</label>
        <input type='email'  value={loginEmail} name= 'email' id= 'email' onChange = {(e)=>{
            setloginEmail(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='password' >Password:</label>
        <input type='text'  value={password} name= 'password' id= 'password' onChange = {(e)=>{
            setpassword(e.target.value)
        }} ></input>
        <br></br>
        <button type='submit' >Log in</button>
    </form>
    </>
  )
}
