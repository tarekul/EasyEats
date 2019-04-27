import React, { Component } from 'react';
import List from '../components/restList';
import axios from 'axios';
import queryString from 'query-string';

class GenerationPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
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


    getOptions = (query) => {
        axios({
            method: 'get',
            url: 'https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=40.7429098&longitude=-73.9418147',
            params: {
                maxResults: 4,
                key: '7qhXzmc-qBs_nON-yV8qSFRDQOJkB9e5UYMVuyik8ySqoilGOlVAvGE7F31YxftS2nEMUkugJUlS7PyM-D0nnUuaxq3BOKUVH0aHZipZHx48RP-X31AVCYz1bX7EXHYx',
                location: '',

            }
        })
    }

    componentDidMount(){
        console.log('location',this.props.location.search)
        const values = queryString.parse(this.props.location.search)
        console.log('lat',values.lat)
        console.log('lon',values.lon)
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