import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import abstactWelcome from '../images/abstactWelcome.jpg'
import './SignUp.css'
import '../Global.css'
import { useDispatch } from 'react-redux'
import axiosInstance from '../Axios'


export const SignUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [signUpEmail, setsignUpEmail] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [phone, setphone] = useState('')

  const signUpnotif = (message) => {
    dispatch({
      type: "open",
      message: message
    })
  }
  const removeModal = () => {
    dispatch({
      type: "close"
    })
  }

  const handlesignupModal = (message) => {
    signUpnotif(message);
    setTimeout(() => {
      removeModal();
    }, 5000);
  }


  const signUpformSubmit = (e) => {
    e.preventDefault();

    if (signUpEmail == '' || password == '' || confirmPassword == '' || phone == '' || fname == '' || lname == '') {
      handlesignupModal('Please fill all the fields');
    }
    else {
      if (password !== confirmPassword) {
        handlesignupModal('Passwords do not match');
      }
      else {

        try {
          let signUpdata = new FormData();
          signUpdata.append('email', signUpEmail)
          signUpdata.append('password', password)
          axiosInstance.post('customer/email/', signUpdata).then((res) => {
            if (res.data.status === 208) {
              handlesignupModal("Email is already Registered");
            }
            else if (res.data.status === 403) {
              dispatch({
                type: "update",
                email: signUpEmail,
                password: password,
                confirmPassword: confirmPassword,
                fname: fname,
                lname: lname,
                phone: phone
              })
              navigate('/verifyOtp')
            }
          }).catch((err) => {
            console.log(err);
          })

        }
        catch {

        }
      }
    }
  }



  return (
    <>
      <h3 className='homeButton' onClick={() => { navigate('/') }} >HOME</h3>

      <img className='abstractImg' src={abstactWelcome} />
      <form>
        <label htmlFor='fname' >First Name:</label>
        <input type='text' value={fname} name='fname' id='fname' onChange={(e) => {
          setfname(e.target.value)
        }} required="required" />
        <br></br>
        <label htmlFor='lname' >Last Name:</label>
        <input type='text' value={lname} name='lname' id='lname' onChange={(e) => {
          setlname(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='phone' >Phone:</label>
        <input type='number' value={phone} name='phone' id='phone' onChange={(e) => {
          setphone(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='email' >Email:</label>
        <input type='email' value={signUpEmail} name='email' id='email' onChange={(e) => {
          setsignUpEmail(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='password' >Password:</label>
        <input type='text' value={password} name='password' id='password' onChange={(e) => {
          setpassword(e.target.value)
        }} ></input>
        <br></br>
        <label htmlFor='Cpassword' >Confirm Password:</label>
        <input type='text' value={confirmPassword} name='Cpassword' id='password' onChange={(e) => {
          setconfirmPassword(e.target.value)
        }} ></input>
        <br></br>
        <button type='submit' onClick={(e) => signUpformSubmit(e)}  >Sign Up</button>
        <h4 className='formCaption' >Already Registered?</h4>
        <h3 className='formCaptionAction' onClick={() => { navigate('/login') }} >LogIn</h3>
      </form>
    </>
  )
}
