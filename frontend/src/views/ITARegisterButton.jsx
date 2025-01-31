import React from 'react';
import { Card, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class ITARegisterButton extends React.Component {
  render() {
    return (
      <Link to="/register">
        <Card>
          <CardImg src="register-icon-blue.png" id="fixedbutton" alt="" />
        </Card>
      </Link>
    );
  }
}
