import React, { Component } from 'react';
import auth from '../../services/authService';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRote = ({path, component: Component, render, ...rest}) => {
    return (                 
        <Route 
        {...rest}
        render={props => {
            console.log("inside render protected routes");
            console.log(props);
            if(!auth.getCurrentUser()) return <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
            return Component ? <Component {...props} /> : render(props);
        }}
        />
    );
};
 
export default ProtectedRote;