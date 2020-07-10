import {FETCH_COMPANIES, ADD_REQUEST, FETCH_REQUESTS, CHANGE_PAGE_NO, CHANGE_ROWS_PER_PAGE, FETCH_COMPLAINTS, CHANGE_AGENT_ROWS, CHANGE_AGENT_PAGE, FETCH_RESPONSES, CLEAR_RESPONSES, GET_DATE_TICKETS, GET_STATUS_TICKETS} from './actiontypes'



export const customerState = {
    "companies":[],
    "reqMessage":null,
    "requests":[],
    "responses":[],
    "complaints":[],
    "dategraph":[],
    "statusgraph":[],
    "page_no":1,
    "rows_per_page":5,
    "agent_page":1,
    "agent_rows":5,
}

export default (state = customerState, {type, payload}) => {
    switch(type){
        case FETCH_COMPANIES:
            return ({
                ...state,
                "companies":payload
            })

        case ADD_REQUEST:
            return ({
                ...state,
                "reqMessage":payload
            })

        case FETCH_REQUESTS:
            return ({
                ...state,
                "requests":payload
            })

        case FETCH_RESPONSES:
            return ({
                ...state,
                "responses":payload
            })

        case CLEAR_RESPONSES:
            return({
                ...state,
                "responses":[]
            })

        case CHANGE_PAGE_NO:
            return ({
                ...state,
                "page_no":payload
            })
        
        case CHANGE_ROWS_PER_PAGE:
            return({
                ...state,
                "rows_per_page":payload
            })

        case FETCH_COMPLAINTS:
            return ({
                ...state,
                "complaints":payload
            })

        case CHANGE_AGENT_PAGE:
            return ({
                ...state,
                "agent_page":payload
            })

        case CHANGE_AGENT_ROWS:
            return ({
                ...state,
                "agent_rows":payload
            })

        case GET_DATE_TICKETS:
            return ({
                ...state,
                "dategraph": payload
            })

        case GET_STATUS_TICKETS:
            return({
                ...state,
                "statusgraph": payload
            })

        default:
            return state
    }
}