import { AuthActionType } from "../contants/actions-type";
import { data,privetData,handleErrorAndDispatch, userName, password } from "../requests";
import Cookies from 'universal-cookie';

export const login = (requiredData) => async (dispatch) => {
    const cookies = new Cookies();
    let request = data()
    const response = await request.post('/auth/login',requiredData).catch((err)=>{ return err.response })
    if(response.status == 201) await cookies.set('jwt', response.data.access_token, { path: '/' });
    handleErrorAndDispatch(requiredData,response,dispatch,{
        type:AuthActionType.LOGIN,
        payload:{
            authenticated: response.data.access_token ? true : false,
            token:response.data.access_token ?? ''
        }
    })

}
export const logout = () => async (dispatch) => {
    const cookies = new Cookies();
    cookies.remove('jwt', { path: '/' });
    dispatch({
        type:AuthActionType.LOGOUT,
        payload:{
            authenticated:false,
            token:null,
            user:{
                name:null,
                email:null,
                type:null
            }
        }
    })
}

export const me = () => async (dispatch) => {
  try {
      let request = await privetData()
      const response = await request.post(`/auth/user-details`).catch((err)=>{ console.log(err.response); })
      
      handleErrorAndDispatch({},response,dispatch,{
          type:AuthActionType.ME,
          payload:{
              user:{...response.data}
          }
      })
       
    }
    catch(err) {
        console.error("somthing went wrong");
    }
}

export const refresh = () => async (dispatch) => {
    const cookies = new Cookies();
    let request = await privetData()
    const response = await request.put(`/auth/login`,{
      "username": userName,
      "password": password
    }).catch((err)=>{ console.log(err.response); })

    if(response.status == 200) await cookies.set('jwt', response.data.access_token, { path: '/' });
    handleErrorAndDispatch({},response,dispatch,{
        type:AuthActionType.REFRESHED,
        payload:{
            authenticated:true,
            token:response.data.access_token
        }
    })
}

