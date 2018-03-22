import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import bcrypt from 'bcrypt';
import SimpleSchema from 'simpl-schema';
var Future = Npm.require( 'fibers/future' );
export const Users = new Mongo.Collection('users');
const Schemas = {};
Schemas.User = new SimpleSchema(
    { name: {type: String,
            required:true},
      email: { type:String,
            unique:true,
            required:true},
      password: {type:String,
            required:true,
             min:8}}
);
Users.attachSchema(Schemas.User);
Meteor.methods({
    'users.insertData'(name,email,password) {
        const future=new Future();
        if(password==''){
            Users.insert({
                name,
                email,
                password},
                function (err,res) {
                    if(err)
                    {
                        future.throw(err);
                    }
                    else
                    {
                        future.return(true);
                    }
                }
              );
        }
        else{
            bcrypt.hash(password, 10)
            .then(function(hash) {
                Users.insert({
                    name,
                    email,
                    password:hash},
                    function (err,res) {
                        if(err)
                        {
                            future.throw(err);
                        }
                        else
                        {
                            future.return(true);
                        }
                    }
                  );
            });
        }
        return future.wait();
    }
,
    'users.check'(email,pass){
        console.log(email,pass);
        const future2=new Future();
        if (Users.find({email:email}).fetch())
        {
            var password=Users.findOne({email:email}).password;
            if(bcrypt.compareSync(pass, password))
            {
                future2.return(true);
            }    
            else
                future2.throw('Wrong password');                         
        }
        else
        {
            future2.throw('Email does not exist');
        }   
        return future2.wait(); 
    }
});
