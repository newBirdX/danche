import React, { Component } from 'react'
import { HashRouter as Routers,Route ,Switch,Redirect} from 'react-router-dom'
import App from './App'
import Home from './components/home'
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
import HeightTable from './pages/table/heighTable'
import City from './pages/city'
import Order from './pages/order'
import User from './pages/user'
import BikeMap from './pages/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import Rich from './pages/rich'
import Permission from './pages/permission'
//common页面
import Common from './common'
import Detail from './pages/order/detail'
export default class Router extends Component {
    render() {
        return (
            <Routers>
                <App>
                <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/common" render={()=>{
                    return (
                        <Common>
                            <Route exact path="/common/order/detail/:orderId" component={Detail}/>
                        </Common>
                    )
                }}>
                </Route>
                <Route path="/" render={()=>{
                    return(
                        <Admin>
                        <Route path="/home"  component={Home} />
                        <Route path="/ui/buttons"  component={Buttons} />
                        <Route path="/ui/gallery"  component={Gallery} />
                        <Route path="/ui/modals"  component={Modals} />
                        <Route path="/ui/loadings"  component={Loadings} />    
                        <Route path="/ui/notification"  component={Notice} />
                        <Route path="/ui/messages"  component={Messages} />
                        <Route path="/ui/tabs"  component={Tabs} />
                        <Route path="/ui/carousel"  component={Carousel} />
                        <Route path="/form/login"  component={Login1} />
                        <Route path="/form/reg"  component={Register} />
                        <Route path="/table/basic"  component={Basic} />
                        <Route path="/table/high"  component={HeightTable} />
                        <Route path="/city"  component={City} />
                        <Route path="/order"  component={Order} />
                        <Route path="/user"  component={User} />
                        <Route path="/bikeMap"  component={BikeMap} />
                        <Route path="/charts/bar"  component={Bar} />
                        <Route path="/charts/pie"  component={Pie} />
                        <Route path="/charts/line"  component={Line} />
                        <Route path="/rich"  component={Rich} />
                        <Route path="/permission"  component={Permission} />
                        {/* <Redirect to="/home" /> */}
                        {/* <Route component={NoMatch} /> */}
                    </Admin>
                    )
                }}/>
                </Switch>
                </App>
            </Routers>
        )
    }
}
