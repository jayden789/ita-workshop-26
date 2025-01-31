import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Alert,
  Jumbotron,
  Input,
  Col,
  Button,
  Form,
  FormGroup,
  Container,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import { api, login, isLoggedIn } from '../helpers';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    modal: false,
    redirectToReferrer: false,
    redirectToCreateAccount: false,
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  onClickLogin = () => {
    login(this.state.email, this.state.password).then(data => {
      if (data.loginSuccess) {
        this.setState({ redirectToReferrer: true });
        this.props.onLogin();
      } else {
        if (data.non_field_errors) {
          alert(data.non_field_errors);
        } else if (data.email) {
          alert(`Email: ${data.email[0]}`);
        } else if (data.password) {
          alert(`Password: ${data.password[0]}`);
        }
      }
    });
  };

  onClickCreateAccount = () => {
    this.setState({
      redirectToCreateAccount: true,
    });
  };

  resetPassword = () => {
    const body = {
      email: this.state.email,
    };
    api('rest-auth/password/reset/', 'POST', body).then(json => {
      console.log(json);
    });
    this.toggle();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render = () => {
    if (this.state.redirectToCreateAccount) {
      return <Redirect to="/create_account" />;
    }

    let from;
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.from
    ) {
      from = this.props.location.state.from;
    } else {
      from = { pathname: '/' };
    }

    if (isLoggedIn() || this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        {this.props.navbar}
        <Jumbotron fluid>
          <h2 className="text-center mb-3">Log in to ITA Workshop 2019</h2>
          <Container className="loginContainer">
            <Alert color="info">
              We recently migrated to this new website, so your old-website
              password will not work. To select a new password, please enter
              your email address below, then click "Forgot password."
            </Alert>
            <div>
              <Form>
                <FormGroup row>
                  <Label sm={3}>Email address</Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={3}>Password</Label>
                  <Col sm={9}>
                    <Input
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup check row className="mb-2">
                  <Col>
                    <div className="text-center">
                      <Button color="primary" onClick={this.onClickLogin}>
                        Log in
                      </Button>
                      &nbsp;&nbsp; {/* TODO fix this */}
                      <Button onClick={this.resetPassword}>
                        Forgot password
                      </Button>
                      &nbsp;&nbsp; {/* TODO fix this */}
                      <Button onClick={this.onClickCreateAccount}>
                        Create new account
                      </Button>
                    </div>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </Container>
        </Jumbotron>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          {this.state.email !== '' ? (
            <ModalHeader toggle={this.toggle}>
              Password reset email sent!
            </ModalHeader>
          ) : (
            <ModalHeader toggle={this.toggle}>
              Please enter an email.
            </ModalHeader>
          )}
          {this.state.email !== '' ? (
            <ModalBody>
              <p>
                We've emailed you instructions for resetting your password at{' '}
                {this.state.email}, if a user exists with the email you entered.
                You should receive the email shortly.
              </p>
              <p>
                If you don't receive an email, please make sure you've entered
                the address you registered with, and check your spam folder.
              </p>
            </ModalBody>
          ) : (
            <ModalBody>
              <p>
                Please enter an email in the email textbox so we can send you an
                email to reset your password.
              </p>
            </ModalBody>
          )}
          <ModalFooter>
            <Button onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };
}
