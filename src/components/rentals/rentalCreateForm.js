import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from '../../components/shared/form/BwmInput'
import { BwmResError } from '../../components/shared/form/BwmResError' 
import { required , minLength4 } from "../../components/shared/form/validators";
import { BwmTextArea } from '../../components/shared/form/BwmTextArea'
import { BwmSelect } from '../../components/shared/form/BwmSelect'
import { BwmFileUpload } from '../../components/shared/form/BwmFileUpload'
import {BwmCheckBox} from '../../components/shared/form/BwmCheckBox'

const RentalCreateForm = props => {
  const { handleSubmit, pristine, submitting,submitCb,valid,errors,options } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
        <Field
            name="title"
            type="text"
            label="Title"
            placeholder="Title"
            className = "form-control"
            component={BwmInput}
            
        />
       
       <Field
            name="city"
            type="text"
            label="City"
            placeholder="City"
            className = "form-control"
            component={BwmInput}
            
        />
            <Field
            name="street"
            type="text"
            label="Street"
            placeholder="Street"
            className = "form-control"
            component={BwmInput}
            
        />
            <Field
            name="category"
            label="Category"
            placeholder="Select category"
            className = "form-control"
            options={options}
            component={BwmSelect}
            
        />
        <Field
        name="image"
        label="image"
        component={BwmFileUpload}
        />
            <Field
            name="bedrooms"
            type="number"
            label="Bedrooms"
            placeholder="Bedrooms"
            className = "form-control"
            component={BwmInput}
           
        />
            <Field
            name="dailyRate"
            type="dailyRate"
            label="Daily Rate"
            placeholder="Daily Rate"
            className = "form-control"
            symbol='$'
            component={BwmInput}
            
        />
        <Field
        name="shared"
        type="checkbox"
        label="Shared"
        className = "form-control"
        component={BwmCheckBox}
    />
        <Field
        name="description"
        type="text"
        label="Description"
        rows='6'
        placeholder="Write here something ....."
        className = "form-control"
        component={BwmTextArea}
    />
        
        <button className="btn btn-bwm btn-form" type="submit" disabled={!valid || pristine || submitting}>
          Create Rental
        </button>
        <BwmResError errors={errors}/> 
    </form>
  )
}

export default reduxForm({
  form: 'RentalCreateForm',
   initialValue:{shared:false,category:'apartment'} // a unique identifier for this form
})(RentalCreateForm)