import {REGISTER_USER, CLEAR_REGMESSAGE} from './actiontypes'
import axios from 'axios'



export const registerUser = (payload) => ({
    type:REGISTER_USER,
    payload
})

export const clearMessage = () => ({
    type:CLEAR_REGMESSAGE
})



export const userRegistration = payload => dispatch => {
    
    return axios.post('https://tmsapi.sandeepbabu.tech/register',{
        ...payload
    })
    .then(res=>dispatch(registerUser(res.data)))
    .catch(err=>console.log(err))
}