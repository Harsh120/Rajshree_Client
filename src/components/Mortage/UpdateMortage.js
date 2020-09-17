import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { deleteMortage } from '../../actions/mortageActions';
import { addNewPayment, changeStatus } from '../../actions/paymentActions';
import PropTypes from 'prop-types';

class UpdateMortage extends Component {
    state = {
        modal: false,
        mode_of_payment: "Cash",
        paid_by: null,
        payment_detail: null,
        amount: null,
        payment_date: new Date().toISOString().slice(0, 10).split(',').join('-'),
    };

    static propTypes = {
        deleteMortage: PropTypes.func.isRequired,
        addNewPayment: PropTypes.func.isRequired,
        changeStatus: PropTypes.func.isRequired
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

        const newPayment = JSON.stringify({
            mortage_id: this.props.id,
            mode_of_payment: this.state.mode_of_payment,
            paid_by: this.state.paid_by,
            amount: this.state.amount,
            payment_detail: this.state.payment_detail,
            payment_date: this.state.payment_date
        })

        this.props.addNewPayment(newPayment);

        this.toggle();
    }

    onChangeStatus = id => {
        this.props.changeStatus(id);
    }

    onDeleteClick = id => {
        this.props.deleteMortage(id);
    }

    render() {
        return (
            <div>
               <Button
                 color="dark"
                 style={{marginBottom: '2rem'}}
                 onClick={this.toggle}
                 block
                >Pay</Button>

                <Modal
                 isOpen={this.state.modal}
                 toggle={this.toggle}
                 >
                     <ModalHeader toggle={this.toggle}>Payment Detail</ModalHeader>
                     <ModalBody>
                         <Form onSubmit={this.onSubmit}>
                             <FormGroup>
                                 <Row>
                                     <Col>
                                    <Label for="mode_of_payment">Mode of Payment</Label>
                                    <Input
                                        type="select"
                                        name="mode_of_payment"
                                        value={this.state.mode_of_payment}
                                        onChange={this.onChange}>
                                            <option value="Cash">Cash</option>
                                            <option value="Online Payment">Online Payment</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Other">Other</option>
                                    </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Label for="payment_detail" style={{marginTop:'1rem'}}>Payment Detail</Label>
                                        <Input
                                            type="textarea"
                                            name="payment_detail"
                                            placeholder="Payment Detail"
                                            onChange={this.onChange}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label for="paid_by" style={{marginTop:'1rem'}}>Paid By</Label>
                                        <Input
                                            type="text"
                                            name="paid_by"
                                            placeholder="Name"
                                            onChange={this.onChange}
                                            />
                                    </Col>
                                    <Col>
                                    <Label for="amount" style={{marginTop:'1rem'}}>Amount</Label>
                                        <Input
                                            type="number"
                                            name="amount"
                                            placeholder="Amount Paid"
                                            min="0"
                                            //onInput={this.state.amount>100? '' : ''}
                                            onChange={this.onChange}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Label for="payment_date"  style={{marginTop:'1rem'}}>Payment Date</Label>
                                        <Input
                                            type="date"
                                            name="payment_date"
                                            defaultValue={this.state.payment_date}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{borderRight: "1px solid grey"}}>
                                    <div style={{float: "left"}}>
                                    <Button color="danger" onClick={this.onDeleteClick.bind(this, this.props.id)} style={{float: 'right', marginTop: '2rem', marginRight: '1rem'}}>
                                            Delete
                                    </Button>
                                    <Button color="info" onClick={this.onChangeStatus.bind(this, this.props.id)} style={{float: 'right', marginTop: '2rem', marginRight: '1rem'}}>
                                            Change
                                    </Button>
                                    </div>
                                    </Col> 
                                    <Col>
                                    <div style={{float: "right"}}>
                                    <Button color="dark" onClick={this.toggle} style={{marginTop: '2rem', marginRight: '1rem', float: 'right'}}>
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

export default connect(null, { deleteMortage, addNewPayment, changeStatus })(UpdateMortage);