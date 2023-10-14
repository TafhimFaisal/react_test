import { AuthActionType } from "../contants/actions-type"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
let token = cookies.get('jwt');
const initialState = {
    authenticated: token != undefined,
    token:token,
    user:null
  }

export default function AuthReducer (state = initialState, {type,payload}) {
    switch (type) {
        case AuthActionType.LOGIN:
            return {
                ...state,
                ...payload
            }
            
        case AuthActionType.LOGOUT:
            return {
                ...state,
                ...payload
            }

        case AuthActionType.ME:
            return {
                ...state,
                ...payload
            }

        case AuthActionType.REFRESHED:
            return {
                ...state,
                ...payload
            }

        default:
            return state
    }
}
  