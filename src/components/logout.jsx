import React, { Component } from 'react';
import auth from '../services/authService';

class Logout extends Component {
    state = {  }
    componentDidMount() {
        auth.logout();

        // redirect to home page
        window.location = "/";
    }
    render() { 
        return  null;
    }
}
 
export default Logout;