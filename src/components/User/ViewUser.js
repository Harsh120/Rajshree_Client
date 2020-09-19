import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadMortages } from '../../actions/mortageActions';
import { Container, Button, Collapse, Badge } from 'reactstrap';
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
                    Customer 
                </div>
                <div className="card-body">
                    <h5 className="card-title">{this.props.mortage.name}</h5> {/* Has*/}
                    <p className="card-text">|| {this.props.mortage.father_name} || {this.props?.mortage?.place?.name} || {this.props.mortage.phone_number}</p>
                    
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
                    <h5 className="card-title">
                        {m.items}
                        { (m.status.name === 'Cleared') 
                        ? <Badge color="success" pill style={{fontSize: 15, float: 'right'}}>Cleared</Badge>
                        : <Badge color="warning" pill style={{fontSize: 15, float: 'right'}}>Not Cleared</Badge>
                        }
                    </h5>

            <p className="card-text">{m.amount} || {m.weight} || Date: {Moment(m.mortage_at).format('DD/MM/YYYY')}</p>
            <p className="card-text">{m.comment}</p>

            <Button tag={RRNavLink} exact to={{pathname: '/mortage',
                                            state: {
                                                id: m.id, 
                                                name: this.props.mortage.name,
                                                father_name: this.props.mortage.father_name,
                                                place: this.props.mortage.place.name,
                                                phone_number: this.props.mortage.phone_number
                                                }}} color="info">View Details</Button>
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
