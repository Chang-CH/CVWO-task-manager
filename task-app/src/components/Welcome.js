import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import task_logo from './tasks.svg'
import category_logo from './categories.svg'

class Welcome extends Component {
    render(){
        return (
        <div>
        <div className="welcome flex-centered">
            <p>Sample text</p>
        </div>
        <div className="full-width flex-inline">
        <Link to="/tasks" className="btn-welcome flex-centered">
            <div className="block-centered">
                <img src={task_logo} width="100" height="100" alt=""/>
                <p>View all tasks</p>
            </div>
        </Link>
        <Link to="/categories" className="btn-welcome flex-centered">
            <div className="block-centered">
                <img src={category_logo} width="100" height="100" alt=""/>
                <p>Find by categories</p>
            </div>
        </Link>
        </div>
        </div>
        )
    }
}

export default Welcome;