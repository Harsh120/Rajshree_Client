import React, { Component } from 'react'
import { Table, Container, Row, Col, Badge, Button } from 'reactstrap';
import AddPayment from './AddPayment';
import EditMortage from './EditMortage'
import { loadPayments, changeStatus } from '../../actions/paymentActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'moment';

class MortageDetails extends Component {
    state = {
        payments: null
    }

    static propTypes = {
        loadPayments: PropTypes.func.isRequired,
        payments: PropTypes.object.isRequired,
        changeStatus: PropTypes.func.isRequired
    }

    onChangeStatus = id => {
        this.props.changeStatus(id);
    }

    componentDidMount() {
        this.props.loadPayments(this.props.location.state.id);
    }

    currencyFormat = number => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'}).format(number);
    }

    render() {
        const totalAmount = this.props?.payments?.payments?.reduce((amount_sum, pay) => amount_sum + parseFloat(pay.amount), 0);
        const Formatted_totalAmount = this.currencyFormat(totalAmount);
        return (
            <Container>
                <br/>
                <div className="card text-center">
                <div className="card-header">
                    <div className="badge-centered-text">Customer And Mortage Details</div>
                    { (this.props?.payments?.status?.name === 'Cleared') 
                        ? <Badge color="success" pill className="badge-align-right" style={{fontSize: 15}}>Cleared</Badge>
                        : <Badge color="warning" pill className="badge-align-right" style={{fontSize: 15}}>Not Cleared</Badge>
                    }
                </div>
                <Row>
                    <Col style={{borderRight: "1px solid grey"}}>
                        <div className="card-body">
                            <Row>
                                <Col>
                                    <p style={{opacity: "0.6", marginBottom: "0.5px"}}>NAME</p>
                                    <h5 className="card-title">{this.props?.payments?.customer?.name}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p style={{opacity: "0.6", marginBottom: "0.5px"}}>FATHER</p>
                                    <h6>{this.props?.payments?.customer?.father_name}</h6>
                                </Col>
                                <Col>
                                    <p style={{opacity: "0.6", marginBottom: "0.5px"}}>PLACE</p>
                                    <h6>{this.props?.payments?.customer?.place.name}</h6>
                                </Col>
                                <Col>
                                    <p style={{opacity: "0.6", marginBottom: "0.5px"}}>PHONE</p>
                                    <h6>{this.props?.payments?.customer?.phone_number || 'N/A'}</h6>
                                </Col>
                            </Row> 
                        </div>
                    </Col>
                    <Col>
                        <div className="card-body">
                            <Row>
                                <Col>
                                    <p style={{opacity: "0.6", marginBottom: "0.5px"}}>ITEMS</p>
                                    <h5>{this.props.payments.items}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p style={{opacity: "0.6", marginBottom: "0.5px"}}>WEIGHT</p>
                                    <h6>{this.props.payments.weight}</h6>
                                </Col>
                                <Col>
                                    <p style={{opacity: "0.6", marginBottom: "0.5px"}}>AMOUNT</p>
                                    <h6>{this.props.payments.amount}</h6>
                                </Col>
                                <Col>
                                    <p style={{opacity: "0.6", marginBottom: "0.5px"}}>DATE</p>
                                    <h6>{Moment(this.props.payments.mortage_at).format('DD/MM/YYYY')}</h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p style={{opacity: "0.6", marginBottom: "0.5px"}}>COMMENT</p>
                                    <h6>{this.props.payments.comment}</h6>
                                </Col>
                                <Col style={{display: "flex", justifyContent: "center", alignItems: "center"}} >
                                    <Button color="info" onClick={this.onChangeStatus.bind(this, this.props.location.state.id)}>
                                            Change Status
                                    </Button>
                                </Col>
                                <Col style={{display: "flex", justifyContent: "center", alignItems: "center"}} >
                                    <EditMortage
                                        id={this.props.location.state.id}
                                        items={this.props.payments.items}
                                        weight={this.props.payments.weight}
                                        amount={this.props.payments.amount}
                                        mortage_at={this.props.payments.mortage_at}
                                        comment={this.props.payments.comment}
                                    />
                                </Col>
                            </Row>             
                        </div>
                    </Col>
                </Row>
            </div>
                <br/>
                
                <AddPayment id={this.props.location.state.id}/>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Paid By</th>
                        <th>Amount Paid</th>
                        <th>Mode of Payment</th>
                        <th>Date</th>
                        <th>Payment Detail</th>
                        </tr>
                    </thead>
                    { this.props?.payments?.payments?.map((payment, index)=> (
                        <tbody key={payment.id}>
                            <tr>
                            <th scope="row">{index+1}</th>
                            <td>{payment.paid_by? payment.paid_by : 'N/A'}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.mode_of_payment}</td>
                            <td>{Moment(payment.payment_date).format('DD/MM/YYYY')}</td>
                            <td>{payment.payment_detail? payment.payment_detail : 'N/A'}</td>
                            </tr>
                        </tbody>
                    ))}
                    <tbody>
                    <tr>
                        <th></th>
                        <th>Total Paid</th>
                        <th>{Formatted_totalAmount}</th>
                    </tr>
                    </tbody>
                </Table>
                </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    payments: state.payment.payments,
    isLoading: state.payment.isLoading
})

export default connect(mapStateToProps, { loadPayments, changeStatus } )(MortageDetails);