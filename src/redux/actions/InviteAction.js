import { InviteActionType } from "../contants/actions-type";
import { privetData,handleErrorAndDispatch,uuid } from "../requests";

export const sendInvite = (requiredData) => async (dispatch) => {
    let request = await privetData()
    const response = await request.post(`/accounts/9966c19b-31fbb-3232-8b77-4c95c9763ds/invite-user`,requiredData).catch((err)=>{ return err.response })
    
    handleErrorAndDispatch(requiredData,response,dispatch,{
        type:InviteActionType.SEND_INVITE,
        payload:response.data
    })
}

export const setPendingInvitations = (requiredData) => async (dispatch) => {
    let request = await privetData()
    const response = await request.get(`/accounts/9966c19b-31fbb-3232-8b77-4c95c9763ds/pending-invites`).catch((err)=>{ return err.response })
    
    handleErrorAndDispatch(requiredData,response,dispatch,{
        type:InviteActionType.SET_PENDING_INVITATIONS,
        payload:response.data
    })
}

export const setAcceptedInvitations = (requiredData) => async (dispatch) => {
    let request = await privetData()
    const response = await request.get(`/accounts/9966c19b-31fbb-3232-8b77-4c95c9763ds/users`).catch((err)=>{ return err.response })
    
    handleErrorAndDispatch(requiredData,response,dispatch,{
        type:InviteActionType.SET_ACCEPTED_INVITATIONS,
        payload:response.data
    })
}

