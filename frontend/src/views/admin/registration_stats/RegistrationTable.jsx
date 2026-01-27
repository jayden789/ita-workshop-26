import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import CsvDownloader from 'react-csv-downloader';
import styles from './RegistrationTable.module.css';

const clipboardSymbol = String.fromCharCode(0xd83d, 0xdccb);
const mailSymbol = String.fromCharCode(0xd83d, 0xdce7);
const checkmark = String.fromCharCode(0x2705);
const xmark = String.fromCharCode(0x2717);
const boolCheckmark = bool => (bool ? checkmark : '');

const compactParticipationStatus = status =>
  ({
    ALMOST_CERTAINLY: 'Yes',
    PROBABLY: 'Prob',
    PROBABLY_NOT: 'Prob not',
    NEXT_TIME: 'Next'
  }[status]);

const dayToCompact = day =>
  ({
    '2026-02-08': 'S',
    '2026-02-09': 'M',
    '2026-02-10': 'T',
    '2026-02-11': 'W',
    '2026-02-12': 'R',
    '2026-02-13': 'F',
  }[day]);

/**
 * `days` is an array of date strings like "2020-02-02".
 */
const compactDaysAttending = days =>
  days
    .slice()
    .sort()
    .map(dayToCompact)
    .join('');

const banquetChoiceDisplay = choice =>
  ({
    NOT_ATTENDING: xmark,
    SELF_ONLY: 'Y',
    SELF_PLUS_1: 'Y+1',
    SELF_PLUS_2: 'Y+2'
  }[choice]);

/**
 * rawMoney is a string like '400.00' or '12' or '0.99'.
 */
const formatMoney = rawMoney => {
  if (+rawMoney === 0.0) {
    return '';
  }
  const noTrailingDecimalZero = rawMoney.replace(/\.0+$/, '');
  return `$${noTrailingDecimalZero}`;
};

export default class RegistrationTable extends React.Component {
  toolIconsAccessor = regn => {
    const queryStr = queryString.stringify({ userUrl: regn.userUrl });
    const regnLinkUrl = `/register?${queryStr}`;
    const regnLink = (
      <Link to={regnLinkUrl} title="View registration">
        {clipboardSymbol}
      </Link>
    );

    const mailLinkUrl = `mailto:${regn.userProfile.email}`;
    const mailLink = (
      <a href={mailLinkUrl} title="Email user">
        {mailSymbol}
      </a>
    );

    return (
      <span>
        {regnLink}
        &nbsp;
        {mailLink}
      </span>
    );
  };

  toolIconsColumn = {
    Header: 'Tools',
    id: 'toolIcons',
    accessor: this.toolIconsAccessor,
    className: styles.centeredColumn,
    sortType: 'basic'
  };

  firstNameColumn = {
    Header: 'First name',
    id: 'firstName',
    accessor: regn => regn.userProfile['first_name'],
    sortType: 'basic'

  };

  lastNameColumn = {
    Header: 'Last name',
    id: 'lastName',
    accessor: regn => regn.userProfile['last_name'],
    sortType: 'basic'
  };

  honorificColumn = {
    Header: 'Title',
    id: 'honorific',
    accessor: regn => regn.userProfile['honorific'],
    sortType: 'basic'
  };

  emailColumn = {
    Header: 'Email',
    id: 'email',
    accessor: regn => regn.userProfile['email'],
    sortType: 'basic'
  };

  participationStatusColumn = {
    Header: 'Status',
    id: 'participationStatus',
    accessor: regn => compactParticipationStatus(regn.participationStatus),
    sortType: 'basic'
  };

  registrantNumberColumn = {
    Header: 'Regn. #',
    id: 'registrantNumber',
    accessor: regn => regn.registrantNumber,
    sortType: 'basic'
  };

  isStudentColumn = {
    Header: 'Student?',
    id: 'isStudent',
    accessor: regn => boolCheckmark(regn.userProfile['is_student']),
    className: styles.centeredColumn,
    sortType: 'basic'
  };

  affiliationColumn = {
    Header: 'Affiliation',
    id: 'affiliation',
    accessor: regn => regn.userProfile['affiliation_title'],
    sortType: 'basic'
  };

  attendingDatesColumn = {
    Header: 'Days',
    id: 'attendingDates',
    accessor: regn => compactDaysAttending(regn.attendingDates),
    sortType: 'basic'
  };

  sundayReceptionAccessor = regn => {
    if (regn.options.sundayReception === undefined) {
      return '';
    }
    return {
      NOT_ATTENDING: xmark,
      SELF_ONLY: 'Y',
      SELF_PLUS_1: 'Y+1',
      SELF_PLUS_2: 'Y+2'
    }[regn.options.sundayReception];
  };

  sundayReceptionColumn = {
    Header: 'Sunday reception',
    id: 'sundayReception',
    accessor: this.sundayReceptionAccessor,
    sortType: 'basic'
  };

  mondayLunchAccessor = regn => {
    if (regn.options.mondayLunch === undefined) {
      return '';
    }
    return {
      NOT_ATTENDING: xmark,
      ATTENDING: checkmark
    }[regn.options.mondayLunch];
  };

  mondayLunchColumn = {
    Header: 'Monday lunch',
    id: 'mondayLunch',
    accessor: this.mondayLunchAccessor,
    className: styles.centeredColumn,
    sortType: 'basic'
  };
  banquetSelfColumn = {
    Header: 'Banquet',
    id: 'banquetSelf',
    accessor: regn => banquetChoiceDisplay(regn.options.banquetSelf),
    sortType: 'basic'
  };

