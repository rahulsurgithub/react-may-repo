import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from "react-bootstrap";

class NavBar extends Component {
    state = {  }
    render() { 
        const { user } = this.props;
        return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/app">
                Bazaar
                {/* <span><img src="/%PUBLIC_URL%/logo192.png" alt="" /></span>  */}
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Nav.Link as={NavLink} className="nav-item nav-link" to="/app">
                        Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} className="nav-item nav-link" to="/customers">
                        Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} className="nav-item nav-link" to="/rentals">
                        Rentals
                    </Nav.Link>
                    {!user && 
                        <React.Fragment>
                            <Nav.Link as={NavLink} className="nav-item nav-link" to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={NavLink} className="nav-item nav-link" to="/register">
                                Register
                            </Nav.Link>
                        </React.Fragment>
                    }
                    {user && 
                        <React.Fragment>
                            <Nav.Link as={NavLink} className="nav-item nav-link" to="/profile">
                                {user.name}
                            </Nav.Link>
                            <Nav.Link as={NavLink} className="nav-item nav-link" to="/logout">
                                Logout
                            </Nav.Link>
                        </React.Fragment>
                    }
                </div>
            </div>
        </nav>
        );
    }
}
 
export default NavBar;