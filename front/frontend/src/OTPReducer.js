import {createReducer} from '@reduxjs/toolkit'

const credentials = {
    email: 'haha',
    password: '',
    confirmPassword: ''
}

export const credentialReducer = createReducer(credentials, {
    update: (state, action) =>{
        state.email = action.email;
        state.password = action.password;
        state.confirmPassword = action.confirmPassword;
        console.log('state', state);
        return state
    }
})