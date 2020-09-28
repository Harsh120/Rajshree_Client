import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "./SubMenu";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Rajshree</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>Mortage Management
        </p>
        <SubMenu title="Home" items={submenus[0]} />
        {/* <SubMenu title="Pages" items={submenus[1]} /> */}
        <NavItem>
          <NavLink tag={Link} to={"/customers"}>  
            Customers List
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/customer/add"}>
            Add New Customer
          </NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink tag={Link} to={"/mortages"}>
              Mortage List
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to={"/contact"}>
            Contact
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "Home 1",
      target: "Home-1",
    },
    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      itle: "Home 3",
      target: "Home-3",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];

export default SideBar;