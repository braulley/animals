import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Login/Login'
import Client from './Client/Client'
import NotFound from './notFound/notFound'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={Login} />
            <Route path="/client" component={Client} />
            <Route path='*' component={NotFound} />
        </Switch>
    </ BrowserRouter>
    );
  }
}

export default App;
