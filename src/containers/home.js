import React, {Component} from 'react'
import Button from '../components/Button'
import Sky from 'react-sky';
import logo from '../components/logo.jpg';

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
        <Sky 
          images={{
      
              0: "https://image.flaticon.com/icons/svg/706/706195.svg",
                1: "https://image.flaticon.com/icons/svg/1676/1676981.svg",
                2: "https://image.flaticon.com/icons/svg/1591/1591724.svg",
                3: "https://image.flaticon.com/icons/svg/273/273804.svg",
                4: "https://image.flaticon.com/icons/svg/1672/1672272.svg",

                
                
          }}
          how={130} 
          time={25} 
          size={'90px'}
          background={'teal'}
        />

            <div className='container mt-5'>
            <div className ='row justify-content-md-center'>
            <div className='col-md-12 row justify-content-md-center'>
                <img className='col col-md-auto' src={logo}/>
            </div>
                {/* <h2 style={{textAlign:'center'}}>EasyEats</h2> */}
                <div className='col-md-12 row justify-content-md-center m-2'>
                    <span style={{marginRight:'1%'}}><Button className='col col-md-6'goTo='/' value='My Location' handleOnClick={e=>{this.geo()}}/></span>
                    <Button className='col col-md-6' goTo='/infopage' value='Enter Location' />
                </div>
                {(!this.state) ? (<div className="d-flex justify-content-center mt-5 pt-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>): <></>}
            </div>
            </div>
            {/* <div>
                <iframe src="https://giphy.com/embed/3oEjHLS6Va8qdALZCM" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div> */}
        </>
    }
}

export default Home
