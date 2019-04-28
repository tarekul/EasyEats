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
    }

    componentDidUpdate(pp, ps) {
        console.log(this.state)
    }
    render() {
        const { id, redirect, restaurants, req_votes } = this.state;
        return (
            <>
                {
                    (redirect) ? <Redirect to='/' />
                        :
                        (restaurants) ?
                            <div className="">
                                <div className='row'>
                                    <div className='col-sm-12 col-md-6 row'>
                                        {/* <input className="form-control" type="text"  value={'http://localhost:3000/#/poll/'+id} disabled/> */}
                                        {/* <span className="input-group-text col-sm-8" id="basic-addon3">{'http://localhost:3000/#/poll/' + id}</span> */}
                                        <form className='col col-sm-8'
                                        style={{height: '0px', width: '0px', backgroundColor: 'grey'}}>
                                            <textarea
                                                style={{height: '0px', width: '0px', backgroundColor: 'grey'}}
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
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col col-11 mr-0 pr-0'>
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
                                    <div className='col col-1 my-1 mx-0 p-2'>
                                        {
                                            [1, 2, 3, 4].map((e, i) => {
                                                return <div style={{ backgroundColor: 'red', height: '10px' }} key={i}></div>
                                            })
                                        }
                                    </div>
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