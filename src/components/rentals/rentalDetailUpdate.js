import React from 'react';
import RentalAsset from './rental-assets'
import {rentalTypes,toUpperCase} from 'helpers'
import {EditableInput} from '../shared/editable/EditableInput'
import * as actions from 'actions/actions'
import {EditableText} from '../shared/editable/editableText'
import {EditableSelect} from '../shared/editable/editableSelect'
import {toast} from 'react-toastify'

export class RentalDetailUpdate extends React.Component{
    
    constructor(){
        super()

        this.updateRental = this.updateRental.bind(this)
        this.resetRentalError=this.resetRentalError.bind(this)
    }

    updateRental(rentalData){
        const {rental:{_id},dispatch,errors} = this.props
        dispatch(actions.updateRental(rentalData,_id))
    }

    resetRentalError(){
        this.props.dispatch(actions.resetRentalErrors())
    }

    render(){


        const {rental,errors}=this.props; 
        
        if(errors && errors.length>0){
            toast.error(errors[0].detail)
        }

        return(
            <div className='rental'>
                    
                    <label className={`retnal-label rental-type ${rental.category}`}>Shared</label>
                    <EditableSelect entity={rental}
                                    entityField={'shared'}
                                    className={`rental-type ${rental.category}`}
                                    updateEntity={this.updateRental}
                                    options={[true, false]}
                                    containerStyle={{'display': 'inline-block'}}
                                    errors={errors}
                                    resetErrors={this.resetRentalErrors} />        
                                                
                    <EditableSelect entity={rental} 
                                    entityField={'category'} 
                                    className={`rental-type ${rental.category}`}
                                    updateEntity={this.updateRental}  
                                    options={['apartmant','house','condo']}
                                    errors={errors}
                                    resetErrors={this.resetRentalError}
                                    />
                   
                <div className='rental-owner'>
                  <img src='https://api.adorable.io/avatars/285/abott@adorable.png' alt='owner'/>
                  <span>{rental.user && rental.user.username}</span>
                  </div>
                    <EditableInput entity={rental} 
                                 entityField={'title'} 
                                 className={'rental-title'}
                                 updateEntity={this.updateRental}
                                 errors={errors}  
                                 resetErrors={this.resetRentalError}

                                 />
                    
                    <EditableInput entity={rental} 
                                 entityField={'city'} 
                                 className={'rental-city'}
                                 updateEntity={this.updateRental}
                                 errors={errors}  
                                 resetErrors={this.resetRentalError}
                                 formatPipe={[toUpperCase,]}
                                 />                
                    <EditableInput entity={rental} 
                                 entityField={'street'} 
                                 className={'rental-street'}
                                 updateEntity={this.updateRental}  
                                 errors={errors}
                                 resetErrors={this.resetRentalError}
                                 /> 
                  <div className='rental-room-info'>
                    <span><i className='fa fa-building'></i>
                    
                    <EditableInput entity={rental} 
                                 entityField={'bedrooms'} 
                                 className={'rental-bedrooms'}
                                 containerStyle={{'display':'inline-block'}}
                                 updateEntity={this.updateRental}  
                                 errors={errors}
                                 resetErrors={this.resetRentalError}
                                 /> bedrooms</span>

                    <span><i className='fa fa-user'></i> {rental.bedrooms + 4} guests</span>
                    <span><i className='fa fa-bed'></i> {rental.bedrooms + 2} beds</span>
                  </div>
  
                  <EditableText entity={rental} 
                                entityField={'description'} 
                                className={'rental-description'}
                                updateEntity={this.updateRental} 
                                rows={6}
                                cols={50} 
                                errors={errors}
                                resetErrors={this.resetRentalError}
                  /> 
  
                  <hr></hr>
                  <RentalAsset />
                </div>
        );
    }
}