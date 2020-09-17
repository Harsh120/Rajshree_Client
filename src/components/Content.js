import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Home from './Home';
import InterestCalculator from './Calculator/InterestCalculator'; 
import User from './User/User';
import ViewUser from './User/ViewUser';
import CreateUser from './User/CreateUser';
import MortageDetails from './Mortage/MortageDetails';

import AppNavBar from './AppNavbar';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <AppNavBar toggleSidebar={toggleSidebar}/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/calculator" component={InterestCalculator}/>
      <Route exact path="/Pages" component={() => "Pages"} />
      <Route exact path="/faq" component={() => "FAQ"} />
      <Route exact path="/contact" component={() => "Contact"} />
      <Route exact path="/Home-1" component={() => "Home-1"} />
      <Route exact path="/Home-2" component={() => "Home-2"} />
      <Route exact path="/Home-3" component={() => "Home-3"} />
      <Route exact path="/user" component={User} />
      <Route exact path='/view/:id' component={ViewUser}/>
      <Route exact path='/customer/add' component={CreateUser}/>
      <Route exact path='/mortage' component={MortageDetails}/>
      <Route exact path="/page-3" component={() => "page-3"} />
      <Route exact path="/page-4" component={() => "page-4"} />
    </Switch>
  </Container>
);

export default Content;