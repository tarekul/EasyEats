import React, {Component} from 'react'
import Button from '../components/Button'
import logo from '../components/logo.jpg'


class Home extends Component{
    state = {
        loading: null,
    }

    geo = () =>{
        this.setState({
            loading: true,
        }, () => {
            setTimeout( () => {
                this.setState({
                    loading: false,
                })
            }, 1500);
        });
       if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude,longitude} = position.coords
                    console.log('latitude:' + latitude, 'Longitude:' + longitude)
                    // this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude},()=>{
                    //     console.log(this.state)
                    // })

                    this.props.history.push(`/genpoll?lat=${latitude}&lon=${longitude}`)
                })
        }
    }

    // componentDidUpdate(pp, ps) {
    //     console.log('previous state: ', ps)
    //     console.log('current state: ', this.state);
    // }

    

    render(){
        return <>
            <div className='container mt-5'>
                <div style={{textAlign:'center'}}><img src={logo} /></div>
                <div style={{textAlign:'center'}}>
                    <span style={{marginRight:'1%'}}><Button goTo='/' value='My Location' handleOnClick={e=>{this.geo()}}/></span>
                    <Button goTo='/infopage' value='Enter Location' />
                </div>
                {(!this.state) ? (<div className="d-flex justify-content-center mt-5 pt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>): <></>}
            </div>
        </>
    }
}

export default Home