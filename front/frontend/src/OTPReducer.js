import {createReducer} from '@reduxjs/toolkit'
import { withReduxStateSync } from 'redux-state-sync';

const credentials = {
    email: 'default',
    password: '',
    confirmPassword: '',
    fname: '',
    lname: '',
    phone: '',
}

const credentialReducer = createReducer(credentials, {
    update: (state, action) =>{
        state.email = action.email;
        state.password = action.password;
        state.confirmPassword = action.confirmPassword;
        state.fname = action.fname;
        state.lname = action.lname;
        state.phone= action.phone;
        console.log('state', state);
        return state
    }
})
export default withReduxStateSync(credentialReducer)