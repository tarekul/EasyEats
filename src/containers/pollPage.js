import React, { Component } from 'react'
import List from '../components/restList'
import { Redirect } from 'react-router-dom'
import firebase from '../services/firebase';


class PollPage extends Component {

    state = {
        id: null,
        redirect: false,
        restaurants: null,
        req_votes: null,
        total_votes: null,
        voted_on: null,
        voted_value: null,
        voted_restaurant: null,
        disabled: null,
        maxVotes: false,
        copySuccess: '',
    }

    checkData = (id) => {
        const firebaseRef = firebase.database().ref('/polls/' + id);
        firebaseRef.once('value')
            .then(snapshot => {
                return snapshot.val()
            })
            .then((data) => {
                if (!data) {
                    this.setState({
                        redirect: true,
                    });
                } else {
                    const ls = (localStorage.getItem('ee_' + id)) ? JSON.parse(localStorage.getItem('ee_' + id)) : null;
                    const totalVotes = (data.total_votes) ? data.total_votes.reduce((acc, e, i) => { return acc += e }, 0) : 0;
                    if (totalVotes >= data.req_votes) {
                        const voted_restaurant = this.findVoted(data.total_votes, data, data)
                        this.setState({
                            id,
                            total_votes: data.total_votes,
                            req_votes: data.req_votes,
                            restaurants: data.data,
                            voted_restaurant,
                            disabled: true,
                            maxVotes: true,
                        })
                        return;
                    }
                    if (ls) {
                        this.setState({
                            id,
                            restaurants: data.data,
                            req_votes: data.req_votes,
                            total_votes: data.total_votes,
                            voted_on: ls.voted,
                            disabled: true,
                        })
                        return;
                    }
                    this.setState({
                        id,
                        restaurants: data.data,
                        req_votes: data.req_votes,
                        total_votes: data.total_votes,
                    });
                }

            })
            .catch(err => {
                console.log(err)
            })
    }
    findVoted = (votes, { data }) => {
        let max = votes[0];
        for (let i = 1; i < votes.length; i++) {
            if (votes[i] > max) max = votes[i];
        };
        return data[max].name;
    };

    copyToClipboard = (e) => {
        this.textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
    };

    componentDidMount() {
        const { id } = this.props.match.params || null;
        if (!id) {
            this.setState({
                redirect: true,
            })
        } else {
            this.checkData(id);
        }

        setTimeout(() => {
            const firebaseListener = firebase.database().ref('/polls/' + id);
            firebaseListener.on('value', (snapshot) => {
                this.setState({
                    total_votes: snapshot.val().total_votes,
                })
            })
        }, 9000)

    }

    handleVote = () => {
        const { id, voted_on, restaurants, total_votes, req_votes } = this.state;
        const index = restaurants.reduce((acc, e, i) => {
            if (voted_on === e.name)
                acc = i;
            return acc;
        }, '');
        console.log(this.state)
        total_votes[index] = (total_votes[index] + 1);
        const newTotal_votes = total_votes;
        const firebaseRef = firebase.database().ref('/polls');
        firebaseRef.child(id).set({ data: restaurants, req_votes: req_votes, total_votes: newTotal_votes }, err => {
            if (err) {
                console.log('FAILED TO WRITE TO FIREBASE')
                return;
            } else {
                localStorage.setItem('ee_' + id, JSON.stringify({ voted: voted_on }))
                this.setState({
                    total_votes: newTotal_votes,
                    disabled: true,
                })
            }
        });

        // const newPostKey = firebase.database().ref().child('/polls/'+id).push().key;
        // let updates = {};
        // updates['/polls/' + id + '/' + total_votes + newPostKey ] = newTotal_votes;
        // firebase.database().ref().update(updates);


    };

    handleOnClick = name => (e) => {
        if (!e) return;
        const { voted_on } = this.state;
        if (name === 'vote') {
            if (!voted_on) return;
            this.handleVote();
            return;
        }
        if (e.target.value === voted_on) {
            this.setState({
                [name]: null,
            });
            return;
        }
        this.setState({
            [name]: e.target.value,
        });
    };


    render() {

        const { id, redirect, restaurants, disabled, voted_on, req_votes, total_votes, maxVotes, voted_restaurant } = this.state;
        const totalVotes = (total_votes) ? total_votes.reduce((acc, e, i) => { return acc += e }, 0) : 0;
        console.log(restaurants)
        return (
            <>
                {
                    (redirect) ? <Redirect to='/' />
                        :
                        (restaurants) ?
                            <div className="container mx-0 col-12 ">
                                <div className='row justify-content-md-center'>
                                    <div className='col-sm-12 col-md-6 row'>
                                        <form
                                            style={{ height: '0px', width: '0px', backgroundColor: 'white' }}>
                                            <textarea
                                                style={{ height: '0px', width: '0px', backgroundColor: 'white' }}
                                                ref={(textarea) => this.textArea = textarea}
                                                value={'http://localhost:3000/#/poll/' + id}
                                                readOnly={true}
                                            />
                                        </form>
                                        {
                                            /* Logical shortcut for only displaying the 
                                               button if the copy command exists */
                                            document.queryCommandSupported('copy') &&
                                            <div className='col-sm-4'>
                                                <button className='btn btn-outline-info col-sm-12' onClick={this.copyToClipboard}>Copy Url</button>
                                                {this.state.copySuccess}
                                            </div>
                                        }
                                        <div className='col-sm-4'>
                                            <span className='h4'>Total Votes: {totalVotes} </span>
                                        </div>
                                        <div className='col-sm-4'>
                                            <span className='h4'>Votes Needed: {req_votes - totalVotes} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row justify-content-md-center'>
                                    {
                                        restaurants.map((e, i) => {
                                            return (
                                                <div className='my-1 col-md-auto' key={i}>
                                                    {

                                                        (voted_on) ?
                                                            <List {...e} poll={true} handleOnClick={this.handleOnClick} isChecked={(voted_on === e.name) ? true : false} isDisabled={disabled} voteCount={total_votes[i]} />
                                                            :
                                                            <List {...e} poll={true} handleOnClick={this.handleOnClick} isDisabled={disabled} voteCount={total_votes[i]} />
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        (voted_on && !disabled && !maxVotes) ?
                                            <div className='container row my-1' >
                                                <div className='col-sm-12 my-1'>
                                                    <button type='button' className="btn btn-outline-info" onClick={this.handleOnClick('vote')} style={{ width: '100%' }} >Vote</button>
                                                </div>
                                            </div>
                                            :
                                            (!maxVotes) ? <></>
                                                :
                                                <div className='container row my-1' >
                                                    <div className='col-sm-12 my-1'>
                                                        <button type='button' className="btn btn-danger" style={{ width: '100%' }} >Voting Is Complete: {voted_restaurant}</button>
                                                    </div>
                                                </div>
                                    }
                                </div>
                            </div>
                            :
                            <div className="d-flex justify-content-center mt-5 pt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>
                }
            </>
        )
    }
}

export default PollPage 