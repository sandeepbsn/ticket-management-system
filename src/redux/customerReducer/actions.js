import {FETCH_COMPANIES, ADD_REQUEST, FETCH_REQUESTS, CHANGE_PAGE_NO, CHANGE_ROWS_PER_PAGE, FETCH_COMPLAINTS, CHANGE_AGENT_PAGE, CHANGE_AGENT_ROWS, FETCH_RESPONSES, CLEAR_RESPONSES, GET_DATE_TICKETS, GET_STATUS_TICKETS} from './actiontypes'
import axios from 'axios'


export const fetchCompaniesSuccess = (payload) => ({
    type:FETCH_COMPANIES,
    payload
})

export const addRequest = (payload) => ({
    type:ADD_REQUEST,
    payload
})

export const getRequests = (payload) => ({
    type: FETCH_REQUESTS,
    payload
})

export const getComplaints = (payload) => ({
    type: FETCH_COMPLAINTS,
    payload
})

export const getResponses = (payload) => ({
    type: FETCH_RESPONSES,
    payload
})

export const clearResponses = () => ({
    type:CLEAR_RESPONSES
})

export const changePage = (payload) => ({
    type: CHANGE_PAGE_NO,
    payload
})

export const changeRowsPerPage = (payload) => ({
    type:CHANGE_ROWS_PER_PAGE,
    payload
})

export const changeAgentPage = (payload) => ({
    type: CHANGE_AGENT_PAGE,
    payload
})

export const changeAgentRows = (payload) => ({
    type: CHANGE_AGENT_ROWS,
    payload
})

export const getDateGraph = (payload) => ({
    type: GET_DATE_TICKETS,
    payload
})

export const getStatusGraph = (payload) => ({
    type: GET_STATUS_TICKETS,
    payload
})


export const fetchCompanies = payload => dispatch => {
    return axios.get('https://support360.herokuapp.com/companies')
    .then(res => dispatch(fetchCompaniesSuccess(res.data)))
    .catch(err => console.log(err))
}

export const registerRequest = payload => dispatch => {
    return axios.post('https://support360.herokuapp.com/addrequest', {
        ...payload
    })
    .then(res => dispatch(addRequest(res.data)))
    .catch(err => console.log(err))
}

export const fetchRequests = payload => dispatch => {
    return axios.post('https://support360.herokuapp.com/getrequests', {
        "id":payload
    })
    .then(res => dispatch(getRequests(res.data)))
    .catch(err=> console.log(err))
}

export const fetchComplaints = payload => dispatch => {
    return axios.post('https://support360.herokuapp.com/getcomplaints',{
        "id":payload
    })
    .then(res => dispatch(getComplaints(res.data)))
    .catch(err=>console.log(err))
}

export const fetchResponses = payload => dispatch => {
    return axios.get(`https://support360.herokuapp.com/getresponses/${payload}`)
    .then(res => dispatch(getResponses(res.data)))
    .catch(err => console.log(err))
}

export const sendResponse = payload => dispatch => {
    return axios.post('https://support360.herokuapp.com/addresponse', {
        ...payload
    })
    .catch(err => console.log(err))
}

export const changeStatus = payload => dispatch => {
    return axios.post('https://support360.herokuapp.com/changestatus', {
        ...payload
    })
    .catch(err => console.log(err))
}

export const getDateTickets = payload => dispatch => {
    return axios.get(`https://support360.herokuapp.com/getdatetickets/${payload}`)
    .then(res => dispatch(getDateGraph(res.data)))
    .catch(err => console.log(err))
}

export const getStatusTickets = payload => dispatch => {
    return axios.get(`https://support360.herokuapp.com/getstatus/${payload}`)
    .then(res =>dispatch(getStatusGraph(res.data)))
    .catch(err => console.log(err))
}