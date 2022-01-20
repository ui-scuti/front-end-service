import * as request from './services/request';

import { ActionTypes, StorageKeys } from './constants';
import { GlobalStyles, Themes } from './theme';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

import { LocalStorage } from './services';
import { PrivateRoute } from './components/private-route';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';
import { routes } from './config/routes';
import { useToasts } from 'react-toast-notifications';

import Login from './pages/login/login';
import './App.css';

const App = (props) => {
  const { addToast } = useToasts();
  const [requesting, setRequesting] = useState(true);
  const [loading, setLoading] = useState(false);
  axios.interceptors.request.use(async (config) => {
    const token = LocalStorage.getFromLocalStorage(StorageKeys.LOGIN_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  })

  axios.interceptors.response.use(async (config) => {
    if (config.data && config.data.errors) {
      console.error(config.data.errors);
      let msg = 'Unprecedented error occured';
      msg = config.data && config.data.errors.length && config.data.errors[0].description && config.data.errors[0].description.message ? config.data.errors[0].description.message : msg;
      addToast(msg, {
        appearance: 'error',
        autoDismiss: true
      });
      return Promise.reject(config.data.error);
    }
    if (config.data && config.data.name === "error") {
      console.error(config.data.message);
      addToast(config.data.message, {
        appearance: 'error',
        autoDismiss: true
      });
      return Promise.reject(config.data.message);
    }
    return config;
  }, function (error) {
    if (error && error.response && error.response.status === 403 && error.config.headers.Authorization) {
      props.logoutSuccess();
      props.themeClear();
      addToast('Your session has been expired', {
        appearance: 'error',
        autoDismiss: true
      });
      request.cancelAll();

    }
    if (error && error.response && error.response.status === 400) {
      addToast(error.response.data.message, {
        appearance: 'error',
        autoDismiss: true
      });
      request.cancelAll();
    }

    return Promise.reject(error)
  })



  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      placement="bottom-center"
    >
      <ThemeProvider theme={props.theme}>
        <GlobalStyles />
        <Router>
          {loading ? (<></>) : (
            <Switch>
              <Route exact
                path={"/"}
                render={() => (props.user.isAuthenticated ? <Redirect to={"/home"} /> : <Redirect to={"/login"} />)}
              />

              <Route
                path={"/login"}
                render={() => (props.user.isAuthenticated ? <Redirect to={"/home"} /> : <Login />)}
              />


              {
                routes().map(
                  (route, index) =>
                    <PrivateRoute {...route}
                      route={route}
                      routeProps={routes}
                      userLoggedIn={props.user.isAuthenticated}
                      component={route.component}
                      key={'private-route-' + index}
                    />
                )
              }

            </Switch>
          )}

        </Router>
      </ThemeProvider>
    </ToastProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    theme: state.themeReducer.theme
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutSuccess: () => dispatch({ type: ActionTypes.LOGOUT_SUCCESS }),
    themeClear: () => dispatch({ type: ActionTypes.THEME_CLEARED })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
