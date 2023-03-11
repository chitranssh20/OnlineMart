import React from 'react'
import axiosInstance from '../Axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AdminLogIn = () => {
  const navigate = useNavigate();
    const [adminEmail, setadminEmail] = useState('')
    const [adminPassword, setadminPassword] = useState('') 

    const handleLogin = (e) =>{

      e.preventDefault()
      let loginCredentials = new FormData();
      loginCredentials.append('email', adminEmail)
      loginCredentials.append('password', adminPassword)
      axiosInstance.post('customer/api/token/', loginCredentials).then(function setTokens(res){  
        localStorage.setItem('refresh_token', res.data.refresh)
        localStorage.setItem('access_token', res.data.access)
        setadminEmail('')
        setadminPassword('')
        axiosInstance.get('customer/checkAdmin/').then(function(res){
          if (res.data.rescode === 202){
            navigate('/admindash')
          }
          else{
            navigate('/login')
          }
        }).catch(err=>{navigate('/login');console.log(err)});

        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
      }     



      ).catch(err=>navigate('/login'))
    }

  return (
    <>
    <form>
        <label htmlFor='email' >Email:</label>
        <input type='email' value={adminEmail} name='email' id='email' onChange={(e) => {
          setadminEmail(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='password' >Password:</label>
        <input type='text' value={adminPassword} name='password' id='password' onChange={(e) => {
          setadminPassword(e.target.value)
        }} ></input>
        <br></br>
        <button type='submit' onClick={(e)=>handleLogin(e)} >Log in</button>
      </form>
    </>
  )
}
