import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import InterestCalculator from './components/Calculator/InterestCalculator';
import Home from './components/Home';
import AppNavbar from './components/AppNavbar';
import User from './components/User/User';
import ViewUser from './components/User/ViewUser';
import CreateUser from './components/User/CreateUser';
import MortageDetails from './components/Mortage/MortageDetails';

import { Provider } from 'react-redux';
import store from './store'

class App extends Component {
  render() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <AppNavbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/calculator" component={InterestCalculator} />
        <Route exact path="/user" component={User}/>
        <Route exact path='/view/:id' component={ViewUser}/>
        <Route exact path='/customer/add' component={CreateUser}/>
        <Route exact path='/mortage' component={MortageDetails}/>
      </Switch>
    </div>
    </BrowserRouter>
    </Provider>
  );
  }
}

export default App;
