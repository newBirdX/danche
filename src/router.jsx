import React, { Component } from 'react'
import { HashRouter as Routers,Route,Link ,Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login/login'
import Admin from './admin'
import Button from './pages/ui/button'
import NoMatch from './pages/nomatch'
export default class Router extends Component {
    render() {
        return (
            <Routers>
                <App>
                <Route path="/login" component={Login}/>
                <Route path="/admin" render={()=>{
                    return(
                        <Admin>
                        <Route path="/admin/ui/buttons"  component={Button} />
                        <Route component={NoMatch} />
                    </Admin>
                    )
                }}/>
                </App>
            </Routers>
        )
    }
}
