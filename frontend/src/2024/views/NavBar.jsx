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
  Badge,
} from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';

export default class NavBar2024 extends React.Component {
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
          style={{ position: 'fixed', zIndex: '100', top: '0' }} // changing to 100 in order to keep it above everything
        >
          <NavbarBrand tag={Link} to="/">
            2024 ITA Workshop
          </NavbarBrand>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/schedule" onClick={this.toggle}>
                  Preliminary schedule <Badge color="primary">New</Badge>
                </NavLink>
              </NavItem>
              {this.props.showAdmin && (
                <NavItem>
                  <NavLink tag={Link} to="/admin" onClick={this.toggle}>
                    Admin
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink tag={Link} to="/#registration" onClick={this.toggle}>
                  Registration
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink tag={Link} to="/#plenaries" onClick={this.toggle}>Plenaries</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/#invited" onClick={this.toggle}>Invited Sessions</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink tag={Link} to="/#location" onClick={this.toggle}>
                  Location
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink tag={Link} to="/#specialevents" onClick={this.toggle}>Special Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/#eata" onClick={this.toggle}>EATA</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink tag={Link} to="#socialevents" onClick={this.toggle}>
                  Social Events
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={Link} to="/#participants" onClick={this.toggle}>
                  Participants
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Other Years
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/">
                    2024
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/2023/">
                    2023
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/2022/">
                    2022
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/2020/">
                    2020
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/2019/">
                    2019
                  </DropdownItem>
                  {/* <DropdownItem href="https://ita.ucsd.edu/workshop/18/"> */}
                  <DropdownItem>2018</DropdownItem>
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
                  <NavLink className="clicky" onClick={this.props.logout}>
                    Logout
                  </NavLink>
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
