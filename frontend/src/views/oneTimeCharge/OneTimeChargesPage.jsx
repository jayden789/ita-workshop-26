import React from 'react';
import { Container, Table, Card } from 'reactstrap';
import clipboardCopy from 'clipboard-copy';

import { api } from '../../helpers';

const clipboardSymbol = String.fromCharCode(0xd83d, 0xdccb);
const linkSymbol = String.fromCharCode(0xd83d, 0xdd17);

const NameAndEmail = ({ recipient }) => (
  <span>
    {recipient.last_name}, {recipient.first_name} &lt;{recipient.email}&gt;
  </span>
);

const HeaderRow = () => (
  <tr>
    <th>Recipient</th>
    <th>Amount</th>
    <th>Message</th>
    <th>Comment</th>
    <th>Status</th>
    <th>Pay link</th>
    <th>Time created</th>
  </tr>
);

const onClickPayLink = payUrl => event => {
  event.preventDefault();
  clipboardCopy(payUrl);
};

const OneTimeChargeRow = ({ charge, ...rowProps }) => (
  <tr {...rowProps}>
    <td>
      <NameAndEmail recipient={charge.recipient} />
    </td>
    <td>${charge.amount}</td>
    <td>
      <pre style={{maxWidth: '40rem'}}>{charge.message}</pre>
    </td>
    <td>
      <pre style={{maxWidth: '40rem'}}>{charge.comment}</pre>
    </td>
    <td>{charge.status}</td>
    <td style={{ textAlign: 'center' }}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        onClick={onClickPayLink(charge.pay_url)}
        title="Copy payment page link to clipboard"
      >
        {clipboardSymbol}
      </a>
      &nbsp;
      <a
        href={charge.pay_url}
        target="_blank"
        rel="noopener noreferrer"
        title="Go to payment page"
      >
        {linkSymbol}
      </a>
    </td>
    <td>{charge.created_on}</td>
  </tr>
);

export default class OneTimeChargesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCharges: false,
      charges: [],
    };
  }

  componentDidMount = () => {
    this.setState({ loadingCharges: true });
    api('api/v0/one_time_charges/').then(data => {
      this.setState({ loadingCharges: false, charges: data });
    });
  };

  render = () => {
    let content;
    if (this.state.loadingCharges) {
      content = <p>Loading...</p>;
    } else {
      const rows = this.state.charges.map((charge, index) => (
        <OneTimeChargeRow charge={charge} key={index} />
      ));
      content = (
        <Table hover bordered>
          <thead>
            <HeaderRow />
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      );
    }

    return (
      <Card body>
      <div class="scrolling">
        <Container fluid style={{ paddingTop: '65px' }}>
          {content}
        </Container>
      </div>
      </Card>
    );
  };
}
