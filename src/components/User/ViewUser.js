import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadMortages } from '../../actions/mortageActions';
import { Container, Button, Collapse, Badge, Row, Col } from 'reactstrap';
import Loading from '../Loading/Loading';
import AddMortage from './../Mortage/AddMortage';
import { NavLink as RRNavLink } from 'react-router-dom';
import Moment from 'moment';

export class ViewUser extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    static propTypes = {
        loadMortages: PropTypes.func.isRequired,
        mortage: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired
    }

    componentDidMount() {
        this.props.loadMortages(this.props.match.params.id);
    }

    render() {
        return (
            <Container>
                {this.props.isLoading
                ? <Loading/>
                :
                <Container>
            <div className="card text-center">
                <div className="card-header">
                    Customer Details
                </div>
                <div className="card-body">
                <p style={{opacity: "0.6", marginBottom: "0.5px"}}>CUSTOMER</p>
                    <h5>{this.props.mortage.name}</h5> {/* Has*/}
                    <Row style={{marginTop: "1rem"}}>
                        <Col>
                            <p style={{opacity: "0.6", marginBottom: "0.5px"}}>FATHER</p>
                                <h5>{this.props.mortage.father_name}</h5>
                        </Col>
                        <Col>
                            <p style={{opacity: "0.6", marginBottom: "0.5px"}}>PLACE</p>
                                <h5>{this.props?.mortage?.place?.name}</h5>
                        </Col>
                        <Col>
                            <p style={{opacity: "0.6", marginBottom: "0.5px"}}>CONTACT</p>
                                <h5>{this.props.mortage.phone_number || 'N/A'}</h5>
                        </Col>
                    </Row>
                   
                </div>
            </div>
                <br/>
                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Add New Mortage</Button>
                <Collapse isOpen={this.state.isOpen}>
                    <AddMortage toggle={this.toggle}/>
                </Collapse>
                <br/><br/>

            {this.props?.mortage?.mortages?.map(m =>    
            <div className="card text-center" key={m.id}>
                <div className="card-body">
                <p className="badge-centered-text" style={{opacity: "0.6", marginBottom: "0.5px"}}>ITEMS</p>
                    { (m.status.name === 'Cleared') 
                        ? <Badge color="success" pill className="badge-align-right" style={{fontSize: 15}}>Cleared</Badge>
                        : <Badge color="warning" pill className="badge-align-right" style={{fontSize: 15}}>Not Cleared</Badge>
                        }
                    <h5>
                        <div >
                            {m.items}
                        </div>
                    </h5>
                    <Row style={{marginTop: "1rem"}}>
                        <Col>
                            <p style={{opacity: "0.6", marginBottom: "0.5px"}}>AMOUNT</p>
                                <h5>{m.amount}</h5>
                        </Col>
                        <Col>
                            <p style={{opacity: "0.6", marginBottom: "0.5px"}}>WEIGHT</p>
                                <h5>{m.weight}</h5>
                        </Col>
                        <Col>
                            <p style={{opacity: "0.6", marginBottom: "0.5px"}}>MORTAGE DATE</p>
                                <h5>{Moment(m.mortage_at).format('DD/MM/YYYY')}</h5>
                        </Col>
                    </Row>

                    <Row style={{marginTop: "1rem"}} >
                        <Col>
                            <p style={{opacity: "0.6", marginBottom: "0.5px"}}>COMMENT</p>
                                <h5>{m.comment || ''}</h5>
                        </Col>
                        <Col style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Button tag={RRNavLink} exact to={{pathname: '/mortage',
                                        state: {
                                            id: m.id, 
                                            name: this.props.mortage.name,
                                            father_name: this.props.mortage.father_name,
                                            place: this.props.mortage.place.name,
                                            phone_number: this.props.mortage.phone_number
                                            }}} color="info">View Details
                            </Button>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </div>
            </div>
            )}
                </Container>
                    }
                </Container>
        )
    }
}



const mapStateToProps = (state) => ({
    mortage: state.mortage.mortage,
    isLoading: state.mortage.isLoading
})

export default connect(mapStateToProps, { loadMortages } )(ViewUser);
