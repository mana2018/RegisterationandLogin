
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Users } from './users';
if (Meteor.isServer) {
    var id;
    var em1;
    var email;
    describe('Users', () => {
        describe('methods to register', () => {
            const userName = 'Mana';
            var password='hello';
            before(()=>{
                Users.remove({});
                console.log(Users.find().count());
            });
            beforeEach(() => {
                id=Random.id();
                email=id+'@yahoo.in';
            });
            it('Successfully register', () => {
                em1=email;
                // const insertUser = Meteor.server.method_handlers['users.insertData'];
                Meteor.call('users.insertData',userName, email,password,function(err,res){
                    if(err)
                    {
                        console.log("not working");
                    }
                    if(res)
                    {
                        console.log("working");
                    }
                });
        
                assert.equal(Users.find().count(), 1);
            });
            it('Failed to register', () => {
            
                Meteor.call('users.insertData',userName, '',password);
                assert.equal(Users.find().count(), 1);
            });
            it('Failed to register', () => {
                
                Meteor.call('users.insertData',userName, email,'')
                assert.equal(Users.find().count(), 1);
            });
            it('Failed to register()', () => {
                
                Meteor.call('users.insertData','', email,password);
                assert.equal(Users.find().count(), 1);
            });
            it('Failed to register', () => {
        
                Meteor.call('users.insertData',userName, em1,password);
                assert.equal(Users.find().count(), 1);
            });
        });
        describe('methods for login', () => {    
            var password='hello';
            beforeEach(() => {
                id=Random.id();
                email=id+'@yahoo.in';
            });
            it('Successful login ', () => {
                Meteor.call('users.check',em1,password);
            });
            it('Unsuccessful login(Email doesnot exist) ', () => {
                Meteor.call('users.check',email,password)
            });
            it('Unsuccessful login(Wrong password) ', () => {
                Meteor.call('users.check',em1,"wrong")
            });
        });
    });
}