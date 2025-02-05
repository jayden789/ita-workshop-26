import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Alert,
  Button,
  Container,
  Jumbotron,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardTitle,
} from 'reactstrap';
import queryString from 'query-string';

import { api } from '../../helpers';

import { createAccount, isLoggedIn } from '../../helpers';

const existingEmailMessage =
  'A user is already registered with this e-mail address.';

const intDivRoundUp = (a, b) => {
  const quotient = Math.floor(a / b);
  const remainder = a % b;
  return quotient + (remainder === 0 ? 0 : 1);
};

const formatFilters = (filtered) => {
  const apiFilters = {};
  filtered.forEach((filter) => {
    switch (filter.id) {
      case 'inviter':
        apiFilters.inviter = filter.value;
        break;
      case 'firstName':
        apiFilters.first_name = filter.value;
        break;
      case 'lastName':
        apiFilters.last_name = filter.value;
        break;
      case 'email':
        apiFilters.email = filter.value;
        break;
      default:
        console.warn(`Unknown filter ID ${filter.id}`);
        break;
    }
  });
  return apiFilters;
};

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
      feedback: [],
      submitStatus: null,
    };
  }

  onChange = (field) => (event) =>
    this.setState({ [field]: event.target.value });

  onChangeFirstName = this.onChange('firstName');
  onChangeLastName = this.onChange('lastName');
  onChangeEmail = this.onChange('email');
  onChangePassword1 = this.onChange('password1');
  onChangePassword2 = this.onChange('password2');

  submitCreateAccount = () => {
    new Promise((resolve) => {
      this.setState({ submitStatus: 'loading', feedback: [] }, resolve);
    })
      .then(() =>
        createAccount(
          this.state.firstName,
          this.state.lastName,
          this.state.email,
          this.state.password1,
          this.state.password2
        )
      )
      .then(({ success, data }) => {
        if (success) {
          this.setState({ submitStatus: 'success', feedback: [] });
          this.fetchRegnData();
          return;
        }

        const feedback = [
          ...(data.firstName || []),
          ...(data.lastName || []),
          ...(data.email || []),
          ...(data.password1 || []),
          ...(data.password2 || []),
          ...(data.non_field_errors || []),
        ];
        this.setState({
          submitStatus: 'failure',
          feedback,
        });
      });
  };

  renderFeedback = () => {
    if (this.state.feedback.length === 0) {
      return null;
    }

    const errorItems = this.state.feedback.map((msg, i) => (
      <li key={i}>{msg}</li>
    ));

    const existingEmail = this.state.feedback.includes(existingEmailMessage) ? (
      <p>
        <Link to="/login">Visit the Login page</Link> to reset your password, or
        if you believe this is incorrect, please{' '}
        <a href="ita@ucsd.edu">contact us</a>.
      </p>
    ) : null;

    return (
      <Alert color="danger">
        <p>Please fix the following errors:</p>
        <ul>{errorItems}</ul>
        {existingEmail}
      </Alert>
    );
  };

  fetchRegnData = () => {
    var pageSize = 1;
    var page = 0;
    var filtered = [{ id: 'email', value: this.state.email }];
    var year = window.location.pathname.split('ws/').pop().split('/')[0];
    if (isNaN(year)) {
      year = '20';
    }
    const queryStr = queryString.stringify({
      workshop_slug: 'ita' + year,
      page: page + 1,
      page_size: pageSize,
      ...formatFilters(filtered),
    });

    new Promise((resolve) => this.setState({ loadingUserData: true }, resolve))
      // need to add 1 to page, since API is 1-indexed and react-table is
      // 0-indexed
      .then(() => api(`api/v0/users_with_registration_data/?${queryStr}`))
      .then(({ results: userData, count: numTotalResults }) => {
        const numTotalPages = intDivRoundUp(numTotalResults, pageSize);
        console.log(userData[0]['user_url']);
        window.location = 'register?userUrl=' + userData[0]['user_url'];
      });
  };

  render() {
    if (isLoggedIn()) {
      if (!this.props.create) return <Redirect to={'/'} />;
    }

    /* const successAlert = () => (
      <Alert color="success">
        Your user account has been created, and before you may log in, you must
        verify your email address. We have emailed instructions to{' '}
        {this.state.email}, which you should receive shortly.
      </Alert>
    ); */

    var successAlert = () => (
      <Alert color="success">
        Your user account has been created. You may now log in with the email
        and password you have just entered.
      </Alert>
    );

    if (this.props.create) {
      this.state.password1 = this.state.password2 =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      successAlert = () => (
        <Alert color="success">The new user account has been created.</Alert>
      );
    }
    const isSubmitting = this.state.submitStatus === 'loading';
    const iscreateclass = this.props.create ? 'backwhite' : null;
    const hasFirstName = this.state.firstName.length > 0;
    const hasLastName = this.state.lastName.length > 0;
    const hasEmail = this.state.email.length > 0;
    const hasPassword1 = this.state.password1.length > 0;
    const hasPassword2 = this.state.password2.length > 0;
    const hasAllInputs =
      !isSubmitting &&
      hasFirstName &&
      hasLastName &&
      hasEmail &&
      hasPassword1 &&
      hasPassword2;
    const passwordsForm = () => (
      <Form>
        <FormGroup>
          <Label for="firstName">First name</Label>
          <Input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChangeFirstName}
            disabled={isSubmitting}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last name</Label>
          <Input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChangeLastName}
            disabled={isSubmitting}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email address</Label>
          <Input
            type="text"
            name="firstName"
            value={this.state.email}
            onChange={this.onChangeEmail}
            disabled={isSubmitting}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password1" hidden={this.props.create}>
            Password
          </Label>
          <Input
            type="password"
            name="password1"
            value={this.state.password1}
            onChange={this.onChangePassword1}
            disabled={isSubmitting}
            hidden={this.props.create}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password2" hidden={this.props.create}>
            Repeat password
          </Label>
          <Input
            type="password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChangePassword2}
            disabled={isSubmitting}
            hidden={this.props.create}
          />
        </FormGroup>
        <Button
          color="primary"
          onClick={this.submitCreateAccount}
          disabled={isSubmitting || !hasAllInputs}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    );

    return (
      <div>
        {this.props.navbar}
        <Card body>
          <Jumbotron fluid className={iscreateclass}>
            <h2 className="text-center mb-3">Create new user account</h2>
            <Container className="createAccountContainer">
              <Card className="mb-3">
                <CardTitle className="m-2">
                  Your password must contain at least 8 characters, including at
                  least one letter and one number.
                </CardTitle>
              </Card>
              {this.renderFeedback()}
              {this.state.submitStatus === 'success'
                ? successAlert()
                : passwordsForm()}
            </Container>
          </Jumbotron>
        </Card>
      </div>
    );
  }
}
