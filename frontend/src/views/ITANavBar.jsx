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

export default class ITANavBar extends React.Component {
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
          <NavbarBrand tag={Link} to="/">
            ITA Workshop
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
                      Registration statistics
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
                <NavLink tag={Link} to="/#plenaries" onClick={this.toggle}>Plenaries</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/#outline" onClick={this.toggle}>Outline</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/#talks" onClick={this.toggle}>Talks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/#location" onClick={this.toggle}>Location</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/#eata" onClick={this.toggle}>EATA</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/#specialevents" onClick={this.toggle}>Special Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/#participants" onClick={this.toggle}>Participants</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/schedule/">Full Schedule</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register/">Registration</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Other Years
                </DropdownToggle>
                <DropdownMenu right>
                <DropdownItem href="https://ita.ucsd.edu/ws/">
                    20
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/ws/19">
                    19
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/18/">
                    18
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/17/">
                    17
                  </DropdownItem>
                  <DropdownItem href="http://ita.ucsd.edu/workshop16/index/">
                    16
                  </DropdownItem>
                  {/* <DropdownItem href="https://ita.ucsd.edu/workshop/15/">
                    15
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/14/">
                    14
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/13/">
                    13
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/12/">
                    12
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/11/">
                    11
                  </DropdownItem>
                  <DropdownItem href="https://ita.ucsd.edu/workshop/10/">
                    10
                  </DropdownItem> */}
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
