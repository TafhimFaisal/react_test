import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import InviteReducer from './InviteReducer';

export default combineReducers({
    auth:AuthReducer,
    invite:InviteReducer
})