import React from 'react';

import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ITANavBarMin extends React.Component {
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
      <div id="navbar">
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            ITA Workshop
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
