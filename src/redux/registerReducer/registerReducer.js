import {REGISTER_USER, CLEAR_REGMESSAGE} from './actiontypes'
import { saveData, loadData, removeData } from '../localStorage'

export const registerState = {
    message:loadData("regMessage"),    
}

export default (state = registerState, {type, payload}) => {
    switch(type) {
        case REGISTER_USER:
            saveData("regMessage",payload['message'])
            return ({
                ...state,
                message:loadData("regMessage"),
            })

        case CLEAR_REGMESSAGE:
            removeData("regMessage")
            return ({
                ...state,
                message:null
            })

        default:
            return state

    }
}