import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Register from './register';
import Login from './login';
import App2 from './app2';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import {browserHistory} from 'react-router-dom';
export default class App extends Component{
    
    render(){
        return(
            <div>
            <BrowserRouter history={browserHistory}>
            <Switch>
                <Route exact path="/" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/todo" component={App2}/>
             </Switch>
            </BrowserRouter>
            </div>
    );
}
}