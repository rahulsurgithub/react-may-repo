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
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Master extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <ToastContainer />
                <NavBar />
                <main className="container">
                    <Switch>
                        <Route path="/products/:Id" component={ProductDetailForm} />
                        <Route path="/app" component={App}/>
                        <Route path="/customers" component={Customer}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/login" component={LoginForm}/>
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