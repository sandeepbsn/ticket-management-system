import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchRequests, changeRowsPerPage, clearResponses} from '../../redux/customerReducer/actions'
import {v4 as uuidv4} from 'uuid'
import styles from './ViewRequests.module.css'
import CustomPagination from './CustomPagination'
import PageList from './PageList'
import {useRouteMatch, Link} from 'react-router-dom'



export default function ViewRequests(){
    const requests = useSelector(state => state.customer.requests)
    const userInfo = useSelector(state => state.login.userInfo)
    const dispatch = useDispatch()
    const activePage = useSelector(state => state.customer.page_no)
    const rows_per_page = useSelector(state => state.customer.rows_per_page)
    const match = useRouteMatch()

    const headers = ['ID', 'Subject', 'Company', 'Date', 'Response']

    useEffect(()=>{
        if(requests.length === 0){
            dispatch(fetchRequests(userInfo['id']))
            dispatch(clearResponses())
        }
    },[userInfo, dispatch, requests])
    let low
    let high
    let total_pages
    if(requests.length){
        const response = CustomPagination(requests.length, activePage, rows_per_page)
        low = response['low']
        high = response['high']
        total_pages = response['total_pages']
    }
    
    const handleChange = (e) => {
        if(e.target.value === 'Rows per page'){
            return
        }
        else{
            dispatch(changeRowsPerPage(Number(e.target.value)))
        }
    }
    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            {headers.map(header => <td key = {uuidv4()}>{header}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length ? 
                        requests.slice(low,high).map(request => {
                            return (
                                <React.Fragment key = {uuidv4()}>
                                    <tr className={styles.bodyRow}>
                                        <td className="p-3">{request.id}</td>
                                        <td>{request.subject}</td>
                                        <td>{request.company}</td>
                                        <td>{request.date}</td>
                                        <td>
                                            <Link to = {`${match.url}/${request.id}`}>
                                                View reply
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className={styles.emptyRow}>
                                        <td></td>
                                    </tr>
                                </React.Fragment>
                            )
                        }):
                        <tr key = {uuidv4()}>
                            <td>Loading...</td>    
                        </tr>}
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
                    {requests.length ? <PageList total_pages = {total_pages}/> : <div>Loading...</div>}
                </div>
            </div>
        </div>
    )
}