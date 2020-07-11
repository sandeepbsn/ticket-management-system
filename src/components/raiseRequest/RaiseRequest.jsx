import React, { useState, useEffect } from 'react'
import styles from './RaiseRequest.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {fetchCompanies} from '../../redux/customerReducer/actions'
import {v4 as uuidv4} from 'uuid'
import {registerRequest} from '../../redux/customerReducer/actions'

export default function RaiseRequest(){

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.login.userInfo)
    const companies = useSelector(state => state.customer.companies)
    const reqMessage = useSelector(state => state.customer.reqMessage)

    const [request,setRequest] = useState({
        "user_id":"",
        "company_id":"",
        "subject":"",
        "content":"",
        "date":"",
        "time":""
    })

    useEffect(()=>{
        if(companies.length === 0){
            dispatch(fetchCompanies())
        }
    },[companies, dispatch])

    const handleChange = (e) => {
        let cur_date = new Date().toLocaleDateString()
        cur_date = cur_date.split("/").reverse().join("-")
        let cur_time = new Date().toLocaleTimeString()
        setRequest({
            ...request,
            [e.target.name] : e.target.value,
            "user_id":userInfo['id'],
            "date":cur_date,
            "time":cur_time
            
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()  
        await dispatch(registerRequest(request))
    }
    console.log(request)
    return (
        <div className={styles.maindiv}>
            <div className={styles.formbox}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div style={{"textAlign":"center"}}>
                        <h4>Reach out to us, we're here for you</h4>
                    </div>

                    <div>
                        <div>
                            Company
                        </div>

                        <div>
                            <select name = "company_id"
                            value = {request.company_id}
                            required
                            onChange = {(e)=>handleChange(e)}
                            className={styles.role}>
                                {companies.length !== 0 ? 
                                companies.map(company => {
                                    return (
                                        <option key = {uuidv4()} value = {company[0]}>{company[1]}</option>
                                    )
                                }):
                                <option>Loading...</option>}
                            </select>
                        </div>
                    </div>

                    <div>
                        <div>
                            Subject
                        </div>

                        <div>
                            <input name = "subject" 
                            value = {request.subject}
                            onChange = {(e)=>handleChange(e)}
                            required/>
                        </div>
                    </div>

                    <div>
                        <div>
                            Content
                        </div>

                        <div>
                            <textarea name = "content" 
                            value = {request.content}
                            onChange = {(e)=>handleChange(e)}
                            required/>
                            {reqMessage ? 
                            <small className={styles.showsuccess}>{reqMessage}</small>:
                            <small className={styles.hidesuccess}>{reqMessage}</small>}
                        </div>
                    </div>

                    <div>
                        <button className={styles.submit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}