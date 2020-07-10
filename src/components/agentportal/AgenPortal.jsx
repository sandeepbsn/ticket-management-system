import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchComplaints, changeAgentRows, changeAgentPage, clearResponses} from '../../redux/customerReducer/actions'
import {v4 as uuidv4} from 'uuid'
import styles from './AgentPortal.module.css'
import CustomPagination from './CustomPagination'
import PageList from './PageList'
import {Link, useRouteMatch} from 'react-router-dom'


export default function AgentPortal(){
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.login.userInfo)
    const complaints = useSelector(state => state.customer.complaints)
    const headers = ['Ticket ID', 'Subject','Username','Status']
    const activePage = useSelector(state => state.customer.agent_page)
    const rows_per_page = useSelector(state => state.customer.agent_rows)
    const match = useRouteMatch()
    useEffect(()=>{
        dispatch(fetchComplaints(userInfo['id']))
        dispatch(clearResponses())
    },[userInfo, dispatch])
    
    let low
    let high
    let total_pages
    if(complaints.length){
        const response = CustomPagination(complaints.length, activePage, rows_per_page)
        low = response['low']
        high = response['high']
        total_pages = response['total_pages']
    }

    const handleChange = (e) =>{
        if(e.target.value === 'Rows per page'){
            return
        }
        else{
            dispatch(changeAgentRows(Number(e.target.value)))
        }
    }
    
    if(complaints){
        return (
            complaints.length === 0 ? <div>"No complaints yet"</div>:
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                {headers.map(head=> <td key={uuidv4()}>{head}</td>)}
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.slice(low,high).map(complaint => {
                                return (
                                    <React.Fragment key={uuidv4()}>
                                        <tr className={styles.bodyRow} key={uuidv4()}>
                                            <td className="p-3">{complaint['id']}</td>
                                            <td className={styles.subject}>
                                                <div>
                                                    <Link className = {styles.link} to = {`${match.url}/${complaint['id']}`}>
                                                        {complaint['subject']}
                                                    </Link>
                                                </div>

                                                <div className={styles.datetime}>
                                                    <div>
                                                        Date: {complaint['date']}
                                                    </div>

                                                    <div>
                                                        Time: {complaint['time']}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {complaint['username']}
                                            </td>
                                            <td>
                                                {complaint['status']}
                                            </td>
                                        </tr>
                                        <tr className={styles.emptyRow}>
                                            <td></td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={styles.pageBox}>
                    <div className={styles.rows}>
                        <select onChange = {(e)=>handleChange(e)}>
                                <option>Rows per page</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                        </select>  
                    </div> 
                    
                    <div className={styles.page}>
                        {complaints.length ? <PageList total_pages = {total_pages}/> : <div>Loading...</div>}
                    </div>
                </div>
            </div>
            
        )
    }
    else{
        return (
            <div>
                "Loading..."
            </div>
        )
    }

    
}
