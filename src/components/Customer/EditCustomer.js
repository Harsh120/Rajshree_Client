import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import AutoComplete from '../AutoComplete';
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
import { editCustomer } from "./../../actions/customerActions";
import PropTypes from 'prop-types';

class EditCustomer extends Component {
    state = {
        modal: false,
        name: this.props.name,
        father_name: this.props.father_name,
        places: [],
        place: this.props.place,
        phone_number: this.props.phone_number
    };

    static propTypes = {
        editCustomer: PropTypes.func.isRequired
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

        const updatedCustomer = JSON.stringify({
            name: this.state.name,
            father_name: this.state.father_name,
            place: this.state.place,
            phone_number: this.state.phone_number
        })

        this.props.editCustomer(this.props.id, updatedCustomer);

        this.toggle();
    }

    componentDidMount() {
        axios.get('/places').then(res => this.setState({
            places: res.data
        }))
    }
    
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
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
                     <ModalHeader toggle={this.toggle}>Edit Customer Details</ModalHeader>
                     <ModalBody>
                         <Form>
                             <FormGroup>
                                <Row>
                                    <Col>
                                    <Label for="name" className="required">Name</Label>
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
                                        <Label for="father_name" style={{marginTop:'1rem'}} className="required">Father</Label>
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
                                    <Label for="place" style={{marginTop:'1rem'}} className="required">Place</Label>
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

export default connect(null, { editCustomer })(EditCustomer);