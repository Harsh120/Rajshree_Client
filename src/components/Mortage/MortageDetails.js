import React, { Component } from 'react'
import { Table, Container } from 'reactstrap';
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

    render() {
        return (
            <Container>
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
                    { this.props?.payments?.payments?.map((payment)=> (
                        <tbody key={payment.id}>
                            <tr>
                            <th scope="row">{payment.id}</th>
                            <td>{payment.paid_by}</td>
                            <td>{payment.amount}</td>
                            <td>{payment.mode_of_payment}</td>
                            <td>{Moment(payment.payment_date).format('DD/MM/YYYY')}</td>
                            <td>{payment.payment_detail? payment.payment_detail : 'N/A'}</td>
                            </tr>
                        </tbody>
                    ))}
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