  valentinesEventAccessor = regn => {
    if (regn.options.valentinesEvent === undefined) {
      return '';
    }
    return {
      NOT_ATTENDING: xmark,
      SELF_ONLY: 'Y',
      SELF_PLUS_1: 'Y+1',
      SELF_PLUS_2: 'Y+2'
    }[regn.options.valentinesEvent];
  };

  valentinesEventColumn = {
    Header: 'Valentine',
    id: 'valentinesEvent',
    accessor: this.valentinesEventAccessor,
    className: styles.centeredColumn,
    sortType: 'basic'
  };

  registrantTypeColumn = {
    Header: 'Invited?',
    id: 'registrantType',
    accessor: regn => boolCheckmark(regn.registrantType === 'INVITED'),
    className: styles.centeredColumn,
    sortType: 'basic'
  };

  inviterAccessor = regn => {
    if (!regn.inviterUrl) {
      return '';
    }

    const inviter = this.props.getInviterByUrl(regn.inviterUrl);
    if (inviter === undefined) {
      return 'UNKNOWN';
    }

    const {
      first_name: firstName,
      last_name: lastName,
      email,
    } = inviter;
    return `${firstName} ${lastName} <${email}>`;
  };

  inviterColumn = {
    Header: 'Inviter',
    id: 'inviter',
    accessor: this.inviterAccessor
  };

  isPresentingColumn = {
    Header: 'PTY',
    id: 'presenting',
    accessor: regn => boolCheckmark(regn.presenting),
    className: styles.centeredColumn,
    sortType: 'basic'
  };

  isPresentingByDefaultColumn = {
    Header: 'PBD',
    id: 'presentingByDefault',
    accessor: regn => boolCheckmark(regn.userProfile['presenting_default']),
    className: styles.centeredColumn,
    sortType: 'basic'
  };

  talkTitleColumn = {
    Header: 'Title',
    id: 'talkTitle',
    accessor: regn => boolCheckmark(regn.talk.title.length > 0),
    className: styles.centeredColumn,
    sortType: 'basic'
  };

  talkAbstractColumn = {
    Header: 'Abstract',
    id: 'talkAbstract',
    accessor: regn => boolCheckmark(regn.talk.abstract.length > 0),
    className: styles.centeredColumn,
    sortType: 'basic'
  };

  topicCommentColumn = {
    Header: 'Topic Comment',
    id: 'talkTopicComment',
    accessor: regn => boolCheckmark(regn.talk.topic_comment.length > 0),
    className: styles.centeredColumn,
    sortType: 'basic'
  }

  schedulingCommentColumn = {
    Header: 'Scheduling Comment',
    id: 'talkSchedulingComment',
    accessor: regn => boolCheckmark(regn.talk.scheduling_comment.length > 0),
    className: styles.centeredColumn,
    sortType: 'basic'
  }

  feeTypeOverrideColumn = {
    Header: 'Fee type override',
    id: 'feeTypeOverride',
    accessor: 'feeTypeOverride',
    sortType: 'basic'
  };

  hasApprovedPaymentColumn = {
    Header: 'Paid?',
    id: 'hasApprovedPayment',
    accessor: regn => boolCheckmark(regn.hasApprovedPayment),
    className: styles.centeredColumn,
    sortType: 'basic'
  };

  totalFeeAmountColumn = {
    Header: 'Paid amount',
    id: 'approvedPaymentsTotalAmount',
    accessor: regn => formatMoney(regn.approvedPaymentsTotalAmount),
    sortType: 'basic'
  };

  profileColumnGroup = {
    Header: 'Profile',
    columns: [
      this.lastNameColumn,
      this.firstNameColumn,
      this.honorificColumn,
      this.isStudentColumn,
      this.affiliationColumn,
      this.emailColumn
    ],
  };

  attendanceColumnGroup = {
    Header: 'Attendance',
    columns: [
      this.inviterColumn,
      this.registrantTypeColumn,
      this.participationStatusColumn,
      this.registrantNumberColumn,
      this.attendingDatesColumn,
      this.sundayReceptionColumn,
      this.mondayLunchColumn,
      this.banquetSelfColumn,
      /* this.valentinesEventColumn */
    ]
  };

  presentationColumnGroup = {
    Header: 'Presentation',
    columns: [
      this.isPresentingColumn,
      this.isPresentingByDefaultColumn,
      this.talkTitleColumn,
      this.talkAbstractColumn,
      this.schedulingCommentColumn,
      this.topicCommentColumn
    ]
  };

  paymentColumnGroup = {
    Header: 'Payment',
    columns: [
      this.feeTypeOverrideColumn,
      this.hasApprovedPaymentColumn,
      this.totalFeeAmountColumn
    ]
  };

  render() {
    return (
      <div>
        <ReactTable
          columns={[
            this.toolIconsColumn,
            this.profileColumnGroup,
            this.attendanceColumnGroup,
            this.presentationColumnGroup,
            this.paymentColumnGroup
          ]}
          manual
          data={this.props.registrations}
          pages={this.props.numTotalPages}
          loading={this.props.loadingRegns}
          onFetchData={this.props.onFetchData}
          defaultPageSize={1000}
          className="-striped -highlight"
          filterable
          FilterComponent={null}
          sortable={true}
          pageSizeOptions={[25, 50, 100, 250, 500, 1000]}
          style={{
            height: "500px",
            width: "100%"
          }}
        />
      </div>
    );
  }
}
