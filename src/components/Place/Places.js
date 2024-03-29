import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Container, Table, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import axios from 'axios';

class Places extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            key: 'name',
            sort_asc: true,
            currentPage: 0,
            place_list: []
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
        axios.get('/place/details', config)
            .then(res => {
                this.setState({
                    place_list: res.data
                })
            })
    }

    sortBy = (e, sortKey) => {
        this.setState({
            key: sortKey,
            sort_asc: !this.state.sort_asc
        })
    }

    render() {
        let filteredPlaces = this.state.place_list.filter(
            (place) => {
                return place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            }
        );

        const { currentPage } = this.state;
        let total_item = Object.keys(filteredPlaces).length;
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

        let SortedPlaces = filteredPlaces.sort((a,b) => {
            if(this.state.sort_asc) return a[this.state.key] > b[this.state.key] ? 1 : -1
            else return a[this.state.key] < b[this.state.key] ? 1 : -1
        });

        return (
            <Container>
            <br/>
            <Input
                 type="search"
                 placeholder="Search by Place"
                 value={this.state.search}
                 onChange={this.updateSearch}
             />
             <br/>
            <Table striped bordered hover responsive>
             <thead>
                 <tr>
                 <th style={{width: '8%'}}>#</th>
                 <th className={this.state.key==="name" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'name')} style={{cursor: "pointer"}}>Place Name</th>
                 <th className={this.state.key==="customers_count" ? (this.state.sort_asc ? "headerSortDown" : "headerSortUp") : ''} onClick={e => this.sortBy(e, 'customers_count')} style={{cursor: "pointer", width: '15%'}}>Total Customers</th>
                 <th style={{width: '15%'}}>Actions</th>
                 </tr>
             </thead> 
             
             { SortedPlaces.slice(
                    currentPage * this.pageSize,
                    (currentPage + 1) * this.pageSize
                    )
                 .map((place, index)=> (
             <tbody key={place.id}>
                 <tr>
                     <th scope="row">{index+1}</th>
                     <td>{place.name}</td>
                     <td>{place.customers_count}</td>
                     <td>
                         <RRNavLink exact to={'/view/'+place.id}><FontAwesomeIcon icon={faEye} style={{color: 'green'}} /> View</RRNavLink>
                     </td>
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

export default Places
