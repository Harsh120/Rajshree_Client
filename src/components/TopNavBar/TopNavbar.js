import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import Logout from '../Auth/Logout';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import './TopNavbar.css';

class TopNavBar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const commonLinks = (
            <Fragment>
                <NavItem>
                    <NavLink tag={RRNavLink} exact to="/" activeClassName="active_class">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RRNavLink} exact to="/calculator" activeClassName="active_class">Calulate</NavLink>
                </NavItem> 
                <NavItem>
                    <NavLink href="https://github.com/Harsh120">Github</NavLink>
                </NavItem>
            </Fragment>
        )

        const authLinks = (
            <Fragment>
                { commonLinks }
                <Logout/>
                <NavItem>
                <span className='navbar-text mr-3'>
                    <strong>{ localStorage.getItem('user_name') }</strong>
                </span>
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                { commonLinks }
                <NavItem>
                    <NavLink tag={RRNavLink} exact to="/login" activeClassName="active_class">Login</NavLink>
                </NavItem>
            </Fragment>
        )

        return (
            <div className="top-navbar">
            <Navbar color="dark" dark expand="sm" style={{borderRadius: '15px'}}>
            {localStorage.getItem('token') ? <Button color="info" onClick={this.props.toggleSidebar}> 
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </Button> : '' }
                <Container>
                    <NavbarBrand href='/'>Rajshree</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? authLinks : guestLinks }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps, null)(TopNavBar);
