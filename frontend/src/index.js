import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Clients from './clients/clients' 
import Client from './client/client'
import Pets from './pets/pets'
import Pet from './pet/pet'
import Users from './users/users'
import User from './user/user'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/clients" component={Clients} />
            <Route path="/client" component={Client} />
            <Route path="/pets" component={Pets} />
            <Route path="/pet" component={Pet} />
            <Route path="/users" component={Users} />
            <Route path="/user" component={User} />
        </Switch>
    </ BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();