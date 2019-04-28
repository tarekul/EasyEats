import React from 'react';
import '../components/infoform.css'
import logo from '../components/logo.jpg';


class InfoForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            states:['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
            address: null,
            city: null,
            state: null,
            zip: null,
        }
    }
    handleChange=(e)=>{
        console.log(e.target.value)
    }
    handleOnClick=()=>{
        //console.log(this.state)
        const {address,city,zip,state} = this.state
     this.props.history.push(`/genpoll?address=${address},${city},${state} ${zip}`)
    }
    handleInputChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        const {states}=this.state
        return (
            <>
            <form>
             <div className='image'>
                <img src={logo}/>
            </div>
            <div className = 'col-5 '>
            <div className="form-group">
                <label for="inputAddress">Address</label>
                <input type="text"  onChange={e=>this.handleInputChange(e)} name="address" className="form-control" id="validationCustom01" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" onChange={e=>this.handleInputChange(e)} name="city" className="form-control" id="inputCity" />
                </div>
                <div className="form-group col-md-4">
                <label for="inputState">State</label>
                <select onChange={this.handleChange} id="inputState" onChange={e=>this.handleInputChange(e)} name="state" class="form-control">
                    <option selected>Choose...</option>
                    {
                        states.map((e,i)=>{
                            return(<option key={i} value={e}>{e}</option>)
                        })
                    }
                </select>
                </div>
                <div className="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" onChange={e=>this.handleInputChange(e)} name="zip" className="form-control" id="inputZip" />
                </div>
            </div>
            <button type="submit" className="btn btn-info" onClick={this.handleOnClick}>Enter</button>
             </div>
            </form>
            </>
        )
    }
}

export default InfoForm;