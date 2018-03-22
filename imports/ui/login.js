import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter , Route } from 'react-router-dom';
import {App} from './App';
import Input from './textinput';
export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state={error:''}
    }
    check(e)
    {
        const that=this;
        em=this.email.state;
        pass=this.password.state;
        if(em.valid)
        {
            Meteor.call('users.check',em.value,pass.value , function(err,res){
                console.log(res);
                if(err||res==false){
                    that.setState({error:'Login Failed'});
                }
                else
                {
                    that.props.history.push('/todo');  
                }
            });
        }
        else
        {
            
            that.setState({error:'Login Failed'});   
        }
        }

    render()
    {
        let {error}=this.state;
        return(
            <div>
             {/* <label  className="label label-primary">Login</label> */}
              <Input type="email" name="email" text="Enter Email" ref={(input)=>this.email=input}/>
              <Input  type="password" name="password" text="Enter password" ref={(input)=>this.password=input}/>
              <input type="button" value="Login" onClick={this.check.bind(this)}/>
              <label  className="label label-default">{error}</label>
            </div>
        );
    } 
}