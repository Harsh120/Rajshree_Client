import React, { Component} from 'react';
import { Row, Col, Container, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, Button } from 'reactstrap';

/* 
    Time Period 1 year is 360 days
*/ 
class InterestCalculator extends Component {
    state = {
        principal: null,
        rate: null,
        period: null,
        start_date: null,
        end_date: new Date().toISOString().slice(0, 10).split(',').join('-'),
        timeByYear: true,
        timeByDate: false,
        interest_type: true // true => Simple Interest ; false => Compound Interest
    }

    toggle = () => {
        this.setState({
            interest_type: !this.state.interest_type
        })
    }

    changeToYear = () => {
        this.setState({
            timeByYear: true,
            timeByDate: false,
            period: null
        });
    }

    changeToDate = () => {
        this.setState({
            timeByYear: false,
            timeByDate: true,
            period: null
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeDate = async e => {
        await this.onChange(e);
        const endDate = this.state.end_date;
        const startDate = this.state.start_date;
        if(startDate && endDate)
        {
            const ONE_DAY = 1000 * 60 * 60 * 24 * 365; // 365 days --> 360 days
            const differenceMs = Math.abs(new Date(endDate) - new Date(startDate));
            this.setState({
                period: (differenceMs/ONE_DAY).toFixed(2)
            });
        }
    }
    
    currencyFormat = number => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'}).format(number);
    }

    onSubmit = e => {
        e.preventDefault();
    }

    render() {
        const SI =  ((this.state.principal * this.state.rate * this.state.period)/100).toFixed(2);
        const Formatted_SI = this.currencyFormat(SI);
        const TotalAmount_SI = (parseFloat(this.state.principal)) + parseFloat(SI);
        const Formatted_TotalAmount_SI = this.currencyFormat(TotalAmount_SI);

        const TotalAmount_CI = (this.state.principal * Math.pow(1 + (this.state.rate/100), this.state.period)).toFixed(2);
        const Formatted_TotalAmount_CI = this.currencyFormat(TotalAmount_CI);
        const CI = (TotalAmount_CI - this.state.principal).toFixed(2);
        const Formatted_CI = this.currencyFormat(CI);
        return (
            <Container>
                <br/>
                <Button style={{borderRadius: '5px 20px'}} color="primary" onClick={this.toggle}>{this.state.interest_type? "Simple Interest" : "Compound Interest"}</Button>
                <br/>
            <Form onSubmit={this.onSubmit}>
                {/* Row 1 */}
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="Principal">Principal</Label>
                                <Input
                                    type="number"
                                    name="principal"
                                    id="principal"
                                    placeholder="Enter Principal Amount"
                                    min="0"
                                    onChange={this.onChange}
                                />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="Rate">Rate</Label>
                                <Input
                                    type="number"
                                    name="rate"
                                    id="rate"
                                    placeholder="Enter Rate (In %)"
                                    min="0"
                                    onChange={this.onChange}
                                />
                        </FormGroup>
                    </Col>
                </Row>

                {/* Row 2 */}
                <Row>
                    <Col>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" defaultChecked onClick={this.changeToYear}/>
                                Time By Period
                        </Label>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" onClick={this.changeToDate}/>
                                Time By Date
                        </Label>
                        </FormGroup>
                    </Col>
                </Row>

                {/* Row 3 */}
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="Period">Period</Label>
                            <Input
                                type="number"
                                name="period"
                                id="period"
                                min="0"
                                placeholder="Enter Number of Years"
                                disabled={!this.state.timeByYear}   
                                onChange={this.onChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="Start Date">Start Date</Label>
                            <Input
                                type="date"
                                name="start_date"
                                id="start_date"
                                max={this.state.end_date}
                                disabled = {!this.state.timeByDate}
                                onChange={this.onChangeDate}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="End Date">End Date</Label>
                            <Input
                                type="date"
                                name="end_date"
                                id="end_date"
                                disabled = {!this.state.timeByDate}
                                defaultValue={this.state.end_date}
                                onChange={this.onChangeDate}
                            />
                        </FormGroup>
                    </Col>
                </Row>
        </Form>
        
        <Container>
            <ListGroup>
                <ListGroupItem>
                    {this.state.interest_type
                     ? <h1>Simple Interest Details:</h1>
                     : <h1>Compound Interest Details:</h1>
                    }
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col>
                            <h3>Interest is:</h3>
                        </Col>
                        <Col><h3>
                            { this.state.interest_type
                             ? Formatted_SI
                             : Formatted_CI
                            }</h3>
                        </Col>`
                    </Row>
                </ListGroupItem>  
                <ListGroupItem>  
                    <Row>
                        <Col>
                        <h3>Total Amount:</h3>
                        </Col>
                        <Col><h3>
                            { this.state.principal && this.state.rate && this.state.period
                                ? this.state.interest_type? Formatted_TotalAmount_SI : Formatted_TotalAmount_CI
                                : "0.00"
                            }</h3>
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col>
                            <h3>Number of Days</h3>
                        </Col>
                        <Col>
                            <h3>
                                { this.state.period
                                    ? (parseFloat(this.state.period)*360).toFixed(2) + " days (" + (parseFloat(this.state.period)) + " Years)"
                                    : "0.00"
                                }
                            </h3>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Container>
        </Container>
        );
    }
}

export default InterestCalculator;