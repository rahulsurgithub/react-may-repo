import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Customer from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFouund';

class Master extends Component {
    render() { 
        return ( 
            <main className="container">
                <Switch>
                    <Route path="/app" component={App}/>
                    <Route path="/customers" component={Customer}/>
                    <Route path="/rentals" component={Rentals}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect from="/" exact to="/app" />
                    <Redirect to="/not-found" />
                </Switch>
            </main>
         );
    }
}
 
export default Master;