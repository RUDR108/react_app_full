import React from 'react';
import RentalCard from './RentalCards'
import {connect} from 'react-redux'
import * as actions from '../../actions/actions';

class RentalList extends React.Component{
    
    componentDidMount(){
     this.props.dispatch(actions.fetchRentals())   
    }

    renderRentals(){
        return this.props.rentals.map((rental,index)=>{
            return <RentalCard 
            key={index}
            rental={rental}
            />})
    }

    

    render(){
      return (
        <section id='rentalListing'>
        <h1 className='page-title'>Your Home All Around the World</h1>
        <div className='row'>
            {this.renderRentals()}
        </div>
      </section>
      );
  }  
}

const mapStateToProps=(state)=>{
return{
    rentals:state.rentals
}
}

export default connect(mapStateToProps)(RentalList)