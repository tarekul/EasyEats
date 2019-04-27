import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'

import { Home, GenerationPage, InfoForm, PollPage } from './containers/'

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
