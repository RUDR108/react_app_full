import React from 'react';
import {Cacher} from '../../services/Cacher'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    InfoWindow,
    Circle
  } from "react-google-maps";

  const MapComponent=(props)=>{
    
    const {coordinates,isError,isLocationLoaded}=props;

    return(
        <GoogleMap
        defaultZoom={13}
        defaultCenter={coordinates}
        center={coordinates}
        options={{disableDefaultUI:isError?true:false}}
      >
        {isLocationLoaded && !isError && <Circle center={coordinates} radius={50}/>}
        {isLocationLoaded && isError && 
          <InfoWindow position={coordinates} options={{maxWidth:3000}}>
          <div>
            Sorry,we are unable to find location.We are trying to
            resolve problem as soon as possible.check on host for 
            additional information.
          </div>
        </InfoWindow>}
        </GoogleMap>
      );
    }

  const withGeocode=(WrappedComponent)=>{
    return class extends React.Component{
      constructor(props){
        super(props)

        this.cacher = new Cacher();
        this.state={
          coordinates:{
            lat:0,
             lng:0
          },
          isError:false,
          isLocationLoaded:false
        }
      }

      componentWillMount(){
        this.getGeocodedLocation()
      }

      geocodeLocation(location){
        const geocoder = new window.google.maps.Geocoder();
     
        return new Promise((resolve,reject)=>{
          geocoder.geocode({address:location},(result,status)=>{
            if(status==='OK'){
              const geometry = result[0].geometry.loaction;
              const coordinates = { lat:geometry.lat(),lng:geometry.lng()}
             //caching value
              this.cacher.cacheValue(location,coordinates)
           resolve(coordinates);
            }else{
              reject('Error!!!');
            }
          })
        })

      }

      getGeocodedLocation(){
        
        const location=this.props.location;
        
        if(this.cacher.isValueCached(location)){
          const coordinates=this.cacher.getCachedValue(location)  
          //console.log(coordinates)
          this.setState({
              coordinates,
              isLocationLoaded:true
            })
        }else{
          this.geocodeLocation(location).then((coordinates)=>{
            this.setState({
              coordinates,
              isLocationLoaded:true
            })
          },(error)=>{
            this.setState({
              isError:true,
              isLocationLoaded:true
            })
          })
        }
      }
      render(){
       
        return(
          <WrappedComponent {...this.state}/>
        )
      }
    }
  }
  
  export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));
  
