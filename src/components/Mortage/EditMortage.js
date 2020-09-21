import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Input,
    Row,
    Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { editMortage } from '../../actions/mortageActions';
import PropTypes from 'prop-types';

class EditMortage extends Component {
    state = {
        modal: false,
        items: null,
        weight: null,
        amount: null,
        mortage_at: null,
        comment: null
    };

    static propTypes = {
        editMortage: PropTypes.func.isRequired,
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
            items: this.props.items,
            weight: this.props.weight,
            amount: this.props.amount,
            mortage_at: this.props.mortage_at,
            comment: this.props.comment
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onEditClick = () => {

        const editedMortage = JSON.stringify({
            items: this.state.items,
            weight: this.state.weight,
            amount: this.state.amount,
            mortage_at: this.state.mortage_at,
            comment: this.state.comment
        })

        this.props.editMortage(this.props.id, editedMortage);

        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                 color="success"
                 onClick={this.toggle}
                >Edit Mortage</Button>

                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                 >
                     <ModalHeader toggle={this.toggle}>Edit Mortage</ModalHeader>
                     <ModalBody>
                             <FormGroup>
                                <Row>
                                    <Col>
                                    <Label for="items">Items</Label>
                                        <Input
                                            type="text"
                                            name="items"
                                            placeholder="Items"
                                            defaultValue={this.props.items}
                                            onChange={this.onChange}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="amount" style={{marginTop:'1rem'}}>Amount</Label>
                                        <Input
                                            type="number"
                                            name="amount"
                                            placeholder="Amount"
                                            min="0"
                                            defaultValue={this.props.amount}
                                            onChange={this.onChange}
                                            />
                                    </Col>
                                    <Col>
                                    <Label for="weight" style={{marginTop:'1rem'}}>Weight</Label>
                                        <Input
                                            type="text"
                                            name="weight"
                                            placeholder="Weight"
                                            defaultValue={this.props.weight}
                                            onChange={this.onChange}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Label for="mortage_at" style={{marginTop:'1rem'}}>Mortage Date</Label>
                                        <Input
                                            type="date"
                                            name="mortage_at"
                                            defaultValue={this.props.mortage_at? (this.props.mortage_at).slice(0,10) : ''}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="comment" style={{marginTop:'1rem'}}>Comment</Label>
                                            <Input
                                            type="textarea"
                                            name="comment"
                                            placeholder="Comments"
                                            defaultValue={this.props.comment}
                                            onChange={this.onChange}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <div style={{float: "right"}}>
                                    <Button color="dark" onClick={this.toggle} style={{marginTop: '2rem', marginRight: '1rem', float: 'right'}}>
                                            Cancel
                                    </Button>
                                    <Button color="success" onClick={this.onEditClick} style={{float: 'right', marginTop: '2rem', marginRight: '1rem'}}>
                                            Update Mortage
                                    </Button>
                                    </div>
                                    </Col>
                                 </Row>         
                             </FormGroup>
                     </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { editMortage })(EditMortage);