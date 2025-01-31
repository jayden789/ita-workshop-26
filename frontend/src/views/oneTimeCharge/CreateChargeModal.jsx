import React from 'react';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import { apiRaw } from '../../helpers';

const CreateChargeForm = ({
  amount,
  message,
  comment,
  onChangeAmount,
  onChangeMessage,
  onChangeComment,
  disabled,
}) => (
  <Form>
    <FormGroup>
      <Label for="amount">Amount (required)</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <Input
          name="amount"
          value={amount}
          onChange={onChangeAmount}
          readOnly={disabled}
          required
        />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Label for="message">Message to recipient (required)</Label>
      <Input
        type="textarea"
        name="message"
        value={message}
        onChange={onChangeMessage}
        readOnly={disabled}
        required
        minLength={1}
        maxLength={2000}
        rows={8}
      />
    </FormGroup>
    <FormGroup>
      <Label for="comment">Comment (optional and not shown to recipient)</Label>
      <Input
        type="textarea"
        name="comment"
        value={comment}
        onChange={onChangeComment}
        readOnly={disabled}
      />
    </FormGroup>
  </Form>
);

const ChargeCreatedAlert = ({ payChargeUrl }) =>
  payChargeUrl === null ? null : (
    <Alert color="success">
      The one-time-charge has been successfully created. The recipient can pay
      the charge at this URL:{' '}
      <a href={payChargeUrl} target="_blank" rel="noopener noreferrer">
        {payChargeUrl}
      </a>
    </Alert>
  );

const initialState = {
  amount: 1,
  message: '',
  comment: '',
  loadingCreate: false,
  chargeCreated: false,
  payChargeUrl: null,
};

export default class CreateChargeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate = prevProps => {
    if (!prevProps.isOpen && this.props.isOpen) {
      this.setState(initialState);
    }
  };

  setStateFromEvent = stateKey => event => {
    this.setState({ [stateKey]: event.target.value });
  };

  onChangeAmount = this.setStateFromEvent('amount');
  onChangeMessage = this.setStateFromEvent('message');
  onChangeComment = this.setStateFromEvent('comment');

  performCreateCharge = () => {
    this.setState({ loadingCreate: true });
    const payload = {
      recipient_url: this.props.userData['user_url'],
      amount: this.state.amount,
      message: this.state.message,
      comment: this.state.comment,
    };
    apiRaw('api/v0/one_time_charges/', 'POST', payload)
      .then(response =>
        Promise.all([
          response.ok,
          response.ok ? response.json() : response.text(),
        ])
      )
      .then(([success, data]) => {
        this.setState({ loadingCreate: false });
        if (success) {
          this.setState({ payChargeUrl: data['pay_url'], chargeCreated: true });
        } else {
          alert(`Server returned error: ${JSON.stringify(data)}`);
        }
      });
  };

  render() {
    const { isOpen, toggle, userData } = this.props;
    const {
      email,
      current_first_name: firstName,
      current_last_name: lastName,
    } = userData || {};

    const formDisabled = this.state.loadingCreate || this.state.chargeCreated;
    const canSubmit =
      this.state.amount &&
      this.state.message &&
      !this.state.loadingCreate &&
      !this.state.chargeCreated;

    return (
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        keyboard={false}
        backdrop="static"
        size="lg"
      >
        <ModalHeader>Create one-time charge</ModalHeader>
        <ModalBody>
          <p>
            Complete this form to create a "one-time charge" for the listed
            recipient (payer). When the recipient pays the charge, they will be
            shown the amount and message specified below, but they will{' '}
            <em>not</em> be shown the comment (meant for bookkeeping notes).
          </p>
          <ChargeCreatedAlert payChargeUrl={this.state.payChargeUrl} />
          <p>
            Recipient: {lastName || '(no last name)'},{' '}
            {firstName || '(no first name)'} <EmailText email={email} />
          </p>
          <CreateChargeForm
            amount={this.state.amount}
            comment={this.state.comment}
            message={this.state.message}
            onChangeAmount={this.onChangeAmount}
            onChangeMessage={this.onChangeMessage}
            onChangeComment={this.onChangeComment}
            disabled={formDisabled}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.performCreateCharge}
            disabled={!canSubmit}
          >
            Submit
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const EmailText = ({ email }) =>
  email ? (
    <a href={`mailto:${email}`}>&lt;{email}&gt;</a>
  ) : (
    <span>(no email)</span>
  );
