import React from 'react'
import axiosInstance from '../Axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AddStaff = () => {
    let navigate = useNavigate();


    const [signUpEmail, setsignUpEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [phone, setphone] = useState('') 

    const submitStaffDetails = (e) =>{
        e.preventDefault();
        if (password!==confirmPassword){
            window.alert('Passwords do not match')
        }
        else{
            let email  = signUpEmail
            if (email==null || email == ''){
                window.alert('Missing Credentials') 
            }
            else{
                let staffDataForm = new FormData()
                staffDataForm.append('email', email)
                staffDataForm.append('fname', fname)
                staffDataForm.append('lname', lname)
                staffDataForm.append('phone', phone)
                staffDataForm.append('password', password)
                staffDataForm.append('cpassword', confirmPassword)
             
                axiosInstance.post('customer/addStaff/', staffDataForm).then((res)=>{
                        if (res.data.status === 302){
                            window.alert('Email is already taken.')
                        }
                        else if(res.data.status === 400){
                            window.alert('Wrong Credentials')
                        }
                        else if(res.data.status === 201){
                            window.alert('Staff Member has been added')
                        }
                        else if(res.data.status === 401){
                            window.alert('Only Superusers are allowed to take this action')
                        }
                }).catch(err=>console.log(err))
                try{
                }
                catch(err){
                    console.log(err)
                }
            }
        }
    }
    

  return (
    <>
    <h3 className='homeButton' onClick={() => { navigate('/managestaff') }} >Back</h3>
    <form>
    <h2>Add Staff</h2>
    <label htmlFor='email' >Email:</label>
        <input type='email'  value={signUpEmail} name= 'email' id= 'email' onChange = {(e)=>{
            setsignUpEmail(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='fnmae' >First Name:</label>
        <input type='text'  value={fname} name= 'fname' id= 'fname' onChange = {(e)=>{
            setfname(e.target.value)
        }} ></input>
        <label htmlFor='lname' >Last Name:</label>
        <input type='text'  value={lname} name= 'lname' id= 'lname' onChange = {(e)=>{
            setlname(e.target.value)
        }} ></input>
        <label htmlFor='phone' >Phone:</label>
        <input type='number'  value={phone} name= 'phone' id= 'phone' onChange = {(e)=>{
            setphone(e.target.value)
        }} ></input>
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
        <button type='submit' onClick={(e)=>submitStaffDetails(e)} >Add Staff</button>
    </form>
        </>
  )
}
