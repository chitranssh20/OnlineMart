import {configureStore} from '@reduxjs/toolkit'
import { customReducer } from './Reducer'
import { credentialReducer } from './OTPReducer'


const store = configureStore({
    reducer: {
        modalReducer : customReducer,
        credentialReducer: credentialReducer 
    }
})

export default store