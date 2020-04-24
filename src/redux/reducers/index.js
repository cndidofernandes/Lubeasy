import { combineReducers } from 'redux';
import {isAuthenticated, getUser} from './Auth0Reducer';
import {registerPastLocation} from './LocationReducer';

export default combineReducers({
    isAuthenticated,
    registerPastLocation,
    getUser
})