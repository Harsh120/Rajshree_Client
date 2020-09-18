import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import AutoComplete from './../AutoComplete';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { editUser } from "./../../actions/userActions";
import PropTypes from 'prop-types';

class UpdateMortage extends Component {
    state = {
        modal: false,
        name: this.props.name,
        father_name: this.props.father_name,
        places: [],
        place: this.props.place,
        phone_number: this.props.phone_number
    };

    static propTypes = {
        editUser: PropTypes.func.isRequired
    }

    callbackFunction = (childData) => {
        this.setState({place: childData})
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onUpdateClick = () => {

        const updatedUser = JSON.stringify({
            name: this.state.name,
            father_name: this.state.father_name,
            place: this.state.place
        })

        this.props.editUser(this.props.id, updatedUser);

        this.toggle();
    }

    componentDidMount() {
        axios.get('/places').then(res => this.setState({
            places: res.data
        }))
    }

    render() {
        return (
            <div>
                <FontAwesomeIcon
                    onClick={this.toggle}
                    icon={faEdit} 
                    style={{color: '2f7d96', marginLeft: "0.5rem", cursor: 'pointer'}}
                /> Edit

                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                 >
                     <ModalHeader toggle={this.toggle}>Edit User Details</ModalHeader>
                     <ModalBody>
                         <Form>
                             <FormGroup>
                                <Row>
                                    <Col>
                                    <Label for="name">Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Enter Name"
                                            defaultValue={this.props.name}
                                            onChange={this.onChange}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="father_name" style={{marginTop:'1rem'}}>Father</Label>
                                        <Input
                                            type="text"
                                            name="father_name"
                                            placeholder="Enter Father name"
                                            defaultValue={this.props.father_name}
                                            onChange={this.onChange}
                                            />
                                    </Col>
                                    <Col>
                                    <Label for="phone_number" style={{marginTop:'1rem'}}>Phone Number</Label>
                                        <Input
                                            type="text"
                                            name="phone_number"
                                            placeholder="Enter Phone Number"
                                            defaultValue={this.props.phone_number}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Label for="place" style={{marginTop:'1rem'}}>Place</Label>
                                        <AutoComplete
                                            options={this.state.places} 
                                            parentCallback = {this.callbackFunction}
                                            place = {this.props.place}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <div style={{float: "right"}}>
                                    <Button color="dark" onClick={this.toggle} style={{float: 'right', marginTop: '2rem', marginRight: '1rem'}}>
                                            Cancel
                                    </Button>
                                    <Button color="success" onClick={this.onUpdateClick} style={{float: 'right', marginTop: '2rem', marginRight: '1rem'}}>
                                            Update
                                    </Button>
                                    </div>
                                    </Col>
                                 </Row>         
                             </FormGroup>
                         </Form>
                     </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { editUser })(UpdateMortage);