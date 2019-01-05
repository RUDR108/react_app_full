import React from 'react'
import {connect} from 'react-redux' 

class HomePage extends React.Component{
    constructor(){
        super()
    }
render(){
    const {email}=this.props.auth
        return(
            <div>
            {email?`You are on HomePage and logged in with Email - ${email}`:'You are not logged in.'}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        auth:state.auth
    }
}

export default connect(mapStateToProps)(HomePage)