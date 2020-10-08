import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';
import { Row, Col, Container, Table } from 'reactstrap';
import axios from 'axios';

export default class DashBoard extends Component {
  state = {
    TotalMortageValue: null,
    CustomerPaid: null,
    Profit: 0,
    RemainingMortageValue: null,

    TotalNumberOfMortages: null,
    Cleared: null,
    NotCleared: null
  };
 
  componentDidMount(){
    axios.get('/mortage/total/details')
      .then(res => this.setState({
        TotalMortageValue: res.data.totalMortageValue,
        CustomerPaid: res.data.totalPayments,
        RemainingMortageValue: res.data.totalMortageValue - res.data.totalPayments,

        TotalNumberOfMortages: res.data.numberOfMortages,
        NotCleared: res.data.NotClearedMortages,
        Cleared: res.data.numberOfMortages - res.data.NotClearedMortages
      }));
  }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                      <Table striped bordered hover responsive>
                          <thead>
                             <th colSpan='2'><u>Mortage Details</u></th>
                          </thead> 
                      <tbody>
                      <tr>
                          <th>Remaining Mortages</th>
                            <td>{this.state.NotCleared}</td>
                          </tr>
                          <tr>
                          <th>Cleared Mortages</th>
                            <td>{this.state.Cleared}</td>
                          </tr>
                          <tr>
                            <th>Total Mortages</th>
                            <td>{this.state.TotalNumberOfMortages}</td>
                          </tr>
                      </tbody>
                      </Table>
                    </Col>
                    <Col>
                        <Pie
                            data={
                              {
                                labels: ['Total Mortage Value', 'Customer Paid', 'Profit',
                                         'Remaining Mortage Value'],
                                datasets: [
                                  {
                                    label: 'Earning from Mortage',
                                    backgroundColor: [
                                      '#B21F00',
                                      '#C9DE00',
                                      '#2FDE00',
                                      '#00A6B4'
                                    ],
                                    hoverBackgroundColor: [
                                    '#501800',
                                    '#4B5000',
                                    '#175000',
                                    '#003350'
                                    ],
                                    data: [this.state.TotalMortageValue, this.state.CustomerPaid, this.state.Profit, this.state.RemainingMortageValue]
                                  }
                                ]
                              }
                            }
                            options={{
                            maintainAspectRatio: false,
                            responsive: false,
                            title:{
                                display:true,
                                text:'Earning from Mortage',
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            }
                            }}
                            
                        />
                    </Col>
                </Row>
        </Container>
        )
    }
}
