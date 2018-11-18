import React from 'react';
import RentalCard from './RentalCards'
import {connect} from 'react-redux'
//import * as actions from 'actions/actions';

class RentalList extends React.Component{
   

    renderRentals(){
        return this.props.rentals.map((rental,index)=>{
            return <RentalCard 
            key={index}
            rental={rental}
            />})
    }

    

    render(){
      return (
        
        <div className='row'>
            {this.renderRentals()}
        </div>
  
      );
  }  
}


export default connect()(RentalList)