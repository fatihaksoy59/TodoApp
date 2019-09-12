import React, { Component } from 'react';
import {Route,BrowserRouter as Router,Switch} from 'react-router-dom';
import Home from './Home';
import AddItem from './AddItem';
import Login from './Login';
import Register from './Register';

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <Router>
                <Switch>
                    <Route path='/' exact={true} component={Login}/>
                    <Route path='/Home' exact={true} component={Home}/>
                    <Route path='/AddItem' exact={true} component={AddItem}/>
                    <Route path='/Register' exact={true} component={Register}/>
                </Switch>
            </Router>
     );

  }
}
 
export default App;