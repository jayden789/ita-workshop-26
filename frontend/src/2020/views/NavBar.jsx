import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar
          color="light"
          light
          expand="lg"
          id="navbar"
          style={{ position: 'fixed', 'zIndex': '1', top: '0' }}
        >
          <NavbarBrand tag={Link} to="#">
            2020 ITA Workshop
          </NavbarBrand>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.showAdmin && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/admin/registration_stats">
                      Workshop statistics
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/admin/workshop_participants">
                      Workshop particpants
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/admin/presenters">
                      Presenters
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/admin/user_list">
                      User list
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/admin/email_tool">
                      Email tool
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/admin/one-time-charges">
                      One-time charges
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              <NavItem>
                <NavLink tag={Link} to="#registration" onClick={this.toggle}>Registration</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="#plenaries" onClick={this.toggle}>Plenaries</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="#invited" onClick={this.toggle}>Invited Sessions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="#location" onClick={this.toggle}>Location</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="#specialevents" onClick={this.toggle}>Special Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="#eata" onClick={this.toggle}>EATA</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="#participants" onClick={this.toggle}>Participants</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Other Years
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/">
                      2024
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/2023">
                    2023
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/2022">
                    2022
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/2020">
                    2020
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/2019/">
                    2019
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/18/">
                    2018
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/17/">
                    2017
                  </DropdownItem>
                  <DropdownItem href="http://ita.ucsd.edu/workshop16/index/">
                    2016
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=15&page=home">
                    2015
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=14&page=home">
                    2014
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=13&page=home">
                    2013
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=12&page=home">
                    2012
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=11&page=home">
                    2011
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=10&page=home">
                    2010
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=09&page=home">
                    2009
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=08&page=home">
                    2008
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=07&page=home">
                    2007
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop.php?year=06&page=home">
                    2006
                  </DropdownItem>

                  <DropdownItem divider />
                  <DropdownItem>Close</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {this.props.loggedIn ? (
                <NavItem>
                  <NavLink className="clicky" onClick={this.props.logout}>Logout</NavLink>
                </NavItem>
              ) : (
                  ({
                    /*
                  It can be unintuitive to have both "Login" and "Register"
                  buttons that have the same function, so we'll remove the Login
                  button for now.
                  */
                  },
                  {
                    /*
                  <NavItem>
                    <NavLink tag={Link} to="/login/">
                      Login
                    </NavLink>
                  </NavItem>
                  */
                  },
                    undefined)
                )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
