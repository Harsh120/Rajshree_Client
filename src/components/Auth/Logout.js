import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    logoutClick = e => {
        e.preventDefault();
        this.props.logout(this.props.history);
    }

    render() {
        return (
            <Fragment>
                <NavLink onClick={this.logoutClick} style={{cursor: "pointer"}}>
                    Logout
                </NavLink>
            </Fragment>
        );
    }
}

const LogoutWithRouter = withRouter(Logout);

export default connect(null, { logout })(LogoutWithRouter);
