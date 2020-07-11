import React,{useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {fetchRequests} from '../../redux/customerReducer/actions'
import styles from './OneRequest.module.css'
import {fetchResponses, sendResponse} from '../../redux/customerReducer/actions'
import Response from './Response'
import {v4 as uuidv4} from 'uuid'


export default function OneRequest(){
    const requests = useSelector(state => state.customer.requests)
    const responses = useSelector(state => state.customer.responses)
    const userInfo = useSelector(state => state.login.userInfo)
    const [userResponse, setUserResponse] = useState({
        "message":"",
        "date" : "",
        "time":"",
        "ticket_id":"",
        "person":""
    })
    

    let request

    const dispatch = useDispatch()
    const params = useParams()

    useEffect(()=>{
        dispatch(fetchRequests(userInfo['id']))
        dispatch(fetchResponses(params.ticket_id))
    },[userInfo, dispatch])

    if(requests.length > 0){
        request = requests.filter(request => request.id == params.ticket_id)
    }

    const handleChange = (e) => {
        let cur_date = new Date().toLocaleDateString()
        cur_date = cur_date.split("/").reverse().join("-")
        let cur_time = new Date().toLocaleTimeString()
        setUserResponse({
            ...userResponse,
            [e.target.name] : e.target.value,
            "date":cur_date,
            "time":cur_time,
            "ticket_id":params.ticket_id,
            "person":userInfo['role']
            
        })
    }

    const handleSend = async(e) =>{
        console.log(userResponse)
        await dispatch(sendResponse(userResponse))
        await dispatch(fetchResponses(params.ticket_id))
        setUserResponse({
            "message":"",
            "date" : "",
            "time":"",
            "ticket_id":"",
            "person":""
        })
    }
    
    if(request){
        return(
            <div>
                <div className={styles.ticket}>
                    {`Ticket ${params.ticket_id}`}
                </div>
                <div className = {styles.messagecontainer}>
                    <div>
                        <div>
                            SUBJECT
                        </div>
                        <div>
                            {request[0].subject}
                        </div>
                    </div>

                    <div className="mt-3 mb-4">
                        <div>
                            CONTENT
                        </div>
                        <div className = {styles.contentcontainer}>
                            <div className={styles.contentmessage}>
                                {request[0].content}
                            </div>
                            <div className={styles.contentdate}>
                                <div>
                                    {`${request[0].date} ${request[0].time.slice(0,request[0].time.length - 3)} hrs`}
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </div>

                    {responses.length ? 
                        <div>
                            {responses.map(response => {
                                return (
                                    <Response item = {response} key={uuidv4()} />
                                )
                            })}
                        </div>:
                            
                            
                        <div>
                            <div>
                                No repsonses yet                            
                            </div> 
                        </div>
                    }
                    <div className={styles.replybg}>
                        <div>
                            REPLY    
                        </div>
                        <div className = {styles.replycontainer}>
                            <div className={styles.replybox}>
                                <textarea name = "message"
                                value={userResponse.message}
                                onChange={(e)=>handleChange(e)}/>
                            </div>
                            <div>
                            <button className={styles.buttons}
                            onClick={(e)=>handleSend()}>
                                Send    
                            </button>    
                        </div>
                        </div>                        
                    </div>                  


                </div>
            </div>
        )
    }
    else{
        return (
            <div>
                Loading...
            </div>
        )
    }
}