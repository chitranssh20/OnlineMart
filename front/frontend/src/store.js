import {configureStore} from '@reduxjs/toolkit'
import  customReducer  from './Reducer'
import  credentialReducer  from './OTPReducer'
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

const config = {
    // TOGGLE_TODO will not be triggered in other tabs
    blacklist: ['close', 'open'],
  };
  const middlewares = createStateSyncMiddleware(config);
const store = configureStore({
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), middlewares],
    reducer: {
        modalReducer : customReducer,
        credentialReducer: credentialReducer 
    }
})
initStateWithPrevTab(store);
export default store