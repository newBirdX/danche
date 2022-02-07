import React, { Component } from 'react'
import { HashRouter as Routers,Route,Link ,Switch} from 'react-router-dom'
import App from './App'
import Login from './pages/login/login'
import Admin from './admin'
import Buttons from './pages/ui/button'
import Gallery from './pages/ui/gallery'
import Modals from './pages/ui/modal'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Carousel from './pages/ui/carousel'
import Login1 from './pages/form/login'
import Register from './pages/form/register'
import NoMatch from './pages/nomatch'
import Basic from './pages/table/basic'
export default class Router extends Component {
    render() {
        return (
            <Routers>
                <App>
                <Route path="/login" component={Login}/>
                <Route path="/admin" render={()=>{
                    return(
                        <Admin>
                        <Route path="/admin/ui/buttons"  component={Buttons} />
                        <Route path="/admin/ui/gallery"  component={Gallery} />
                        <Route path="/admin/ui/modals"  component={Modals} />
                        <Route path="/admin/ui/loadings"  component={Loadings} />    
                        <Route path="/admin/ui/notification"  component={Notice} />
                        <Route path="/admin/ui/messages"  component={Messages} />
                        <Route path="/admin/ui/tabs"  component={Tabs} />
                        <Route path="/admin/ui/carousel"  component={Carousel} />
                        <Route path="/admin/form/login"  component={Login1} />
                        <Route path="/admin/form/reg"  component={Register} />
                        <Route path="/admin/table/basic"  component={Basic} />
                        <Route component={NoMatch} />
                    </Admin>
                    )
                }}/>
                </App>
            </Routers>
        )
    }
}
