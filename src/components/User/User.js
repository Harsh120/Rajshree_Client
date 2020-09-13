import React, { Component } from 'react';
import { Container, Table, Input} from 'reactstrap';
import { loadAllUser } from '../../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import Loading from '../Loading/Loading';

class User extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        };
    }

    updateSearch= event => {
        this.setState({
            search: event.target.value.substr(0,20)
        });
    }

    static propTypes = {
        loadAllUser: PropTypes.func.isRequired,
        user: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired
    }

    componentDidMount() {
        this.props.loadAllUser();
    }

    render() {
        let filteredUsers = this.props.user.filter(
            (user) => {
                return user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                user.father_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                user.place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        return (
           <Container>
               <br/>
               <Input
                    type="search"
                    placeholder="Search"
                    value={this.state.search}
                    onChange={this.updateSearch}
                />
                <br/>
               {this.props.isLoading
                ? <Loading/>
                :
               <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Father's Name</th>
                    <th>Place</th>
                    <th>View Profile</th>
                    </tr>
                </thead> 
                
                { filteredUsers.map((users)=> (
                <tbody key={users.id}>
                    <tr>
                        <th scope="row">{users.id}</th>
                        <td>{users.name}</td>
                        <td>{users.father_name}</td>
                        <td>{users.place.name}</td>
                        <td><RRNavLink exact to={'/view/'+users.id}>View</RRNavLink></td>
                    </tr>
                </tbody> ))
                }  
                </Table>
                }
           </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    isLoading: state.user.isLoading
})

export default connect(mapStateToProps, { loadAllUser })(User);