import React, { Component } from 'react';
import * as Bootstrap from 'react-bootstrap'

class Navbar extends Component {
    render(){
        return (
            <div className="full-width">
            <Bootstrap.Navbar expand="lg" className="navbar flex-centered" sticky="top">
            <Bootstrap.Navbar.Brand href="/" className="nav-title">{this.props.text}</Bootstrap.Navbar.Brand>
            <Bootstrap.NavDropdown title="&equiv;" id="nav-drop">
                <Bootstrap.NavDropdown.Item href="/categories">Categories</Bootstrap.NavDropdown.Item>
                <Bootstrap.NavDropdown.Item href="/tasks">Tasks</Bootstrap.NavDropdown.Item>
                <Bootstrap.NavDropdown.Item href="/tasks/new">New task</Bootstrap.NavDropdown.Item>
            </Bootstrap.NavDropdown>
            </Bootstrap.Navbar>
            </div>
        )
    }
}

export default Navbar;