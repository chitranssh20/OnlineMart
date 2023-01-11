import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const AdminLogIn = () => {
    const [adminEmail, setadminEmail] = useState('')
    const [adminPassword, setadminPassword] = useState('') 
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
        <button type='submit' >Log in</button>
      </form>
    </>
  )
}
