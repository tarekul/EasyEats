import React, { Component } from 'react'
import List from '../components/restList'
import { Redirect } from 'react-router-dom'
import firebase from '../services/firebase';


class PollPage extends Component {

    state = {
        redirect: false,
        restaurants: null,
    }

    checkData = (id) => {
        const firebaseRef = firebase.database().ref('/polls/' + id);
        firebaseRef.once('value')
            .then(snapshot => {
                return snapshot.val()
            })
            .then( ({ data }) => {
                this.setState({
                    restaurants: data,
                });
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        const { id } = this.props.match.params || null;
        if (!id) {
            this.setState({
                redirect: true,
            })
        } else {
            this.checkData(id);
        }
    }
    render() {
        const { redirect, restaurants } = this.state;
        return (
            <>
                {
                    (redirect) ? <Redirect to='/' />
                        :
                        (restaurants) ?
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"></input>
                                {
                                    restaurants.map((e, i) => {
                                        return (
                                            <div className='my-1' key={i}>
                                                <List {...e} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className='row'>
                                <div className="col-sm-12 spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                }
            </>
        )
    }
}

export default PollPage 