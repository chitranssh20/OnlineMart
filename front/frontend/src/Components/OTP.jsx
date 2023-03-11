import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import store from '../store';
const OTP = () => {


    let email = useSelector(state => state.credentialReducer.email);
    console.log(email)
    let password = useSelector(state => state.credentialReducer.password);
    let confirmPassword = useSelector(state => state.credentialReducer.confirmPassword);
    email = store.getState().credentialReducer.email
    console.log(email);

    return (
        <>

            <h2>sdfsdf</h2>
        {email}
            <h2>adlkjadlk</h2>
        </>
    )
}

export default OTP