import React from 'react'
import {EditableComponent} from './editableComponent' 

export class EditableText extends EditableComponent{
renderComponentView(){
        const {value,isActive} = this.state
        const {className,rows,cols} = this.props

        if(isActive){
            return (
               <React.Fragment>
               <textarea onChange={(event)=>this.handleChange(event)} rows={rows} cols={cols} value={value} className={className}></textarea>
               <button onClick={()=>this.disableEdit()} className="btn btn-warning btn-editable" type="button">Close</button>
               <button onClick={()=>this.update()} className="btn btn-success btn-editable" type="button">save</button>
               </React.Fragment>
            )
        }
        return(
            <React.Fragment>
            <span className={className}>{value}</span>
            <button onClick={()=>this.enableEdit()} className="btn btn-warning btn-editabe" type="button">Edit</button>
            </React.Fragment>
        ) 
    }

    
    render(){
        return(
            <div className="editableComponent" style={this.props.containerStyle}>
            {this.renderComponentView()}
            </div>
        )
    }
}