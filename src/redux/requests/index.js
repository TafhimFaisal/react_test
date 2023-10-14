import axios from 'axios';
import Cookies from 'universal-cookie';

export const baseURL = process.env.REACT_APP_BASE_URL,
             userName = process.env.USER_NAME,
             password = process.env.PASSWORD,
             uuid = process.env.UUID
             
export const privetData = async () => {
  const cookies = new Cookies();
  
  return axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
      Authorization: `Bearer ${await cookies.get('jwt')}`,
    },
  })
}

export const data = () => axios.create({
  baseURL: baseURL,
  timeout: 30000
})

export const handleErrorAndDispatch = (requiredData, response, dispatch, dispatchData) => {
  if (requiredData.callBack) requiredData.callBack(response)
  dispatch({ ...dispatchData })
}