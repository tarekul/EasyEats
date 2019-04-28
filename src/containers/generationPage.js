import React, { Component } from 'react';
import List from '../components/restList';
import { parseYelpData, selectRandom } from '../services/services';
import axios from 'axios';
import queryString from 'query-string';

class GenerationPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lat: null,
            lon: null,
            restaurants: null,
            display: [],
            redirect: false,

        }
    }

    handleClick = name => e => {
        switch (name) {
            case 'regen':
                this.generateRandomRestaurantList();
                break;

            default:
                return;
        }

    };

    getOptions = () => {
        axios({
            method: 'GET',
            url: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=${this.state.lat}&longitude=${this.state.lon}&limit=50`,
            headers: {
                Authorization: 'BEARER 7qhXzmc-qBs_nON-yV8qSFRDQOJkB9e5UYMVuyik8ySqoilGOlVAvGE7F31YxftS2nEMUkugJUlS7PyM-D0nnUuaxq3BOKUVH0aHZipZHx48RP-X31AVCYz1bX7EXHYx'
            }
        })
            .then(res => parseYelpData(res.data))
            .then(restaurants => this.setState({ restaurants }, () => {
                localStorage.setItem('ee_restList', JSON.stringify(restaurants));
                this.generateRandomRestaurantList();
            }));
    }
    getOptions2 = (address) => {
        axios({
            method: 'GET',
            url: `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=restaurants&location=${address}&limit=50`,
            headers: {
                Authorization: 'BEARER 7qhXzmc-qBs_nON-yV8qSFRDQOJkB9e5UYMVuyik8ySqoilGOlVAvGE7F31YxftS2nEMUkugJUlS7PyM-D0nnUuaxq3BOKUVH0aHZipZHx48RP-X31AVCYz1bX7EXHYx'
            }
        })
            .then(res => parseYelpData(res.data))
            .then(restaurants => this.setState({ restaurants }, () => {
                localStorage.setItem('ee_restList', JSON.stringify(restaurants));
                this.generateRandomRestaurantList();
            }));
    }

    generateRandomRestaurantList = (passedIn = null) => {
        const restaurants = passedIn || this.state.restaurants;
        if (!restaurants) {
            this.setState({ redirect: true })
            return;
        };
        const randomRestaurants = selectRandom(4, restaurants);
        if (passedIn) {
            this.setState({
                restaurants: passedIn,
                display: randomRestaurants,
            }, () => {
                localStorage.setItem('ee_restDisplayList', JSON.stringify(randomRestaurants));
            })
        } else {
            this.setState({
                display: randomRestaurants,
            }, () => {
                localStorage.setItem('ee_restDisplayList', JSON.stringify(randomRestaurants));
            })
        }
    }

    pageLoad() {

        const values = queryString.parse(this.props.location.search)
        if (!values.lat || !values.lon) {
            const temp = this.props.location.search.split('=')[1];
            const ls = (localStorage.getItem('ee_loc')) ? JSON.parse(localStorage.getItem('ee_loc')) : null;
            if (ls) {
                if (ls === temp) return this.pageReloaded();
            }
            const store = { loc: temp };
            localStorage.setItem('ee_loc', JSON.stringify(store));
            this.getOptions2(temp);
        } else if (values.lat && values.lon) {
            const ls = (localStorage.getItem('ee_latlon')) ? JSON.parse(localStorage.getItem('ee_latlon')) : null;
            if (ls) {
                if (values.lat === ls.lat && values.lon === ls.lon) return this.pageReloaded();
            }
            const store = { lat: values.lat, lon: values.lon };
            localStorage.setItem('ee_latlon', JSON.stringify(store));
            this.setState({ lat: values.lat, lon: values.lon }, () => {
                this.getOptions()
            })
        } else {
            this.setState({ redirect: true })
            return;
        }
    }

    pageReloaded() {
        const restaurants = (localStorage.getItem('ee_restList')) ? JSON.parse(localStorage.getItem('ee_restList')) : null;
        if (!restaurants) {
            localStorage.setItem('ee_loc', JSON.stringify(null));
            localStorage.setItem('ee_latlon', JSON.stringify(null));
            this.pageLoad();
            return;
        }
        const display = (localStorage.getItem('ee_restDisplayList')) ? JSON.parse(localStorage.getItem('ee_restDisplayList')) : null;
        if (!display) {
            this.generateRandomRestaurantList(restaurants);
            return;
        }
        this.setState({
            restaurants,
            display,
        });
    }

    componentDidMount() {
        // const {lat , lon} = this.state
        this.pageLoad();
    }

    render() {
        const { display } = this.state
        return (

            <>
                <div className='container'>
                    {
                        display.map((e, i) => {
                            return (
                                <div className='my-1' key={i}>
                                    <List {...e}  />
                                </div>
                            )
                        })
                    }
                    <div className='container row my-1' >
                        <div className='col-sm-12 my-1'>
                            <button type='button' className="btn btn-outline-info" onClick={this.handleClick('regen')} style={{ width: '100%' }} >Generate New List</button>
                        </div>
                        <div className='col-sm-12 my-1'>
                            <button type='button' className="btn btn-outline-info" style={{ width: '100%' }}>Create Poll</button>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default GenerationPage 