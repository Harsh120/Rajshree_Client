import React, { Component } from 'react';
import { Row, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { NavLink as RRNavLink} from 'react-router-dom';
import './Auth.css';
import { withRouter } from "react-router";

class Register extends Component {
    state = {
        name: '',
        DOB: '',
        email: '',
        password: '',
        confirm_password: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const { name, DOB, email, password, confirm_password} = this.state;

        const newUser = JSON.stringify({
            name,
            DOB,
            email,
            password,
            confirm_password
        })

        this.props.register(this.props.history, newUser);
    }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <Container>
            <Form onSubmit={this.onSubmit} className="form">
                <FormGroup>
                    <Row>
                        <Label for="name" className="required">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                onChange={this.onChange}
                            />
                    </Row>
                    <Row style={{marginTop: "1rem"}}>
                        <Label for="DOB">Date of Birth</Label>
                            <Input
                                type="date"
                                name="DOB"
                                onChange={this.onChange}
                            />
                    </Row>
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
                    <Row style={{marginTop: "1rem"}}>
                        <Label for="confirm_password" className="required">Confirm Password</Label>
                            <Input
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                onChange={this.onChange}
                            />
                    </Row>
                    <Row>
                        <Button color="dark" style={{marginTop: '2rem'}} block>
                                     Register
                        </Button>
                        </Row>
                        <br></br>
                        <p>Already have an Account?</p>
                            <Button color="link" tag={RRNavLink} exact to="/login">Login</Button>
                </FormGroup>
            </Form>
        </Container>
      </div>
    );
  }
}

const RegisterWithRouter = withRouter(Register);

export default connect(null, { register })(RegisterWithRouter);