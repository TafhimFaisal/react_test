
import { InviteActionType } from "../contants/actions-type"
const initialState = {
    invitations:[],
    pending_invitations:[],
    accepted_invitations:[],
}

  
export default function inviteReducer (state = initialState, {type,payload}) {
    switch (type) {
        case InviteActionType.SET_INVITATIONS:
            return {
                ...state,
                invitations:payload
            }
        case InviteActionType.SET_PENDING_INVITATIONS:
            return {
                ...state,
                pending_invitations:payload
            }
        
        case InviteActionType.SET_ACCEPTED_INVITATIONS:
            return {
                ...state,
                accepted_invitations:payload
            }
        default:
            return state
    }
}
