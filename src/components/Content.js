import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from './Home';
import InterestCalculator from './Calculator/InterestCalculator'; 
import Customer from './Customer/Customer';
import ViewCustomer from './Customer/ViewCustomer';
import CreateCustomer from './Customer/CreateCustomer';
import MortageDetails from './Mortage/MortageDetails';
import Register from './Auth/Register';
import Login from './Auth/Login';
import AllMortages from './Mortage/AllMortages';
import DashBoard from './DashBoard/DashBoard';

import { PrivateRoute } from './PrivateRoute';
import TopNavBar from './TopNavBar/TopNavbar';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <TopNavBar toggleSidebar={toggleSidebar}/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/calculator" component={InterestCalculator}/>
      <Route exact path="/contact" component={() => "Contact"} />
      <Route exact path="/Home-1" component={() => "Home-1"} />
      <Route exact path="/Home-2" component={() => "Home-2"} />
      <Route exact path="/Home-3" component={() => "Home-3"} />
      <PrivateRoute exact path="/mortages" component={AllMortages} />
      <PrivateRoute exact path="/customers" component={Customer} />
      <PrivateRoute exact path='/view/:id' component={ViewCustomer}/>
      <PrivateRoute exact path='/customer/add' component={CreateCustomer} />
      <PrivateRoute exact path='/mortage' component={MortageDetails}/>
      <PrivateRoute exact path='/dashboard' component={DashBoard} />
      <Redirect from="*" to="/" />
    </Switch>
  </Container>
);

export default Content;