import React from 'react'
import styles from './Navbar.module.css'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { logoutUser } from '../../redux/loginReducer/actions'


export default function Customer(){
    
    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        dispatch(logoutUser())
        history.push('/login')
    }

    return (
        <div className = {styles.customer}>
            <div>
                <Link to ='/raiserequest'>
                    <button className={styles.customerbuttons}>
                        Raise Request
                    </button>
                </Link>
            </div>

            <div>
                <Link to ='/viewrequests'>
                    <button className={`${styles.customerbuttons}`}>
                        View Requests
                    </button>
                </Link>
            </div>

            <div className={styles.divauto}>
                <button className={styles.buttons}
                    onClick = {()=>logout()}>
                        Logout
                </button>
            </div>
        </div>
    )
}