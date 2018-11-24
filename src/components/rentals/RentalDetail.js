import React from 'react'
import {connect} from 'react-redux'
import {fetchRentalById} from '../../actions/actions'
import RentalDetailInfo from './rental-detail-info'
import {RentalMap} from './RentalMap'

export class RentalDetail extends React.Component{


   componentWillMount(){
        
      const rentalId=this.props.match.params.id
      this.props.dispatch(fetchRentalById(rentalId))
   }

   render(){
      const rental=this.props.rental;
      if(rental._id){
         return(
            <section id='rentalDetails'>
  <div className='upper-section'>
    <div className='row'>
      <div className='col-md-6'>
        <img src={rental.image} alt=''></img>
      </div>
      <div className='col-md-6'>
            <RentalMap location={`${rental.city}, ${rental.street}`}/>
      </div>
    </div>
  </div>

  <div className='details-section'>
    <div className='row'>
      <div className='col-md-8'>
        <RentalDetailInfo rental={rental}/>
      </div>
      <div className='col-md-4'> BOOKING</div>
    </div>
  </div>
</section>

         )
      }else{
         return(
            <h1>Loading...</h1>
         )
      }
   } 
}

const mapStateToProps=(state)=>{
   return {
      rental:state.rental
   }
}

export default connect(mapStateToProps)(RentalDetail)