import React,{useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { fetchComplaints, fetchResponses, sendResponse, changeStatus } from '../../redux/customerReducer/actions'
import {useParams} from 'react-router-dom'
import styles from './OneComplaint.module.css'
import Response from './Response'
import {v4 as uuidv4} from 'uuid'

export default function OneComplaint(){
    const complaints = useSelector(state => state.customer.complaints)
    const responses = useSelector(state => state.customer.responses)
    const userInfo = useSelector(state => state.login.userInfo)
    const [status, setStatus] = useState("")
    const [agentResponse, setAgentResponse] = useState({
        "message":"",
        "date" : "",
        "time":"",
        "ticket_id":"",
        "person":""
    })

    const dispatch = useDispatch()
    const params = useParams()
    
    let complaint

    useEffect(()=>{
        dispatch(fetchComplaints(userInfo['id']))
        dispatch(fetchResponses(params.complaint_id))
    },[userInfo, dispatch])

    if(complaints.length > 0){
        complaint = complaints.filter(ticket => ticket.id == params.complaint_id)
    }

    const handleChange = (e) => {
        let cur_date = new Date().toLocaleDateString()
        cur_date = cur_date.split("/").reverse().join("-")
        let cur_time = new Date().toLocaleTimeString()
        setAgentResponse({
            ...agentResponse,
            [e.target.name] : e.target.value,
            "date":cur_date,
            "time":cur_time,
            "ticket_id":params.complaint_id,
            "person":userInfo['role']
            
        })
    }

    const handleStatus = (e) => {
        if(e.target.value === 'Status'){
            return
        }
        const load = {
            "status":e.target.value,
            "ticket_id":params.complaint_id
        }
        console.log(load)
        dispatch(changeStatus(load))
        setStatus(e.target.value)
    }

    const handleSend = async(e) =>{
        await dispatch(sendResponse(agentResponse))
        await dispatch(fetchResponses(params.complaint_id))
        setAgentResponse({
            "message":"",
            "date" : "",
            "time":"",
            "ticket_id":"",
            "person":""
        })
    }
    console.log(status)
    if(complaint){
        return(
            <div>
                <div className="d-flex align-items-center">
                    <div className={styles.ticket}>
                        {`Ticket ${params.complaint_id}`}
                    </div>
                    
                    <div className={styles.selectdiv}>
                        <select name = 'status'
                        onChange = {(e)=>handleStatus(e)}>
                            <option>Status</option>
                            <option value = 'Open'>Open</option>
                            <option value = 'Closed'>Closed</option>
                            <option value = 'Pending'>Pending</option>
                        </select>
                    </div>
                </div>
                <div className = {styles.messagecontainer}>
                    <div>
                        <div>
                            SUBJECT
                        </div>
                        <div>
                            {complaint[0].subject}
                        </div>
                    </div>

                    <div className="mt-3 mb-4">
                        <div>
                            CONTENT
                        </div>
                        <div className = {styles.contentcontainer}>
                            <div className={styles.contentmessage}>
                                {complaint[0].content}
                            </div>
                            <div className={styles.contentdate}>
                                <div>
                                    {`${complaint[0].date} ${complaint[0].time.slice(0,complaint[0].time.length - 3)} hrs`}
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
                                value={agentResponse.message}
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