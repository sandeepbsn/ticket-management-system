import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {clearMessage} from '../../redux/registerReducer/action'
import styles from './Login.module.css'
import {loginUser} from '../../redux/loginReducer/actions'



export default function Login(){
    const dispatch = useDispatch()
    const history = useHistory()
    const message = useSelector(state => state.register.message)
    const loginInfo = useSelector(state => state.login.loginInfo)
    const [login, setLogin] = useState({
        "email":"",
        "password":"",
    })

    useEffect(()=>{
        if(message){
            dispatch(clearMessage())
        }
        if(loginInfo){
            if(loginInfo?.token){
                history.push(`/${loginInfo['token']}`)
            }
        }
    },[message, loginInfo, dispatch, history])

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await dispatch(loginUser(login))
    }


    console.log(loginInfo)
    return (
        <div className={styles.maindiv}>
            <div className={styles.formbox}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div style={{"textAlign":"center"}}>
                        <h4>LOG INTO YOUR PORTAL</h4>
                    </div>

                    <div>
                        <div>
                            Email ID
                        </div>

                        <div>
                            <input name = "email" 
                            value = {login.email}
                            onChange = {(e)=>handleChange(e)}
                            required
                            placeholder="Email ID"/>
                            {loginInfo?.loggedIn === "false" ? 
                            <small className={styles.errorShow}>Username or password invalid</small>:
                            <small className={styles.errorHide}>Username or password invalid</small>}
                        </div>
                    </div>

                    <div>
                        <div>
                            Password
                        </div>

                        <div>
                            <input name = "password" 
                            value = {login.password}
                            onChange = {(e)=>handleChange(e)}
                            type = "password"
                            required
                            placeholder="Password"/>
                            {loginInfo?.loggedIn === "false" ? 
                            <small className={styles.errorShow}>Username or password invalid</small>:
                            <small className={styles.errorHide}>Username or password invalid</small>}
                        </div>
                    </div>

                    

                    <div>
                        <button className={styles.submit}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}