import React, { Component } from 'react';
import { Row, Container, Form, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { NavLink as RRNavLink} from 'react-router-dom';
import './Auth.css';
import { withRouter } from "react-router";

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = JSON.stringify({
            email,
            password
        });

        this.props.login(this.props.history, user);
    }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Container>
            <Form onSubmit={this.onSubmit} className="form">
                <FormGroup>
                    <Row style={{marginTop: "1rem"}}>
                        <Label for="email" className="required">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                onChange={this.onChange}
                            />
                    </Row>
                    <Row style={{marginTop: "1rem"}}>
                        <Label for="password" className="required">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                onChange={this.onChange}
                            />
                    </Row>
                    <Row>
                        { this.props.isLoading
                        ?
                        <Button color="dark" style={{marginTop: '2rem'}} disabled block>
                            <Spinner type="grow" size="sm" role="status"></Spinner>
                            Loading...
                        </Button>
                        :
                        <Button color="dark" style={{marginTop: '2rem'}} block>
                                     Login
                        </Button>
                        }
                    </Row>
                    <br></br>
                    <p>Don't have an Account?</p>
                        <Button color="link" tag={RRNavLink} exact to="/register">Register</Button>
                </FormGroup>
            </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading
});

const LoginWithRouter = withRouter(Login);

export default connect(mapStateToProps, { login })(LoginWithRouter);