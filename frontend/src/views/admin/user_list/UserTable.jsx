import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import CreateChargeModal from '../../oneTimeCharge/CreateChargeModal';

import styles from './UserTable.module.css';

const clipboardSymbol = String.fromCharCode(0xd83d, 0xdccb);
const mailSymbol = String.fromCharCode(0xd83d, 0xdce7);
const banknoteSymbol = String.fromCharCode(0xd83d, 0xdcb5);
const checkmark = String.fromCharCode(0x2705);
const boolCheckmark = bool => (bool ? checkmark : '');

export default class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createChargeModalOpen: false,
      createChargeModalUserData: null,
    };
  }

  createChargeLinkHandlerForUser = userData => event => {
    event.preventDefault();
    this.setState({
      createChargeModalOpen: true,
      createChargeModalUserData: userData,
    });
  };

  toolIconsAccessor = userData => {
    const queryStr = queryString.stringify({ userUrl: userData.user_url });
    const regnLinkUrl = `/register?${queryStr}`;
    const regnLink = (
      <Link to={regnLinkUrl} title="View registration">
        {clipboardSymbol}
      </Link>
    );

    const mailLinkUrl = `mailto:${userData.email}`;
    const mailLink = (
      <a href={mailLinkUrl} title="Email user">
        {mailSymbol}
      </a>
    );

    const createChargeLink = (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        href="#"
        onClick={this.createChargeLinkHandlerForUser(userData)}
        title="Create one-time charge"
      >
        {banknoteSymbol}
      </a>
    );

    return (
      <span>
        {regnLink}
        &nbsp;
        {mailLink}
        &nbsp;
        {createChargeLink}
      </span>
    );
  };

  toolIconsColumn = {
    Header: 'Tools',
    id: 'toolIcons',
    accessor: this.toolIconsAccessor,
    className: styles.centeredColumn,
  };

  firstNameColumn = {
    Header: 'First name',
    id: 'firstName',
    accessor: userData => userData['current_first_name'],
    Filter: ReactTableDefaults.FilterComponent,
  };

  lastNameColumn = {
    Header: 'Last name',
    id: 'lastName',
    accessor: userData => userData['current_last_name'],
    Filter: ReactTableDefaults.FilterComponent,
  };

  honorificColumn = {
    Header: 'Title',
    id: 'honorific',
    accessor: userData => userData['current_honorific'],
  };

  emailColumn = {
    Header: 'Email',
    id: 'email',
    accessor: userData => userData['email'],
    Filter: ReactTableDefaults.FilterComponent,
  };

  affiliationColumn = {
    Header: 'Affiliation',
    id: 'affiliation',
    accessor: userData => userData['current_affiliation_title'],
  };

  isInvitedColumn = {
    Header: 'Invited?',
    id: 'registrantType',
    accessor: userData => boolCheckmark(userData['current_invited']),
    className: styles.centeredColumn,
  };

  inviterAccessor = userData => {
    const { current_inviter_url: inviterUrl } = userData;
    if (!inviterUrl) {
      return '';
    }

    const inviter = this.props.getInviterByUrl(inviterUrl);
    if (inviter === undefined) {
      return 'UNKNOWN';
    }

    const { first_name: firstName, last_name: lastName, email } = inviter;
    return `${firstName} ${lastName} <${email}>`;
  };

  inviterColumn = {
    Header: 'Inviter',
    id: 'inviter',
    accessor: this.inviterAccessor,
    Filter: ReactTableDefaults.FilterComponent,
  };

  isPresentingColumn = {
    Header: 'Presenting this year',
    id: 'presenting',
    accessor: userData => boolCheckmark(userData['current_presenting']),
    className: styles.centeredColumn,
  };

  isPresentingByDefaultColumn = {
    Header: 'Presenting by default',
    id: 'presentingByDefault',
    accessor: userData => boolCheckmark(userData['current_presenting_default']),
    className: styles.centeredColumn,
  };

  profileColumnGroup = {
    Header: 'Profile',
    columns: [
      this.lastNameColumn,
      this.firstNameColumn,
      this.honorificColumn,
      this.affiliationColumn,
      this.emailColumn,
    ],
  };

  workshopColumnGroup = {
    Header: 'Workshop',
    columns: [
      this.isInvitedColumn,
      this.inviterColumn,
      this.isPresentingColumn,
      this.isPresentingByDefaultColumn,
    ],
  };

  render() {
    return (
      <div>
        <ReactTable
          columns={[
            this.toolIconsColumn,
            this.profileColumnGroup,
            this.workshopColumnGroup,
          ]}
          manual
          data={this.props.allUserData}
          pages={this.props.numTotalPages}
          loading={this.props.loadingUserData}
          onFetchData={this.props.onFetchData}
          defaultPageSize={100}
          className="-striped -highlight"
          filterable
          FilterComponent={null}
          sortable={false}
          pageSizeOptions={[100, 250, 500, 1000, 5000]}
        />
        <CreateChargeModal
          isOpen={this.state.createChargeModalOpen}
          toggle={this.toggleCreateChargeModal}
          userData={this.state.createChargeModalUserData}
        />
      </div>
    );
  }

  toggleCreateChargeModal = () => {
    this.setState(prevState => ({
      createChargeModalOpen: !prevState.createChargeModalOpen,
    }));
  };
}
