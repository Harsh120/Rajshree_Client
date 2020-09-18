import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Modal,
    ModalBody,
    Row,
    Col
} from 'reactstrap';
import { connect } from 'react-redux';
import {  } from "./../../actions/userActions";
import PropTypes from 'prop-types';

class UpdateMortage extends Component {
    state = {
        modal: false,
    };

    static propTypes = {
        editUser: PropTypes.func.isRequired
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onDeleteclick = () => {

        // const updatedUser = JSON.stringify({
        //     name: this.state.name,
        //     father_name: this.state.father_name,
        //     place: this.state.place
        // })

        //this.props.editUser(this.props.id, updatedUser);

        this.toggle();
    }

    render() {
        return (
            <div>
                <FontAwesomeIcon
                    onClick={this.toggle}
                    icon={faTrash} 
                    style={{color: 'red', marginLeft: "0.5rem", cursor: 'pointer'}}
                /> Delete

                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                 centered
                 >

                     <ModalBody>
                     <FontAwesomeIcon
                        onClick={this.toggle}
                        icon={faTimesCircle}
                        size="8x"
                        style={{color: 'red', alignItems: 'center'}}
                    /><br></br>
                        <h2>Are you sure?</h2>
                        {this.props.message}
                        <Row>
                            <Col>
                            <div style={{float: "right"}}>
                                <Button color="dark" onClick={this.toggle} style={{float: 'right', marginTop: '2rem', marginRight: '1rem'}}>
                                        Cancel
                                </Button>
                                <Button color="danger" onClick={this.onDeleteClick} style={{float: 'right', marginTop: '2rem', marginRight: '1rem'}}>
                                        Delete
                                </Button>
                            </div>
                            </Col>
                        </Row>  
                     </ModalBody>

                </Modal>
            </div>
        );
    }
}

export default connect(null, {  })(UpdateMortage);