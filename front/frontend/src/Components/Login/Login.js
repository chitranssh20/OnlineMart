import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import '../Global.css'

export const Login = () => {
  let navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState('')
  const [password, setpassword] = useState('')
  return (
    <>
      <h3 className='homeButton' onClick={() => { navigate('/') }} >HOME</h3>
      <form>
        <label htmlFor='email' >Email:</label>
        <input type='email' value={loginEmail} name='email' id='email' onChange={(e) => {
          setloginEmail(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='password' >Password:</label>
        <input type='text' value={password} name='password' id='password' onChange={(e) => {
          setpassword(e.target.value)
        }} ></input>
        <br></br>
        <button type='submit' >Log in</button>
      <h4 className='formCaption' >Not Registered?</h4>
      <h3 className='formCaptionAction' onClick={()=>{navigate('/signUp')}} >SignUp</h3>
      </form>
    </>
  )
}
