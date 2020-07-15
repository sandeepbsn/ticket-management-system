import {LOGIN_USER, FETCH_USER, LOGOUT_USER} from './actiontypes'
import axios from 'axios'


export const loginUserSuccess = (payload) => ({
    type:LOGIN_USER,
    payload
})

export const fetchUser = (payload) => ({
    type:FETCH_USER,
    payload
})

export const logoutUser = () => ({
    type:LOGOUT_USER
})




export const loginUser = payload => dispatch => {
    return axios.post('https://tmsapi.sandeepbabu.tech/login', {
        ...payload
    })
    .then(res => dispatch(loginUserSuccess(res.data)))
    .catch(err => console.log(err))
}

export const fetchUserInfo = payload => dispatch => {
    return axios.get(payload)
    .then(res => dispatch(fetchUser(res.data)))
    .catch(err => console.log(err))
}
