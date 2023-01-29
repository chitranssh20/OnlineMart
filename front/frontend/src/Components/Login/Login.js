import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../Axios'
import './Login.css'
import '../Global.css'
import axios from 'axios'

export const Login = () => {
  let navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState('')
  const [password, setpassword] = useState('')

  const handleLogin = (e) =>{
    e.preventDefault()
    console.log('hellow')
    let loginCredentials = new FormData();
    loginCredentials.append('email', loginEmail)
    loginCredentials.append('password', password)
    axiosInstance.post('customer/api/token/', loginCredentials).then(function setTokens(res){
      
      localStorage.setItem('refresh_token', res.data.refresh)
      localStorage.setItem('access_token', res.data.access)
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

    }     
    ).catch(err=>console.log('wrong credentials'))


    setloginEmail('')
    setpassword('')
  }

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
        <button type='submit' onClick={(e)=>{handleLogin(e)}} >Log in</button>
      <h4 className='formCaption' >Not Registered?</h4>
      <h3 className='formCaptionAction' onClick={()=>{navigate('/signUp')}} >SignUp</h3>
      </form>
    </>
  )
}
