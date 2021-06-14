import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Customer from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFouund';
import NavBar from './components/navBar';
import ProductDetailForm from './components/productDetailForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from './components/logout';
import auth from './services/authService'
import ProtectedRote from './components/common/protectedRoute';

class Master extends Component {
    state = {};

    componentDidMount() {
        debugger;
        const user = auth.getCurrentUser();
        this.setState({ user });
    }

    render() { 
        return ( 
            <React.Fragment>
                <ToastContainer />
                <NavBar user = { this.state.user } />
                <main className="container">
                    <Switch>
                        <ProtectedRote path="/products/:Id" component={ProductDetailForm}/>
                        <Route path="/app" 
                            render={props => <App {...props} user={this.state.user} />} 
                        />
                        <Route path="/customers" component={Customer}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Redirect from="/" exact to="/app" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
         );
    }
}
 
export default Master;