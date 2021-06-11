import React,{useEffect} from 'react'
import {fetchUserInfo} from '../redux/loginReducer/actions'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'


export default function Home(){
    const history = useHistory()
    const {token} = useParams()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.login.userInfo)
    const loginInfo = useSelector(state => state.login.loginInfo)

    useEffect(()=>{
        console.log(userInfo)
        if(userInfo){
            if(userInfo['role'] === 'customer'){
                history.push('/raiserequest')
            }
            else{
                history.push('/agentportal')
            }
        }
        else if(loginInfo){
            dispatch(fetchUserInfo(`https://support360.herokuapp.com//${token}`))
        }
        else{
            history.push('/login')
        }
    }, [history, userInfo, loginInfo, dispatch])    


    return (
        <div>
            <div className="d-flex border shadow-sm mx-auto mt-5 py-5 text-center w-50">
                <h4>Please wait while you are being redirected to your dashboard...</h4>
            </div>
        </div>
    )
}