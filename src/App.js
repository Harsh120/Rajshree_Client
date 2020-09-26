import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { withRouter } from 'react-router';
import './App.css';

import SideBar from './components/SideNavbar/SideBar';
import Content from './components/Content';

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
    <div className="App wrapper">
        { localStorage.getItem('token') ? <SideBar toggle={this.toggleSidebar} isOpen={this.state.sidebarIsOpen} /> : '' }
        <Content toggleSidebar={this.toggleSidebar} sidebarIsOpen={this.state.sidebarIsOpen}/>
    </div>
  );
  }
}

export default withRouter(App);
