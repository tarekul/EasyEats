import React, { Component } from 'react';
import List from '../components/restList';
import { parseYelpData, selectRandom } from '../services/services';
import axios from 'axios';
import queryString from 'query-string';

class GenerationPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lat:null,
            lon:null,
            restaurants: null,
            display: [],
            redirect: false,

        }
    }

    getOptions = () => {
        axios({
            method: 'GET',
            url: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${this.state.lat}&longitude=${this.state.lon}&limit=50`,
            headers:{
               Authorization: 'BEARER 7qhXzmc-qBs_nON-yV8qSFRDQOJkB9e5UYMVuyik8ySqoilGOlVAvGE7F31YxftS2nEMUkugJUlS7PyM-D0nnUuaxq3BOKUVH0aHZipZHx48RP-X31AVCYz1bX7EXHYx'
           }
        })
        .then(res =>  parseYelpData(res.data))
        .then( restaurants => this.setState( { restaurants }, () => {
            this.generateRandomRestaurantList();
        }));
    }
    getOptions2 = (address) => {
        axios({
            method: 'GET',
            url: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=restaurants&location=${address}&limit=50`,
            headers:{
               Authorization: 'BEARER 7qhXzmc-qBs_nON-yV8qSFRDQOJkB9e5UYMVuyik8ySqoilGOlVAvGE7F31YxftS2nEMUkugJUlS7PyM-D0nnUuaxq3BOKUVH0aHZipZHx48RP-X31AVCYz1bX7EXHYx'
           }
        })
        .then(res =>  parseYelpData(res.data))
        .then( restaurants => this.setState( { restaurants }, () => {
            this.generateRandomRestaurantList();
        }));
    }

    generateRandomRestaurantList = () => {
        const { restaurants } = this.state;
        console.log('generating random: ', restaurants)
        if (!restaurants) {
            this.setState({redirect: true})
            return;
        };
        const randomRestaurants = selectRandom(4 ,restaurants);
        this.setState({
            display: randomRestaurants,
        })
    }

    componentDidMount(){
        // const {lat , lon} = this.state

        const values = queryString.parse(this.props.location.search)
        console.log('location',this.props.location.search)
        console.log('lat',values.lat)
        console.log('lon',values.lon)
        if (!values.lat || !values.lon) {
            const temp = this.props.location.search.split('=')[1];
            // const address = (temp.includes('%20'))? temp.replace(/%20/g, " "): temp;
            // console.log('address: ', address)
            this.getOptions2(temp);
        } else if (values.lat && values.lon) {
            
            this.setState({lat: values.lat, lon: values.lon},()=>{
                this.getOptions()   
               })
        } else {
            this.setState({redirect: true})
            return;
        }
    }

    render() {
        const { display } = this.state
        console.log('Display: ', display)
        return (

            <>
                <form>
                    {
                        display.map((e, i) => {
                            return <List img_url={e.img_url} restaurant={e.restaurant} cuisine={e.cuisine} />
                        })
                    }
                </form>
                <div className='container' style={{marginTop: '40px', marginLeft:'50px'}}  >
                  <div>
                <button type='button' class="btn btn-outline-info" >Generate New List</button>
                </div>
                <div style={{marginTop: '20px'}}  >
                 <button type='button' class="btn btn-outline-info" >Create Poll</button>
                </div>   
                </div>
               
            </>
        )
    }
}

export default GenerationPage 