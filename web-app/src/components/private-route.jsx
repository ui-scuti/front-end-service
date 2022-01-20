import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import WrapLayout from './wrap-layout';

export const PrivateRoute = ({ component: Component, route, routeProps, userLoggedIn, ...rest }) => {

    return (<Route
        {...rest}
        render={props =>
            userLoggedIn ? <WrapLayout component={Component} renderProps={props} routeProps={routeProps} route={route} /> : <Redirect to={"/login"} />
        }
    />);
};