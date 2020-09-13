import React, { Component } from 'react';
import { Row, Col, Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AutoComplete from './../AutoComplete';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNewUser } from '../../actions/userActions';

class CreateUser extends Component {
    state = {
        places: [],
        place: null,
        name: null,
        father_name: null,
        phone_number: null
    }

    static propTypes = {
        addNewUser: PropTypes.func.isRequired
    }
    
    callbackFunction = (childData) => {
        this.setState({place: childData})
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = JSON.stringify({
            name: this.state.name,
            father_name: this.state.father_name,
            place: this.state.place,
            phone_number: this.state.phone_number
        })

        this.props.addNewUser(newUser);
    }

    componentDidMount() {
        axios.get('/places').then(res => this.setState({
            places: res.data
        }))
    }

  render() {
    return (
      <div>
        <h1>Add Customer</h1>
        <Container>
            <Form onSubmit={this.onSubmit}>
                {/* Row 1*/}
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Customer Name"
                                    onChange={this.onChange}
                                />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="father_name">Father's Name</Label>
                                <Input
                                    type="text"
                                    name="father_name"
                                    id="father_name"
                                    placeholder="Enter Father's Name"
                                    onChange={this.onChange}
                                />
                        </FormGroup>
                    </Col>
                </Row>
                
                {/* Row 2*/}
                <Row>
                    <Col>
                    <FormGroup>
                    <Label for="place">Place</Label>
                        <AutoComplete
                            options={this.state.places} 
                            parentCallback = {this.callbackFunction}
                        />
                    </FormGroup></Col>  
                    <Col>
                        <FormGroup>
                            <Label for="phone_number">Phone Number</Label>
                                <Input
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    placeholder="Enter Phone Number"
                                    onChange={this.onChange}
                                />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                <Button color="dark" style={{marginTop: '2rem'}} block>
                                     Add Customer
                                 </Button>
                </FormGroup>
            </Form>
        </Container>
      </div>
    );
  }
}

export default connect(null, { addNewUser })(CreateUser);