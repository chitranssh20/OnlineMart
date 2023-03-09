import {configureStore} from '@reduxjs/toolkit'
import { customReducer } from './Reducer'



const store = configureStore({
    reducer: {
        modalReducer : customReducer
    }
})

export default store