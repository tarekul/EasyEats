import React from 'react';
import '../components/infoform.css'

import Sky from 'react-sky';

import InputField from '../components/InputField'



class InfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
            address: null,
            city: null,
            state: null,
            zip: null,
        }
    }
    handleChange = (e) => {
        console.log(e.target.value)
    }
    handleOnClick = () => {
        //console.log(this.state)
        const { address, city, zip, state } = this.state
        this.props.history.push(`/genpoll?address=${address},${city},${state} ${zip}`)
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        const { states } = this.state
        return (
            <>
                <Sky
                    images={{

                        0: "https://image.flaticon.com/icons/svg/1076/1076323.svg",
                        1: "https://image.flaticon.com/icons/svg/1585/1585289.svg",
                        2: "https://image.flaticon.com/icons/svg/1594/1594208.svg",



                    }}
                    how={130}
                    time={25}
                    size={'90px'}
                    background={'white'}
                />
                
                <InputField handleInputChange={this.handleInputChange} handleOnClick={this.handleOnClick} states={states} />
            </>
        )
    }
}

export default InfoForm;