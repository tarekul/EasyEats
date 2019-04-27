import React, {Component} from 'react'
import Button from '../components/Button'


class Home extends Component{
    // state = {
    //     latitude:null,
    //     longitude:null
    // }

    geo = () =>{
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
            <div className='container mt-5 jumbotron'>
                <h2 style={{textAlign:'center'}}>EasyEats</h2>
                <div style={{textAlign:'center'}}>
                    <span style={{marginRight:'1%'}}><Button goTo='/' value='My Location' handleOnClick={e=>{this.geo()}}/></span>
                    <Button goTo='/infopage' value='Enter Location' />
                </div>
                
            
               
            </div>
        </>
    }
}

export default Home