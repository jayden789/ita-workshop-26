import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, Container, Jumbotron } from 'reactstrap';

import { apiRaw, isLoggedIn } from '../../helpers';

export default class CreateAccountConfirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { submitStatus: null };
  }

  componentDidMount() {
    if (isLoggedIn()) {
      return;
    }

    const payload = { key: this.props.confirmKey };
    new Promise(resolve => this.setState({ submitStatus: 'loading' }, resolve))
      .then(() =>
        apiRaw('rest-auth/registration/verify-email/', 'POST', payload)
      )
      .then(response => Promise.all([response.ok, response.json()]))
      .then(([success, data]) => {
        this.setState({
          submitStatus: success ? 'success' : 'failure'
        });
      });
  }

  render() {
    if (isLoggedIn()) {
      return <Redirect to={'/'} />;
    }

    const loadingAlert = () => (
      <Alert color="primary">Verifying your email address...</Alert>
    );

    const successAlert = () => (
      <Alert color="success">
        Your email address has been successfully verified. You may now{' '}
        <Link to="/login">log in</Link> using your email address and password.
      </Alert>
    );

    const errorAlert = () => (
      <Alert color="danger">
        Your email address could not be verified. Please try again later, and if
        the error persists, please <a href="mailto:ita@ucsd.edu">contact us</a>{' '}
        with the subject "Email verification error".
      </Alert>
    );

    return (
      <div>
        {this.props.navbar}
        <Jumbotron fluid>
          <h2 className="text-center mb-3">Confirm new user account</h2>
          <Container className="createAccountContainer">
            {this.state.submitStatus === 'loading' ? loadingAlert() : null}
            {this.state.submitStatus === 'success' ? successAlert() : null}
            {this.state.submitStatus === 'failure' ? errorAlert() : null}
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
