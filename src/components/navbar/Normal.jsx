import React from 'react'
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'


export default function Normal(){
    return (
        <div className = {styles.customer}>
            <div className={styles.divauto}>
                <Link to ='/login'>
                    <button className={styles.buttons}>
                        Login
                    </button>
                </Link>
            </div>

            <div>
                <Link to ='/register'>
                    <button className={`${styles.buttons} ${styles.register}`}>
                        Register
                    </button>
                </Link>
            </div>
        </div>
    )
}