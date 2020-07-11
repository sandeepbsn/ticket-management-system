import React from 'react'
import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Company from './Company'
import Customer from './Customer'
import Normal from './Normal'


export default function(){
    const userInfo = useSelector(state => state.login.userInfo)
    return (
        <div>
            <div className={styles.top}>
                <div className={styles.dots}>
                    <img src="/dots.png" width="40px" height="40px" alt="dots"></img>
                </div>
            </div>

            <div className={styles.middle}>
                <div>
                    <div className="forimage">
                        <img src="/conversations.png" width = "100px" height="100px" alt="logo"></img>    
                    </div>
                    <div className={styles.support360}>
                        SUPPORT 360
                    </div>
                </div>  
                
                {/* Based on the loginstate and role of the user the navbar is displayed */}
                {userInfo?.role === 'customer' ? <Customer/> :
                userInfo?.role === 'company' ? <Company/> :
                <Normal/>}
                
            </div>
        </div>
    )
}