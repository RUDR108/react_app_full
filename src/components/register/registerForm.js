import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {BwmInput} from '../../components/shared/form/BwmInput';
import {BwmResError} from '../../components/shared/form/BwmResError'

const RegisterForm = props => {
  const { handleSubmit, pristine, reset, submitting,submitCb,valid,errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
          
          <Field 
            name="username"
            type="text"
            label="Username"
            placeholder="Your Full name"
            className = "form-control"
            component={BwmInput}
          />
    
          <Field
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            className = "form-control"
            component={BwmInput}
          />
       
          <Field
            name="password"
            type="password"
            label="Password"
            placeholder="password"
            className = "form-control"
            component={BwmInput}
          />
       
          <Field
            name="passwordConfirmation"
            type="password"
            label="Password Confirmation"
            placeholder="passwordConfirmation"
            className = "form-control"
            component={BwmInput}
          />
       
      <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
          Register
        </button>
      <BwmResError errors={errors}/>
    </form>
  )
}

const validate = values => {
  const errors = {};
  
  if(values.username && values.username.length<3){
    errors.username="Atleast 3 character for username."
  }

  if(!values.email){
    errors.email="Please enter email."
  }

  if(!values.passwordConfirmation){
    errors.passwordConfirmation="Please enter password confirmation."
  }

  if(values.password !== values.passwordConfirmation){
    errors.password="Both password must be same."
  }

  return errors;
}

export default reduxForm({
  form: 'registerForm',
  validate // a unique identifier for this form
})(RegisterForm)