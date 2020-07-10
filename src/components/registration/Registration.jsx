import React, {useState,useEffect} from 'react'
import styles from './Registration.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {userRegistration} from '../../redux/registerReducer/action'
import {useHistory} from 'react-router-dom'




export default function Registration(){
    const dispatch = useDispatch()
    const message = useSelector(state => state.register.message)
    const history = useHistory()

    useEffect(()=>{
        if(message){
            if(message === "Username already exists"){
                alert(message)
            }
            else{
                alert(message)
                history.push('/login')
            }
        }
    },[history, message])

    const [user, setUser] = useState({
        "name":"",
        "email":"",
        "password":"",
        "role":"",
    })
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await dispatch(userRegistration(user))        
                                               
    }    
    
    return (
        <div className={styles.maindiv}>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div style={{"textAlign":"center"}}>
                    <h4>A NEW REGISTRATION</h4>
                </div>
                <div>
                    <div>
                        Name
                    </div>

                    <div>
                        <input name = "name"
                        value = {user.name}
                        onChange = {(e)=>handleChange(e)}
                        required 
                        placeholder="Name"/>
                    </div>
                </div>

                <div>
                    <div>
                        Email ID
                    </div>

                    <div>
                        <input name = "email" 
                        value = {user.email}
                        onChange = {(e)=>handleChange(e)}
                        required
                        placeholder="Email ID"/>
                    </div>
                </div>

                <div>
                    <div>
                        Password
                    </div>

                    <div>
                        <input name = "password" 
                        value = {user.password}
                        onChange = {(e)=>handleChange(e)}
                        type = "password"
                        required
                        placeholder="Password"/>
                    </div>
                </div>

                <div>
                    <div>
                        Role
                    </div>

                    <div>
                        <select name = "role"
                        value = {user.role}
                        required
                        onChange = {(e)=>handleChange(e)}
                        className={styles.role}>
                            <option value = "company">Company</option>
                            <option value = "customer">Customer</option>
                        </select>
                    </div>
                </div>

                <div>
                    <button className={styles.submit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}