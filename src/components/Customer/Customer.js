import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import EditCustomer from './EditCustomer';
import Confirmaton from '../Confirmation/Confirmation';
import { Container, Table, Input, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import { loadAllCustomer } from '../../actions/customerActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as RRNavLink } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './Customer.css';
import './Pagination.css';

class Customer extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            key: 'id',
            sort_asc: false,
            currentPage: 0
        };
        this.pageSize = 10;
    }

    handleClick(e, index) {
    
        e.preventDefault();
    
        this.setState({
          currentPage: index
        });
        
      }

    updateSearch= event => {
        this.setState({
            search: event.target.value.substr(0,20),
            currentPage: 0
        });
    }

    static propTypes = {
        loadAllCustomer: PropTypes.func.isRequired,
        customer: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired
    }

    componentDidMount() {
        this.props.loadAllCustomer();
    }

    sortBy = (e, sortKey) => {
        this.setState({
            key: sortKey,
            sort_asc: !this.state.sort_asc
        })
    }

    render() {

        let filteredCustomers = this.props.customer.filter(
            (customer) => {
                return customer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                customer.father_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                customer.place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        
        const { currentPage } = this.state;
        let total_item = Object.keys(filteredCustomers).length;
        let pagesCount = Math.ceil(total_item / this.pageSize);

        var startPage, endPage;
        if (pagesCount <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = pagesCount;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= pagesCount) {
                startPage = pagesCount - 9;
                endPage = pagesCount;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let SortedCustomers = filteredCustomers.sort((a,b) => {
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
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th className={this.state.key==="name" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'name')} style={{cursor: "pointer"}}>First Name</th>
                    <th className={this.state.key==="father_name" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'father_name')} style={{cursor: "pointer"}}>Father's Name</th>
                    <th className={this.state.key==="place" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'place')} style={{cursor: "pointer"}}>Place</th>
                    <th colSpan="3">Actions</th>
                    </tr>
                </thead> 
                
                { SortedCustomers.slice(
                        currentPage * this.pageSize,
                        (currentPage + 1) * this.pageSize
                        )
                    .map((customer, index)=> (
                <tbody key={customer.id}>
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{customer.name}</td>
                        <td>{customer.father_name}</td>
                        <td>{customer.place.name}</td>
                        <td>
                            <RRNavLink exact to={'/view/'+customer.id}><FontAwesomeIcon icon={faEye} style={{color: 'green'}} /> View</RRNavLink>
                        </td>
                        <td>
                            <EditCustomer 
                                id={customer.id} 
                                name={customer.name}
                                father_name={customer.father_name}
                                place={customer.place.name}
                                phone_number={customer.phone_number}
                            />
                        </td>
                        <td>
                            <Confirmaton
                                id = {customer.id}
                                message = "Do you really want to delete these records?"
                            />
                        </td>
                    </tr>
                </tbody> ))
                }  
                </Table>
                }

            <div className="pagination-wrapper">
          
            <Pagination>
                
                <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink 
                        onClick={e => this.handleClick(e, 0)}
                        first
                        href="#"
                    />
                </PaginationItem>

                <PaginationItem disabled={currentPage <= 0}>  
                <PaginationLink
                    onClick={e => this.handleClick(e, currentPage - 1)}
                    previous
                    href="#"
                />       
                </PaginationItem>

                 {[...Array((endPage + 1) - startPage).keys()].map((page, i) => 
                <PaginationItem active={i === currentPage} key={i}>
                    <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                    {i +  startPage}
                    </PaginationLink>
                </PaginationItem>
                )}

                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                <PaginationLink
                    onClick={e => this.handleClick(e, currentPage + 1)}
                    next
                    href="#"
                />   
                </PaginationItem>

                <PaginationItem disabled={currentPage >= pagesCount - 1}>
                    <PaginationLink 
                        onClick={e => this.handleClick(e, pagesCount - 1)}
                        last
                        href="#"
                    />
                </PaginationItem>
                
            </Pagination>
          
          </div>

           </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    customer: state.customer.customer,
    isLoading: state.customer.isLoading
})

export default connect(mapStateToProps, { loadAllCustomer })(Customer);