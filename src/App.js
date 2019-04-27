import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'

import Home from './containers/Home'
import InfoForm from './containers/InfoForm'
import GenerationPage from './containers/GenerationPage'
import PollPage from './containers/PollPage'

class App extends Component{
  render(){
    return <>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/infopage' exact component={InfoForm} />
        <Route path='/genpoll' component={GenerationPage} />
        <Route path='/poll' component={PollPage} />
      </Switch>
    </>
  }
  
}

export default App;
