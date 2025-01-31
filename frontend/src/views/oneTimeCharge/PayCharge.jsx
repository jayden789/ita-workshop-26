import React from 'react';
import { Alert, Container, Button } from 'reactstrap';

import { apiRaw } from '../../helpers';
import PaymentPageController from '../PaymentPageController';

const OpenChargeInfo = ({ amount, message }) => (
  <React.Fragment>
    <p>
      You have been asked to pay a charge of ${amount}, with the following
      message:
    </p>
    <pre>{message}</pre>
    <p>
      Click the Pay button below to complete payment. If you believe this is an
      error, please <a href="mailto:ita@ucsd.edu">contact us</a>.
    </p>
  </React.Fragment>
);

const PaidChargeInfo = ({ amount, message }) => (
  <React.Fragment>
    <p>
      We have received your payment of ${amount} for the one-time charge. The
      charge's original message was:
    </p>
    <pre>{message}</pre>
  </React.Fragment>
);

const CanceledChargeInfo = ({ amount, message }) => (
  <React.Fragment>
    <p>
      This one-time charge of ${amount} has been canceled. The charge's original
      message was:
    </p>
    <pre>{message}</pre>
  </React.Fragment>
);

const PaymentStatus = ({ status }) => {
  if (status === null) {
    return null;
  }

  if (status === 'APPROVED') {
    return <Alert color="success">Your payment has been approved.</Alert>;
  }

  return (
    <Alert color="warning">
      Your payment was not approved, but instead has status "{status}".
    </Alert>
  );
};

/* This is a lazy approach. */
const showServerErrorAlert = () => {
  alert(
    'Unexpected server error. Please try again later, or if this error persists, please contact us at ita@ucsd.edu and provide the URL of this page.'
  );
};

export default class PayCharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCharge: false,
      charge: null,
      loadingInitiatePayment: false,
      paymentToken: '',
      paymentFormUrl: '',
      paymentCheckStatusUrl: '',
      paymentControllerTriggerOpen: false,
      paymentApproved: false,
      paymentStatus: null,
    };
  }

  componentDidMount = () => {
    this.loadCharge(this.props.chargeId);
  };

  loadCharge = chargeId => {
    this.setState({ loadingCharge: true });
    // constructing API URLs isn't ideal but it'll do for now
    apiRaw(`api/v0/one_time_charges/${chargeId}`)
      .then(res => Promise.all([res.ok, res.ok ? res.json() : res.text()]))
      .then(([success, data]) => {
        this.setState({ loadingCharge: false });
        if (success) {
          this.setState({ charge: data });
        } else {
          console.log(`Failure: ${data}`);
          showServerErrorAlert();
        }
      });
  };

  onClickPay = () => {
    const { initiate_payment_url: initiatePaymentUrl } = this.state.charge;

    this.setState({ loadingInitiatePayment: true });
    apiRaw(initiatePaymentUrl, 'POST')
      .then(res => Promise.all([res.ok, res.ok ? res.json() : res.text()]))
      .then(([success, data]) => {
        this.setState({ loadingInitiatePayment: false });
        if (success) {
          this.setState({
            paymentToken: data.token,
            paymentFormUrl: data.form_url,
            paymentCheckStatusUrl: data.check_status_url,
            paymentControllerTriggerOpen: true,
          });
        } else {
          console.log(`Failure: ${data}`);
          showServerErrorAlert();
        }
      });
  };

  onPaymentComplete = transactionId => {
    console.log(`Controller completed with transactionId = ${transactionId}`);

    const payload = { transaction_id: transactionId };
    this.setState({ loadingCheckStatus: true });
    apiRaw(this.state.paymentCheckStatusUrl, 'POST', payload)
      .then(res => Promise.all([res.ok, res.ok ? res.json() : res.text()]))
      .then(([success, data]) => {
        this.setState({ loadingCheckStatus: false });
        if (success) {
          const { charge_payment, charge } = data;
          this.setState({ charge, paymentStatus: charge_payment.status });
        } else {
          console.log(`Failure: ${data}`);
          showServerErrorAlert();
        }
      });
  };

  onPaymentCanceled = () => {
    this.setState({ paymentControllerTriggerOpen: false });
  };

  render() {
    let chargeInfo = null;
    const { status, amount, message } = this.state.charge || {};
    if (this.state.loadingCharge) {
      chargeInfo = <p>Loading charge information...</p>;
    } else if (status === 'OPEN') {
      chargeInfo = <OpenChargeInfo amount={amount} message={message} />;
    } else if (status === 'PAID') {
      chargeInfo = <PaidChargeInfo amount={amount} message={message} />;
    } else if (status === 'CANCELED') {
      chargeInfo = <CanceledChargeInfo amount={amount} message={message} />;
    }

    const loading =
      this.state.loadingCharge ||
      this.state.loadingInitiatePayment ||
      this.state.loadingCheckStatus;
    const payAllowed = status === 'OPEN' && !loading;

    return (
      <div style={{ paddingTop: '65px' }}>
        {/* paddingTop above is needed to offset fixed-position navbar */}
        {this.props.navbar}
        <Container>
          <h1>Pay one-time charge</h1>
          <PaymentStatus status={this.state.paymentStatus} />
          {chargeInfo}
          {status === 'OPEN' ? (
            <Button
              color="primary"
              onClick={this.onClickPay}
              disabled={!payAllowed}
            >
              Pay
            </Button>
          ) : null}
        </Container>
        <PaymentPageController
          token={this.state.paymentToken}
          formUrl={this.state.paymentFormUrl}
          triggerOpen={this.state.paymentControllerTriggerOpen}
          onComplete={this.onPaymentComplete}
          onCanceled={this.onPaymentCanceled}
        />
      </div>
    );
  }
}
