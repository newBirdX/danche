import React, { Component } from 'react'

export default class App extends Component {
    render() {
        // console.log("props",this.props)
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
