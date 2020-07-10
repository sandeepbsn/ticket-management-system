import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getDateTickets, getStatusTickets} from '../../redux/customerReducer/actions'
import {Line, Pie} from 'react-chartjs-2'
import styles from './Dashboard.module.css'


export default function Dashboard(){
    const dispatch = useDispatch()
    const [date, setDate] = useState()
    const [tickets, setTickets] = useState()
    const dategraph = useSelector(state => state.customer.dategraph)
    const statusgraph = useSelector(state => state.customer.statusgraph)
    const userInfo = useSelector(state => state.login.userInfo)

    useEffect(()=>{
        const fetchDate = async()=>{
            const date_date = await dispatch(getDateTickets(userInfo['id']))
            const status_data = await dispatch(getStatusTickets(userInfo['id']))
        }
        fetchDate()
    },[dispatch, userInfo])

    let temp_date
    let temp_tickets
    if(dategraph){
        temp_date = dategraph.map(elem => elem.date)
        temp_tickets = dategraph.map(elem => elem.tickets)
    }

    let temp_status
    let temp_count
    if(statusgraph){
        temp_status = statusgraph.map(elem => elem.status)
        temp_count = statusgraph.map(elem => elem.count)
    }
    
    if(dategraph){
        return(
            <div>
                <div className={styles.dategraph}>
                    <div>
                        Tickets received everyday
                    </div>
                    <div>
                        <Line data = {
                            {
                            labels:temp_date,
                            datasets:[{
                                label:"No. of Tickets",
                                backgroundColor:'rgba(0,0,255,0.5)',
                                data:temp_tickets
                            }]
                            }
                        }/>
                    </div>
                </div>

                <div className={styles.dategraph}>
                    <div>
                        Status of the ticket
                    </div>
                    <div>
                        <Pie data = {
                                {
                                labels:temp_status,
                                datasets:[{
                                    label:"No. of Tickets",
                                    backgroundColor:['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)'],
                                    data:temp_count
                                }]
                                }
                            }
                            options = {{
                                cutoutPercentage: 50,
                                // circumference: Math.PI,
                                legend: {
                                    position: 'bottom'
                                },
                                animation: {
                                    animateRotate: true,
                                    animateScale: false
                                }
                            }}
                        />
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