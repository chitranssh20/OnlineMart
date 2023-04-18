import React from 'react'
import { useSelector } from 'react-redux'
import store from '../store';
import {useNavigate} from 'react-router-dom'
const OTP = () => {
    const navigate = useNavigate();
    

    let email = useSelector(state => state.credentialReducer.email);
    let password = useSelector(state => state.credentialReducer.password);
    let confirmPassword = useSelector(state => state.credentialReducer.confirmPassword);
    email = store.getState().credentialReducer.email
    const [timer, settimer] = React.useState(15)

    if(email==='default'){
        navigate('/signUp')
    }

    React.useEffect(()=>{
        const counter = timer>0 && setInterval(()=>settimer(timer-1), 1000);
        return () => clearInterval(counter)
    }, [timer])    
    
    


    //Submit OTP
    const submitOTP = (e) =>{
        e.preventDefault();
    }


    return (
        <>
            <form className='inputOTP' >
                <h2>Enter OTP for email: {email}</h2>
                <label htmlFor='otp' >Enter OTP:</label>
                <input type= 'number' id='otp' name='otp'></input>
                <h2>Resend OTP in {timer} seconds  </h2>
                <button type='submit' onClick={(e)=>submitOTP(e)} >Enter OTP</button>
            </form>
        </>
    )
}

export default OTP