import React from 'react';
import queryString from 'query-string';

import { Modal, ModalBody } from 'reactstrap';

const parseIframeResponse = query => {
  const params = queryString.parse(query);
  const data = {
    action: params.action,
  };
  if (params.action === 'transactResponse') {
    const response = JSON.parse(params.response);
    data.transId = response.transId;
  }
  return data;
};

export default class PaymentPageController extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();

    this.state = {
      modalOpen: false,
    };
  }

  componentDidMount() {
    window.AuthorizeNetChannel = {
      onReceiveCommunication: this.onIframeResponse,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.triggerOpen === false && this.props.triggerOpen === true) {
      this.setState({
        modalOpen: true,
      });
    }
  }

  componentWillUnmount() {
    window.AuthorizeNetChannel = {
      onRecieveCommunication: () => {
        console.error('Received iframe communication while modal closed!');
      },
    };
  }

  onModalOpened = () => {
    this.formRef.current.submit();
  };

  onIframeResponse = response => {
    const data = parseIframeResponse(response);
    switch (data.action) {
      case 'resizeWindow':
        // no.
        break;
      case 'cancel':
        this.setState({ modalOpen: false });
        this.props.onCanceled();
        break;
      case 'transactResponse':
        this.setState({ modalOpen: false });
        this.props.onComplete(data.transId);
        break;
      default:
        console.error(`Iframe response had unknown action ${data.action}.`);
        break;
    }
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  frame = (
    <iframe
      name="paymentPageFrame"
      title="Payment page frame"
      frameBorder="0"
      width="100%"
      height="800"
    />
  );

  render = () => {
    return (
      <div>
        <form
          method="post"
          action={this.props.formUrl}
          target="paymentPageFrame"
          display="none"
          ref={this.formRef}
        >
          <input type="hidden" name="token" value={this.props.token} />
        </form>
        <Modal
          isOpen={this.state.modalOpen}
          onOpened={this.onModalOpened}
          size="lg"
        >
          <ModalBody>{this.frame}</ModalBody>
        </Modal>
      </div>
    );
  };
}
