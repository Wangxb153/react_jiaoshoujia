import React, {Component} from 'react'

import Nav from './component/Nav/index'
import getRouter from './router/router'

export default class App extends Component {
    render() {
        return (
            <div>
                <Nav/>
                {getRouter()}
            </div>
        )
    }
}