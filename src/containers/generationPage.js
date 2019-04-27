import React, { Component } from 'react';
import List from '../components/restList';
import axios from 'axios';
import queryString from 'query-string';

class GenerationPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lat:null,
            lon:null,
            restaurant: [
                {
                    name: '',
                    img_url: '',
                    cuisine: [],
                },
                {
                    name: '',
                    img_url: '',
                    cuisine: [],
                },
                {
                    name: '',
                    img_url: '',
                    cuisine: [],
                }
            ]

        }
    }


    getOptions = () => {
        axios({
            method: 'GET',
            url: `https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${this.state.lat}&longitude=${this.state.lon}`,
            headers:{
               Authorization: 'BEARER 7qhXzmc-qBs_nON-yV8qSFRDQOJkB9e5UYMVuyik8ySqoilGOlVAvGE7F31YxftS2nEMUkugJUlS7PyM-D0nnUuaxq3BOKUVH0aHZipZHx48RP-X31AVCYz1bX7EXHYx'
           }
        })
        .then(res => console.log('res', res.data))
    }

    componentDidMount(){
        const {lat , lon} = this.state
        console.log('location',this.props.location.search)
        const values = queryString.parse(this.props.location.search)
        console.log('lat',values.lat)
        console.log('lon',values.lon)
        this.setState({lat: values.lat, lon: values.lon},()=>{
         this.getOptions()   
        })
        
    }


    render() {
        const { restaurant } = this.state
        return (

            <>
                <form>
                    {
                        restaurant.map((e, i) => {
                            return <List img_url={e.img_url} restaurant={e.restaurant} cuisine={e.cuisine} />
                        })
                    }
                </form>
            </>
        )
    }
}

export default GenerationPage 