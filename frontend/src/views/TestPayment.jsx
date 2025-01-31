import React from 'react';
import { Button } from 'reactstrap';
import PaymentPageController from './PaymentPageController';

import { api } from '../helpers';

const TEST_REGISTRATION = 'api/v0/registrations/1/';

export default class TestPayment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      formUrl: '',
      checkStatusUrl: '',
      formReady: false,
      triggerOpen: false,
      registrationPaid: false,
    };
  }

  componentDidMount() {
    api(TEST_REGISTRATION, 'GET').then(registration => {
      if (registration.has_approved_payment) {
        this.setState({
          registrationPaid: true,
        });
      } else {
        api(registration.initiate_payment_url, 'POST').then(data =>
          this.setState({
            token: data.token,
            formUrl: data.form_url,
            checkStatusUrl: data.check_status_url,
            formReady: true,
          })
        );
      }
    });
  }

  triggerPaymentCheckStatus = transId => {
    api(this.state.checkStatusUrl, 'POST', {
      transaction_id: transId,
    }).then(data => {
      console.log(data);
    });
  };

  onChangeTriggerOpen = event => {
    this.setState({
      triggerOpen: !this.state.triggerOpen,
    });
  };

  onPaymentComplete = transId => {
    console.log(
      `TestPayment onPaymentComplete callback was called with transId "${transId}".`
    );
    this.triggerPaymentCheckStatus(transId);
  };

  onPaymentCanceled = () => {
    console.log('TestPayment onPaymentCanceled callback was called.');
  };

  render = () => {
    const alreadyPaid = <p>Your registration fees have already been paid.</p>;

    const triggerOpenCheckbox = (
      <div>
        <Button
          id="checkboxTriggerOpen"
          onClick={this.onChangeTriggerOpen}
          disabled={this.state.formReady ? undefined : true}
        >
          triggerOpen
        </Button>
      </div>
    );

    return (
      <div>
        <h1>Test payment page</h1>
        {this.state.formReady ? <p>we ready</p> : <p>not ready</p>}
        {this.state.registrationPaid ? alreadyPaid : triggerOpenCheckbox}
        <PaymentPageController
          token={this.state.token}
          formUrl={this.state.formUrl}
          triggerOpen={this.state.triggerOpen}
          onComplete={this.onPaymentComplete}
          onCanceled={this.onPaymentCanceled}
        />
      </div>
    );
  };
}
