import React, { Component } from 'react';
import { Container, Table, Input} from 'reactstrap';
import { loadAllUser } from '../../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './User.css';

class User extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            key: 'id',
            sort_asc: false
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

    sortBy = (e, sortKey) => {
        this.setState({
            key: sortKey,
            sort_asc: !this.state.sort_asc
        })
    }

    render() {
        let filteredUsers = this.props.user.filter(
            (user) => {
                return user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                user.father_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                user.place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        
        let SortedUsers = filteredUsers.sort((a,b) => {
            if(this.state.key === 'place') 
            {
                if(this.state.sort_asc) return a['place']['name'] > b['place']['name'] ? 1 : -1
                else return a['place']['name'] < b['place']['name'] ? 1 : -1
            }
            else {
                if(this.state.sort_asc) return a[this.state.key] > b[this.state.key] ? 1 : -1
                else return a[this.state.key] < b[this.state.key] ? 1 : -1
            } 
        })

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
                    <th className={this.state.key==="name" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'name')}>First Name</th>
                    <th className={this.state.key==="father_name" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'father_name')}>Father's Name</th>
                    <th className={this.state.key==="place" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'place')}>Place</th>
                    <th>View Profile</th>
                    </tr>
                </thead> 
                
                { SortedUsers.map((users)=> (
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