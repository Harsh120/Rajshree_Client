import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    Row,
    Col,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNewMortage } from '../../actions/mortageActions';

class AddMortage extends Component {
    state = {
        items: null,
        amount: null,
        weight: null,
        status: "1",
        mortage_at: new Date().toISOString().slice(0, 10).split(',').join('-'),
        comment: null
    }

    static propTypes = {
        addNewMortage: PropTypes.func.isRequired,
        mortage: PropTypes.object.isRequired
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newMortage = JSON.stringify({
            items: this.state.items,
            user_id: this.props?.mortage?.id,
            amount: this.state.amount,
            weight: this.state.weight,
            status_id: this.state.status,
            comment: this.state.comment,
            mortage_at: this.state.mortage_at
        })
        
        this.props.addNewMortage(newMortage);

        this.props.toggle();
    }

    render()
    {
        return (
            <Card>
                <Container>
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Row>
                        <Col>
                            <Label for="items" style={{marginTop:'1rem'}}>Items</Label>
                            <Input
                            type="text"
                            name="items"
                            id="items"
                            placeholder="Enter items"
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
                            id="amount"
                            placeholder="Enter amount"
                            min="0"
                            onChange={this.onChange}
                            />
                        </Col>
                        <Col>
                            <Label for="weight" style={{marginTop:'1rem'}}>Weight</Label>
                                <Input
                                type="text"
                                name="weight"
                                id="weight"
                                placeholder="Enter weight"
                                onChange={this.onChange}
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label for="status" style={{marginTop:'1rem'}}>Status</Label>
                                <Input
                                type="select"
                                name="status"
                                id="status"
                                value={this.state.status}
                                onChange={this.onChange}>
                                    <option value="1">Not Cleared</option>
                                    <option value="2">Cleared</option>
                                </Input>
                        </Col>
                        <Col>
                            <Label for="mortage_at" style={{marginTop:'1rem'}}>Date</Label>
                                <Input
                                    type="date"
                                    name="mortage_at"
                                    id="mortage_at"
                                    defaultValue={this.state.mortage_at}
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
                                id="comment"
                                placeholder="Comments"
                                onChange={this.onChange}
                                />
                        </Col>
                    </Row>
                    <Button color="dark" style={{marginTop: '2rem'}} block>
                        Add Mortage
                    </Button>
                </FormGroup>
            </Form>
            </Container>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    mortage: state.mortage.mortage
})

export default connect(mapStateToProps, { addNewMortage } )(AddMortage);