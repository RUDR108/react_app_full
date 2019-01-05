import React from 'react'
import {MapWithGeocode} from '../../components/map/googleMap'
import {connect} from 'react-redux'
import * as actions from 'actions/actions'

export class RentalMap extends React.Component{
  
 reloadMapFinish(){
   this.props.dispatch(actions.reloadMapFinish())
  }

   render(){

      const {location,map:{isReloading}} = this.props

       return(
        <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDGfT013fk9_g3zVUZ36c0tHRvQA9XoAPo&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
        isReloading={isReloading}
        mapLoaded={()=>this.reloadMapFinish()}
        />
       );
   } 
}

function mapStateToProps(state){
   return {
      map:state.map
   }   
}

export default connect(mapStateToProps)(RentalMap)
