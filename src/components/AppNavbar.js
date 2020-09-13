import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { NavLink as RRNavLink} from 'react-router-dom';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
            <Navbar color="dark" dark expand="sm">
                <Container>
                    <NavbarBrand href='/'>Rajshree</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                              <NavLink tag={RRNavLink} exact to="/" activeClassName="active_class">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} exact to="/calculator" activeClassName="active_class">Calulate</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} exact to="/user" activeClassName="active_class">Users</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={RRNavLink} exact to="/customer/add" activeClassName="active_class">New Customer</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/Harsh120">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
            </div>
        )
    }
}

export default AppNavbar;