import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import {changeAgentPage} from '../../redux/customerReducer/actions'
import styles from './AgentPortal.module.css'


export default function PageList({total_pages}){
    const dispatch = useDispatch()
    const activePage = useSelector(state => state.customer.agent_page)
    const rows_per_page = useSelector(state => state.customer.agent_rows)

    let pages = []

    for(let i = activePage - 1; i >= 0 && i<=activePage+3 && i < total_pages; i++){
        if(i === activePage){
            pages.push(<button className = {styles.activepage} key={uuidv4()} onClick={()=>dispatch(changeAgentPage(i))}>{i}</button>)
            continue
        }
        if(i === activePage - 1){
            if(i !== 0){
                pages.push(<button key={uuidv4()} onClick={()=>dispatch(changeAgentPage(activePage - 1))}>Previous</button>)
            }
            continue
        }
        if (i === activePage + 3){
            pages.push(<button key={uuidv4()} onClick={()=>dispatch(changeAgentPage(activePage + 1))}>Next</button>)
            continue
        }
        pages.push(<button key={uuidv4()} onClick={()=>dispatch(changeAgentPage(i))}>{i}</button>)

    }
    
    if(pages.length){
        return (
            pages.map(page=><div key = {uuidv4()} className="d-flex">{page}</div>)
        )
    }
    else{
        return (
            <div>Loading...</div>
        )
    }
}