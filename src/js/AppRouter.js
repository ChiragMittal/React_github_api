import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './Components/App';
import Detail_Page from './Components/Detail_Page.react';


export default class AppRouter extends Component {

    render() {
        return (
            <BrowserRouter>
             	<Switch>
                	<Route exact path="/" component={App} />
                    <Route exact path="/users/:id" component={Detail_Page} />
            
                           
            	</Switch>
            </BrowserRouter>
        );
    }
}