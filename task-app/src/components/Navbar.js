import React, { Component } from 'react';
import * as Bootstrap from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render(){
        return (
            <div className="full-width">
            <Bootstrap.Navbar expand="lg" className="navbar flex-centered" sticky="top">
            <Bootstrap.Navbar.Brand href="/" className="nav-title">{this.props.text}</Bootstrap.Navbar.Brand>
            <Bootstrap.NavDropdown title="&equiv;" id="nav-drop">
                <Link to={{pathname: "/categories"}}><Bootstrap.NavDropdown.Item>Categories</Bootstrap.NavDropdown.Item></Link>
                <Link to={{pathname: "/tasks"}}><Bootstrap.NavDropdown.Item>Tasks</Bootstrap.NavDropdown.Item></Link>
                <Link to={{pathname: "/tasks/new"}}><Bootstrap.NavDropdown.Item>New task</Bootstrap.NavDropdown.Item></Link>
            </Bootstrap.NavDropdown>
            </Bootstrap.Navbar>
            </div>
        )
    }
}

export default Navbar;