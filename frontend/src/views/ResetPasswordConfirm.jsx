import React from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Container,
  Jumbotron,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Card,
  CardTitle,
} from 'reactstrap';

import ITANavBarMin from './ITANavBarMin';
import { apiRaw } from '../helpers';

export default class ResetPasswordConfirm extends React.Component {
  /**
   * Expects the following props:
   *
   * uid: urlencode(base64encode(userId)) as required by
   *      `/rest-auth/password/reset/confirm` endpoint
   *
   * token: password-reset token as required by
   *      `/rest-auth/password/reset/confirm` endpoint
   */

  constructor(props) {
    super(props);
    const { uid, token } = props;
    this.state = {
      uid: uid,
      token: token,
      newPassword: '',
      newPasswordRepeat: '',

      resetSuccessful: false,
      invalidUidOrToken: false,
      newPasswordInputValid: null,
      newPasswordInputFeedback: '',
      submitButtonDisabled: true,
    };
  }

  componentDidMount = () => {
    this.updatePasswordInputsValidationState({ valid: false, feedback: '' });
  };

  sendResetConfirm = () => {
    const payload = {
      uid: this.state.uid,
      token: this.state.token,
      new_password1: this.state.newPassword,
      new_password2: this.state.newPasswordRepeat,
    };
    return apiRaw('rest-auth/password/reset/confirm/', 'POST', payload);
  };

  validateNewPasswords = () => {
    if (this.state.newPassword.length < 8) {
      return {
        valid: false,
        feedback: 'Password must contain at least 8 characters.',
      };
    }
    if (this.state.newPassword !== this.state.newPasswordRepeat) {
      return { valid: false, feedback: 'Passwords do not match.' };
    }
    return {
      valid: true,
      feedback: '',
    };
  };

  updatePasswordInputsValidationState = ({ valid, feedback }) => {
    const passwordPresent = this.state.newPassword.length > 0;
    const passwordRepeatPresent = this.state.newPasswordRepeat.length > 0;
    if (passwordPresent && passwordRepeatPresent) {
      this.setState({
        newPasswordInputValid: valid,
        newPasswordInputFeedback: feedback,
      });
    } else {
      this.setState({
        newPasswordInputValid: true,
        newPasswordInputFeedback: '',
      });
    }

    this.setState({ submitButtonDisabled: !valid });
  };

  onChangeNewPassword = event => {
    this.setState({ newPassword: event.target.value }, () => {
      const validation = this.validateNewPasswords();
      this.updatePasswordInputsValidationState(validation);
    });
  };

  onChangeNewPasswordRepeat = event => {
    this.setState({ newPasswordRepeat: event.target.value }, () => {
      const validation = this.validateNewPasswords();
      this.updatePasswordInputsValidationState(validation);
    });
  };

  onClickSubmit = event => {
    const { valid } = this.validateNewPasswords();
    if (!valid) {
      console.log('New passwords not valid; not submitting.');
      return;
    }
    const responsePromise = this.sendResetConfirm();
    const statusPromise = responsePromise.then(response =>
      Promise.resolve(response.status)
    );
    const dataPromise = responsePromise.then(response => response.json());
    Promise.all([statusPromise, dataPromise]).then(([status, data]) => {
      this.setState(this.apiFeedbackToState({ status, data }));
    });
  };

  apiFeedbackToState = ({ status, data }) => {
    if (status === 200) {
      return {
        resetSuccessful: true,
      };
    }

    if (status === 400) {
      const uidAndTokenErrors = data['uid'] || data['token'] || [];
      if (uidAndTokenErrors.length > 0) {
        return {
          invalidUidOrToken: true,
        };
      }

      const passwordErrors =
        data['new_password1'] || data['new_password2'] || [];
      if (passwordErrors.length > 0) {
        return {
          newPasswordInputValid: false,
          newPasswordInputFeedback: passwordErrors[0],
        };
      }
    }
  };

  render = () => {
    // The space before the Link element is necessary; do not remove it.
    const successAlert = (
      <Alert color="success">
        Your password has been successfully reset. You may now{' '}
        <Link to="/login">log in</Link> using your new password.
      </Alert>
    );

    // The space before the Link element is necessary; do not remove it.
    const invalidLinkAlert = (
      <Alert color="danger">
        This password reset link appears to be invalid. Please visit the{' '}
        <Link to="/login">login page</Link> to request a new password reset
        link.
      </Alert>
    );

    const passwordsForm = (
      <Form>
        <FormGroup>
          <Label for="newPassword">New password</Label>
          <Input
            type="password"
            name="newPassword"
            value={this.state.newPassword}
            onChange={this.onChangeNewPassword}
            invalid={this.state.newPasswordInputValid ? null : true}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newPasswordRepeat">Repeat new password</Label>
          <Input
            type="password"
            name="newPassword"
            value={this.state.newPasswordRepeat}
            onChange={this.onChangeNewPasswordRepeat}
            invalid={this.state.newPasswordInputValid ? null : true}
          />
          <FormFeedback>{this.state.newPasswordInputFeedback}</FormFeedback>
        </FormGroup>
        <Button
          color="primary"
          onClick={this.onClickSubmit}
          disabled={this.state.submitButtonDisabled}
        >
          Submit
        </Button>
      </Form>
    );

    const showForm = !(
      this.state.resetSuccessful || this.state.invalidUidOrToken
    );

    return (
      <div>
        <div className="navbar">
          <ITANavBarMin />
        </div>
        <Jumbotron fluid>
          <h2 className="text-center mb-3">Password Reset</h2>
          <Card className="mb-3" id="passwordRequirements">
            <CardTitle className="m-2">
              Your password must contain at least 8 characters, including at
              least one letter and one number.
            </CardTitle>
          </Card>

          <Container className="loginContainer">
            {this.state.resetSuccessful && successAlert}
            {this.state.invalidUidOrToken && invalidLinkAlert}
            {showForm && passwordsForm}
          </Container>
        </Jumbotron>
      </div>
    );
  };
}
