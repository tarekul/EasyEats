import React, {Component} from 'react'

class GenerationPage extends Component{
    render(){
        return <h1>GenerationPage</h1>
    }
}

import React, { Component } from 'react';
import List from '../components/restList';
import axios from 'axios';

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
            url: 'https://api.yelp.com/v3/businesses/search',
            params: {
                maxResults: 4,
                key: '7qhXzmc-qBs_nON-yV8qSFRDQOJkB9e5UYMVuyik8ySqoilGOlVAvGE7F31YxftS2nEMUkugJUlS7PyM-D0nnUuaxq3BOKUVH0aHZipZHx48RP-X31AVCYz1bX7EXHYx',
                location: '',

            }
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