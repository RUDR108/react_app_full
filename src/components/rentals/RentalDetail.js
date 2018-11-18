import React from 'react'
import {connect} from 'react-redux'
import {fetchRentalById} from '../../actions/actions'

export class RentalDetail extends React.Component{


   componentWillMount(){
        
      const rentalId=this.props.match.params.id
      this.props.dispatch(fetchRentalById(rentalId))
   }

   render(){
      //console.log(this.props)
       return(
         <div>This is {this.props.rental.id}</div>
       );
   } 
}

const mapStateToProps=(state)=>{
   return {
      rental:state.rental
   }
}

export default connect(mapStateToProps)(RentalDetail)