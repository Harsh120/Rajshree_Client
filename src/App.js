import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import SideBar from './components/SideNavbar/SideBar';
import Content from './components/Content';

import { Provider } from 'react-redux';
import store from './store'

class App extends Component {
  state = {
    sidebarIsOpen: true
  }

  toggleSidebar = () => {
    this.setState({
      sidebarIsOpen: !this.state.sidebarIsOpen
    });
  }

  render() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App wrapper">
        <SideBar toggle={this.toggleSidebar} isOpen={this.state.sidebarIsOpen} />
        <Content toggleSidebar={this.toggleSidebar} sidebarIsOpen={this.state.sidebarIsOpen} />
    </div>
    </BrowserRouter>
    </Provider>
  );
  }
}

export default App;
