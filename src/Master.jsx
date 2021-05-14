import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Customer from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFouund';
import NavBar from './components/navBar';
import ProductsForm from './components/productsForm';
import LoginForm from './components/loginForm';
 import './App.css'

class Master extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <NavBar />
                <main className="container">
                    <Switch>
                        <Route path="/products/:Id" component={ProductsForm} />
                        <Route path="/app" component={App}/>
                        <Route path="/customers" component={Customer}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Route path="/login" component={LoginForm}/>
                        <Redirect from="/" exact to="/app" />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
         );
    }
}
 
export default Master;