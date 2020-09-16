import React, { Component } from 'react'
import { Table, Container, Row, Col, Badge } from 'reactstrap';
import UpdateMortage from '../Mortage/UpdateMortage';
import { loadPayments } from '../../actions/paymentActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'moment';

class MortageDetails extends Component {
    state = {
        payments: null
    }

    static propTypes = {
        loadPayments: PropTypes.func.isRequired,
        payments: PropTypes.array.isRequired
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
                    Customer And Mortage Details
                    { (this.props?.payments?.status?.name === 'Cleared') 
                        ? <Badge color="success" pill style={{fontSize: 15, float: 'right'}}>Cleared</Badge>
                        : <Badge color="warning" pill style={{fontSize: 15, float: 'right'}}>Not Cleared</Badge>
                    }
                </div>
                <Row>
                    <Col style={{borderRight: "1px solid grey"}}>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.location.state.name}</h5> {/* Has*/}
                            <p className="card-text">{this.props.location.state.father_name} || {this.props.location.state.place} || {this.props.location.state.phone_number}</p>             
                        </div>
                    </Col>
                    <Col>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.payments.items}</h5> {/* Has*/}
                            <p className="card-text">{this.props.payments.weight} || {this.props.payments.amount} || {this.props.payments.mortage_at} || {this.props.payments.comment}</p>             
                        </div>
                    </Col>
                </Row>
            </div>
                <br/>

                 <UpdateMortage id={this.props.location.state.id}/>

                <Table striped>
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
                    <tr>
                        <th></th>
                        <th>Total Paid</th>
                        <th>{Formatted_totalAmount}</th>
                    </tr>
                </Table>
                </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    payments: state.payment.payments,
    isLoading: state.payment.isLoading
})

export default connect(mapStateToProps, { loadPayments } )(MortageDetails);