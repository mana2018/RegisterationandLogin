import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
export default class Input extends Component{
    constructor(props) {
        super(props);
         this.handleChange=this.handleChange.bind(this);
        this.state={value:this.props.value, valid:'False' , errormess:'Input is Invalid', vis:'True'};
        let checkpass='';
        };
    handleChange(event){
        let valid = false;
        
        const { refs } = this;
        const { name, type } = this.props;
        
        if(type == 'email') {
            valid = this.validateEmail(refs[name].value);
        }
        else if(type == 'name') {
            valid = this.validateName(refs[name].value);
        }
        else if( !type || type == 'text' || type == 'password' && name=='password' ) {
            valid = true;
            checkpass=refs[name].value;

        }
        else if(name == 'confirm'&&type == 'password') {
            valid = this.validateConfirmPassword(refs[name].value,checkpass);
        }
        this.validation(refs[name].value, valid);
    }
    onBlur() {
        this.refs[this.props.name].focus();
        this.handleChange();
        return;
    }
    validation (value, valid) {
        let that = this;
  
        //The valid variable is optional, and true if not passed in:
        if (typeof valid === 'undefined') {
            valid = true;
        }
        
        let message = '';
        let errorVisible = false;
        if (!value ) {
            message       =  'Required';
            valid         = false;
            errorVisible  = true;
  
        } else if (!valid) {
            message       = 'Please enter a valid value';
            valid         = false;
            errorVisible  = true;
  
        } 
        this.setState({
            errormess : message,
            value,
            valid,          
            vis:errorVisible 
        }, function() {
            if(this.props.handleChange) {
                this.props.handleChange();
            }
        });
    }
    validateEmail(value) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }
  
    validateName(value) {
        let re=/^[a-zA-Z][a-zA-Z0-9. _]*$/;
        return re.test(value);
    }
    validateConfirmPassword(password,confirmPassword){
        if(password == confirmPassword)
            {
            return true;
            }
        else{
            return false;
        }
    }
    render()
    {
        const { props, state }                      = this;
        const { name, text }    = props;
        let { type }                                = props;
        const { value, vis, errormess } = state;
  
        const isAllowedTypes = ['text', 'email', 'password','name'];
        
        const isValidType    = (isAllowedTypes.indexOf(type) > -1);
        type                 = isValidType ? type : 'text';
        return(<div>
            <input
                  type        = { type }  
                  name        = { name } 
                  ref         = { name }
                  id          = { name } 
                  className   = { "form-control input " } 
                  placeholder = { text }
                  onChange    = { this.handleChange } 
                  onBlur      = { this.handleChange }
                  defaultValue= { value }
                />
                  {errormess}
              {/* <InputError 
                  visible      = { vis } 
                  errorMessage = { errormess }
                /> */}
                
        </div>
        
        );
    }
}
Input.propTypes={
    name:PropTypes.string.isRequired
};
