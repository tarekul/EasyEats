import React, { Component } from 'react';
import List from '../components/restList';
import Modal from '../components/Modal';
import { selectRandom } from '../services/services';
import axios from 'axios';
import queryString from 'query-string';
import firebase from '../services/firebase';
import logo from '../components/logo.jpg';
import '../components/genpage.css';


class GenerationPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lat: null,
            lon: null,
            restaurants: null,
            display: null,
            redirect: false,
            votes: '',

        }
    }

    handleOnClick = name => e => {
        switch (name) {
            case 'regen':
                this.generateRandomRestaurantList();
                break;
            case 'create':
                this.generatePoll();
                break;
            case 'modal':
                const votes = this.state.votes.trim();
                if (!votes.match(/[0-9]/g)) {
                    this.setState({
                        votes: '',
                    })
                    return;
                };
                const firstNum = votes.match(/[0-9]/g)[0];
                if (parseInt(firstNum) < 2) {
                    this.setState({
                        votes: '',
                    })
                    return;
                };
                this.generatePoll(firstNum);
                break;

            default:
                return;
        }
    };

    specHandleOnClick = e => {
    }

    handleOnChange = name => e => {
        switch (name) {
            case 'votes':
                this.setState({ [name]: e.target.value })
                break;
            default:
                return;
        };
    };

    getRestaurantsByGeo = () => {
        axios({
            method: 'GET',
            url: `http://localhost:5767/restaurants/geo/?lat=${this.state.lat}&lon=${this.state.lon}`,
        })
            .then(({ data: restaurants }) => restaurants)
            .then(({ restaurants }) => {
                this.setState({ restaurants })
                return restaurants;
            })
            .then( (restaurants) => {
                localStorage.setItem('ee_restList', JSON.stringify(restaurants));
                this.generateRandomRestaurantList();
            });
    };

    getRestaurantsByAddress = (address) => {
        axios({
            method: 'GET',
            url: `http://localhost:5767/restaurants/location/?address=${address}`,
        })
            .then(({ data: restaurants }) => restaurants)
            .then(({ restaurants }) => {
                this.setState({ restaurants })
                return restaurants;
            })
            .then( (restaurants) => {
                localStorage.setItem('ee_restList', JSON.stringify(restaurants));
                this.generateRandomRestaurantList();
            });
    };

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

    generatePoll = () => {
        const { display, votes } = this.state;
        const id = display.reduce((acc, e, i) => {
            const int = Math.floor(Math.random() * display[i].name.length)
            acc += display[i].name[1] + display[i].name[0] + display[i].name[int]
            return acc;
        }, '').replace(/[^a-zA-Z0-9]/g, "ee")

        const firebaseRef = firebase.database().ref('/polls');
        firebaseRef.child(id).set({ data: display, req_votes: votes, total_votes: [0, 0, 0, 0] }, err => {
            if (err) {
                console.log('FAILED TO WRITE TO FIREBASE')
                return;
            } else {
                this.props.history.push(`/poll/${id}`)
            }
        });
    };

    checkData = (id) => {
        const firebaseRef = firebase.database().ref('/polls/' + id);
        firebaseRef.once('value')
            .then(snapshot => {
                console.log('snapshot: ', snapshot.val())
            })
            .catch(err => {
                console.log(err)
            })
    }

    pageLoad = () => {
        const values = queryString.parse(this.props.location.search)
        if (!values.lat || !values.lon) {
            const temp = this.props.location.search.split('=')[1];
            const ls = (localStorage.getItem('ee_loc')) ? JSON.parse(localStorage.getItem('ee_loc')) : null;
            if (ls) {
                if (ls === temp) return this.pageReloaded();
            }
            const store = { loc: temp };
            localStorage.setItem('ee_loc', JSON.stringify(store));
            this.getRestaurantsByAddress(temp);
        } else if (values.lat && values.lon) {
            const ls = (localStorage.getItem('ee_latlon')) ? JSON.parse(localStorage.getItem('ee_latlon')) : null;
            if (ls) {
                if (values.lat === ls.lat && values.lon === ls.lon) return this.pageReloaded();
            }
            const store = { lat: values.lat, lon: values.lon };
            localStorage.setItem('ee_latlon', JSON.stringify(store));
            this.setState({ lat: values.lat, lon: values.lon }, () => {
                this.getRestaurantsByGeo()
            })
        } else {
            this.setState({ redirect: true })
            return;
        }
    }

    pageReloaded = () => {
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
        const { display, votes } = this.state
        return (

            <>
                <div className='image center'>
                    <img src={logo} alt='logo' />
                </div>
                {
                    (!display) ? (<div className="d-flex justify-content-center mt-5 pt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>)
                        :
                        <div className='container'>
                            {
                                display.map((e, i) => {
                                    return (
                                        <div className='my-1' key={i}>
                                            <List {...e} />
                                        </div>
                                    )
                                })
                            }
                            <div className='container row my-1' >
                                <div className='col-sm-12 my-1'>
                                    <button type='button' className="btn btn-outline-info" onClick={this.handleOnClick('regen')} style={{ width: '100%' }} >New Restaurants</button>
                                </div>
                                <div className='col-sm-12 my-1'>
                                    <Modal specHandleOnClick={this.specHandleOnClick} handleOnChange={this.handleOnChange} inputValue={votes} handleOnPollSubmit={this.handleOnClick} />
                                    {/* <button type='button' className="btn btn-outline-info" style={{ width: '100%' }} onClick={this.handleClick('create')} >Create Poll</button> */}
                                </div>
                            </div>
                        </div>
                }
            </>
        )
    }
}

export default GenerationPage 