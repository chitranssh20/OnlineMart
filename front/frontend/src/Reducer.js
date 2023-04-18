import {createReducer} from '@reduxjs/toolkit'
import { withReduxStateSync } from 'redux-state-sync';

const iniitalState = {
    isOpen: false,
    message: 'This is default modal'
}

const customReducer = createReducer(iniitalState ,{
    open: (state, action) => {
        state.isOpen = true;
        state.message= action.message;
        return state
    },
    close: (state, action)=>{
        state.isOpen = false;
        state.message = '';
        return state
    }

} )

export default withReduxStateSync(customReducer)

