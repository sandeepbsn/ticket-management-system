import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Registration from './registration/Registration'
import Login from './login/Login'
import Home from './Home'
import RaiseRequest from './raiseRequest/RaiseRequest'
import ViewRequests from './viewRequests/ViewRequests'
import AgentPortal from './agentportal/AgenPortal'
import OneRequest from './onerequest/OneRequest'
import OneComplaint from './onecomplaint/OneComplaint'
import Dashboard from './dashboard/Dashboard'



export default function Routes(){
    return (
        <div>
            <Switch>
                <Route path = "/" exact render = {(props)=><Home {...props}/>}/>
                <Route path = "/agentportal/:complaint_id" render = {(props)=><OneComplaint {...props}/>}/>
                <Route path = "/agentportal" render = {(props)=><AgentPortal {...props}/>}/>
                <Route path = "/dashboard" render = {(props)=><Dashboard {...props}/>}/>
                <Route path = "/viewrequests/:ticket_id" render = {(props)=><OneRequest {...props}/>}/>   
                <Route path = "/viewrequests" render = {(props)=><ViewRequests {...props}/>}/> 
                <Route path = "/raiserequest" render = {(props)=><RaiseRequest {...props}/>}/>              
                <Route path = "/register" render = {(props)=><Registration {...props}/>}/>
                <Route path = "/login" render = {(props)=><Login {...props}/>}/>
                <Route path = "/:token" render = {(props)=><Home {...props}/>}/>
            </Switch>
        </div>
    )
}