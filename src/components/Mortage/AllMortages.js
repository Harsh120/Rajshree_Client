import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { NavLink as RRNavLink } from 'react-router-dom';
import { Container, Input, Table, Pagination, PaginationItem, PaginationLink, Badge } from 'reactstrap';
import axios from 'axios';
import Moment from 'moment';

class AllMortages extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            key: 'id',
            sort_asc: false,
            currentPage: 0,
            mortages_list: []
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

    componentDidMount() {
        const token = localStorage.getItem('token');
    
        // Header
        const config = {
            headers: {
                "Content-type": "applicaton/json",
                "Authorization": "Bearer " + token
            }
        }
        axios.get('./mortages', config)
            .then(res => {
                this.setState({
                    mortages_list: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    sortBy = (e, sortKey) => {
        this.setState({
            key: sortKey,
            sort_asc: !this.state.sort_asc
        })
    }

    render() {
        let filteredMortages = this.state.mortages_list.filter(
            (mortage) => {
                return mortage.items.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                mortage.weight.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                mortage.amount.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                mortage.customer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                mortage.mortage_at.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ;
            }
        );

        const { currentPage } = this.state;
        let total_item = Object.keys(filteredMortages).length;
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

        let SortedMortages = filteredMortages.sort((a,b) => {
            if(this.state.key === 'customer.name') 
            {
                if(this.state.sort_asc) return a['customer']['name'] > b['customer']['name'] ? 1 : -1
                else return a['customer']['name'] < b['customer']['name'] ? 1 : -1
            }
            else if(this.state.key === 'status.name') 
            {
                if(this.state.sort_asc) return a['status']['name'] > b['status']['name'] ? 1 : -1
                else return a['status']['name'] < b['status']['name'] ? 1 : -1
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

                <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th className={this.state.key==="items" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'items')} style={{cursor: "pointer"}}>Items</th>
                    <th className={this.state.key==="weight" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'weight')} style={{cursor: "pointer"}}>Weight</th>
                    <th className={this.state.key==="amount" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'amount')} style={{cursor: "pointer"}}>Amount</th>
                    <th className={this.state.key==="mortage_at" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'mortage_at')} style={{cursor: "pointer"}}>Date</th>
                    <th className={this.state.key==="customer.name" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'customer.name')} style={{cursor: "pointer"}}>Customer</th>
                    <th className={this.state.key==="status.name" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'status.name')} style={{cursor: "pointer"}}>Status</th>
                    <th>View</th>
                    </tr>
                </thead> 

                { SortedMortages.slice(
                        currentPage * this.pageSize,
                        (currentPage + 1) * this.pageSize
                        )
                    .map((mortage, index)=> (
                <tbody key={mortage.id}>
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{mortage.items}</td>
                        <td>{mortage.weight}</td>
                        <td>{mortage.amount}</td>
                        <td>{Moment(mortage.mortage_at).format('DD/MM/YYYY')}</td>
                        <td>{mortage.customer.name}</td>
                        {/* <td>{mortage.status.name}</td> */}
                        <td>{ (mortage.status.name === 'Cleared') 
                        ? <Badge color="success" pill style={{fontSize: 15}}>Cleared</Badge>
                        : <Badge color="warning" pill style={{fontSize: 15}}>Not Cleared</Badge>
                    }</td>
                        <td><RRNavLink exact to={{
                            pathname: '/mortage',
                            state: {
                                id: mortage.id
                            }
                        }}
                        ><FontAwesomeIcon icon={faEye} style={{color: 'green'}} /> View</RRNavLink></td>
                    </tr>
                </tbody> ))
                }  
                </Table>
                
            <div className="pagination-wrapper">
            
            { pagesCount>1 
             ? <Pagination>
                
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
          : ''}
          </div>

           </Container>
        );
    }
}

export default AllMortages;