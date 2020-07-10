import React from 'react'
import styles from './Navbar.module.css'
import {Link, useHistory} from 'react-router-dom'
import {logoutUser} from '../../redux/loginReducer/actions'
import {useDispatch} from 'react-redux'


export default function Company(){

    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        dispatch(logoutUser())
        history.push('/login')
    }
    
    return (
        <div className = {styles.customer}>
            <div>
                <Link to ='/dashboard'>
                    <button className={styles.customerbuttons}>
                        Dashboard
                    </button>
                </Link>
            </div>
            <div>
                <Link to ='/agentportal'>
                    <button className={styles.customerbuttons}>
                        Agent Portal
                    </button>
                </Link>
            </div>

            <div className={styles.divauto}>
                <button className={styles.buttons}
                onClick = {() => logout()}>
                    Logout
                </button>
            </div>
        </div>
    )
}