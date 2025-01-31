import React from 'react';

const callParentFunction = str => {
  const strValid = str && str.length > 0;
  const channelOpen =
    window.parent &&
    window.parent.parent &&
    window.parent.parent.AuthorizeNetChannel &&
    window.parent.parent.AuthorizeNetChannel.onReceiveCommunication;
  if (strValid && channelOpen) {
    window.parent.parent.AuthorizeNetChannel.onReceiveCommunication(str);
  } else {
    console.error(
      'This page is not on the same domain as the page containing the iframe!'
    );
  }
};

const receiveMessage = event => {
  if (event && event.data) {
    callParentFunction(event.data);
  }
};

export default class IframeCommunicator extends React.Component {
  componentDidMount() {
    window.addEventListener('message', receiveMessage, false);
    if (window.location.hash && window.location.hash.length > 1) {
      callParentFunction(window.location.hash.substring(1));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', receiveMessage, false);
  }

  render = () => (
    <p>
      This page is used only for communication between the ITA website, and the
      Authorize.net hosted payment page.
    </p>
  );
}
