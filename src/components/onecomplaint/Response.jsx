import React from 'react'
import styles from './OneComplaint.module.css'


export default function Response(props){
    const {item} = props
    
    return (
        <div className={styles.userresponse}>
            {item.person === 'customer' ? 
                <div>
                    <div className = {styles.contentcontainer}>
                        <div className={styles.contentmessage}>
                            {item['message']}
                        </div>
                        <div className={styles.contentdate}>
                            <div>
                                {`Sent on: ${item['date']} ${item['time'].slice(0,item['time'].length - 3)} hrs`}
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </div>:
                
                <div className={styles.agentresponse}>
                    <div className={styles.agenttitle}>
                        AGENT REPLY
                    </div>
                    <div className = {styles.contentcontainer}>
                        <div className={styles.contentmessage}>
                            {item['message']}
                        </div>
                        <div className={styles.contentdate}>
                            <div>
                                {`Sent on: ${item['date']} ${item['time'].slice(0,item['time'].length - 3)} hrs`}
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </div>
            }
        </div>
    )
}