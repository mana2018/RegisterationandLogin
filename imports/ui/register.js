import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Input from './textinput';
import {BrowserRouter , Route } from 'react-router-dom';
import {App} from './App'
export default class Register extends Component{
    constructor(props) {
        super(props);
      this.state={error:''}
        
    }
    saveData(e)
    {
       var that=this;
       if((this.name.state.valid==true)&&(this.password.state.valid==true)&&(this.email.state.valid==true)&&(this.password.state.value==this.confirm.state.value))
       {
        Meteor.call('users.insertData', 
            this.name.state.value,
            this.email.state.value,
            this.password.state.value,
                function(error,res)
                {
                    if(res==false)
                    {
                        that.setState({error:'Invalid Credentials'});
                    }
                    else
                    {
                        that.setState({error:'User Registered'});   
                    }
    
                });
       } 
       else
       {
           this.setState({error:'Invalid Credentials'});
       }   
    }
    handleLogin(e)
    {
        this.props.history.push('/login');
    }
    render()
    {
        var {error}=this.state;
        return(<div>
            <div>
            <label className="label label-default">Registeration</label>
            </div>
            <div>
            <Input type="name" name="name" text="Enter name " ref={(input)=>this.name=input}  />
            {/* <InputError ref="name" /> */}
            </div>
            <div>
            <Input type="email" name="email" text="Enter email address " ref={(input)=>this.email=input}  />
            {/* <InputError ref="email"/> */}
            </div>
            <div>
            <Input type="password" name="password" text="Enter password " ref={(input)=>this.password=input} />
            {/* <InputError ref="pass" /> */}
            </div>
            <div>
            <Input type="password" name="confirm" text="Confirm password "  ref={(input)=>this.confirm=input}  />
            {/* <InputError ref="confirm" /> */}
            </div>
            <div>
            <input type="button" name="Submit" value="Submit" onClick={this.saveData.bind(this)}/>
            </div>
            <div>
            <input type="button" name="Login" value="Login" onClick={this.handleLogin.bind(this)}/>
            </div>
            <div>
            <label id="showerr">{error}</label>
            </div>
            </div>
        );
    }
}
