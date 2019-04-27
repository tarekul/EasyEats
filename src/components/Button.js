import React from 'react'
import {withRouter} from 'react-router-dom'


const Button = (props) =>{
    const {goTo,value, handleOnClick} = props  //goTo is the url to go to and value is the value of the button
    return <button type="button" className="btn btn-primary" onClick={e=>{
        if(value === 'My Location') handleOnClick()
        props.history.push(goTo)}
    }>{value}</button>
}

export default withRouter(Button)