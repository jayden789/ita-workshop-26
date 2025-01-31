import React from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

import Select from '../../../Select';
import { apiRaw } from '../../../helpers';

import styles from './EmailTool.module.css';

// TODO these should eventually be fetched from an API endpoint
const MAILING_LIST_OPTIONS = [
  { value: 'current_user_only', displayText: 'Just myself' },
  { value: 'unsent_users', displayText: 'Unsent Users 1' },
  { value: 'staff', displayText: 'Admins' },
  { value: 'all_users', displayText: 'All users' },
  { value: 'all_student_users', displayText: 'All students' },
  { value: 'all_non_student_users_pbd', displayText: 'Presenting-by-default non-students users' },
  { value: 'all_non_student_users_non_pbd_non_ucsd', displayText: 'Non-presenting-by-default non-students ucsd users' },
  { value: 'all_non_student_users_ucsd', displayText: 'Non-students ucsd users' },
  { value: 'participating', displayText: 'All participants in current workshop' },
  { value: 'participating_students', displayText: 'Student participants in current workshop' },
  { value: 'presenting_but_missing_title', displayText: 'Presenters without a talk title'},
  {
    value: 'participating_non_students',
    displayText: 'Non-student participants',
  },
  {
    value: 'presenting_but_missing_talk_info',
    displayText:
      'Participating and presenting, but missing talk title and topic comment',
  },
  {
    value: 'presenting_but_missing_coauthors',
    displayText:
      'Participating and presenting, but missing coauthors',
  },
  {
    value: 'pbd_without_participation_status',
    displayText: 'Presenting-by-default users, without participation status',
  },
  {
    value: 'invited_by_ucsd_faculty_inviter',
    displayText: 'Invited by UCSD Faculty Inviter',
  },
  {
    value: 'invited_by_ucsd_student_inviter',
    displayText: 'Invited by UCSD Student Inviter',
  },{
    value: 'prof_or_doc_not_presenting',
    displayText: 'Prof or Doc attending but not presenting',
  },{
    value: 'participating_and_presenting',
    displayText: 'Participating and presenting',
  },{
    value: 'participating_and_not_presenting',
    displayText: 'Participating and not presenting',
  },{
    value: 'attending_on_monday',
    displayText: 'Attending on Monday',
  },{
    value: 'attending_on_tuesday',
    displayText: 'Attending on Tuesday',
  },{
    value: 'attending_on_wednesday',
    displayText: 'Attending on Wednesday',
  },{
    value: 'unpaid_particiapants',
    displayText : 'Unpaid Participants exlcluding EXEMPT and WAIVED'
  },{
    value: 'attending_on_thursday',
    displayText: 'Attending on Thursday',
  },{
    value: 'attending_on_friday',
    displayText: 'Attending on Friday',
  },{
    value: 'attending_on_saturday',
    displayText: 'Attending on Saturday',
  }, {
    value: 'attending_sunday_reception',
    displayText: 'Attending Sunday Reception',
  }, {
    value: 'ucsd_students',
    displayText: 'UCSD students',
  },  {
    value: 'ucsd_faculty',
    displayText: 'UCSD faculty',
  },  {
    value: 'first_500_users',
    displayText: 'First 500 users (1-500)',
  },  {
    value: 'second_1000_users',
    displayText: 'Second 1000 users (501-1500)',
  },  {
    value: 'third_1000_users',
    displayText: 'Third 1000 users (1501-2500)',
  },  {
    value: 'fourth_1000_users',
    displayText: 'Fourth 1000 users (2501-3500)',
  },  {
    value: 'fifth_1000_users',
    displayText: 'Fifth 1000 users (3501-4500)',
  },  {
    value: 'sixth_1000_users',
    displayText: 'Sixth 1000 users (4501-)',
  },  {
    value: 'unsent_users(2023)',
    displayText: 'Unsent users (2500+229-3500, 3500+622-4500)',
  }
];

const SUPPORTED_VARS = [
  '$first_name',
  '$last_name',
  '$full_name',
  '$formal_name',
  '$formal_last_name',
  '$affiliation_title',
];

const DEFAULT_BODY_TEMPLATE = `Dear $formal_last_name,

Welcome to ITA 2022.

Here is the website: <a href="https://example.com" target="_blank" rel="noopener noreferer">example.com</a>`;

export default class ITAEmailTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSubject: '',
      emailBodyTemplate: DEFAULT_BODY_TEMPLATE,
      emailRecipients: MAILING_LIST_OPTIONS[0].value,
      loadingVerify: false,
      loadingSend: false,
      currentValuesVerified: false,
      verifyErrorText: '',
      verifiedRecipients: [],
      verifiedPreviews: [],
      numMessagesSent: 0,
    };
  }

  performVerify = () => {
    this.setState({
      loadingVerify: true,
      currentValuesVerified: false,
    });

    const payload = {
      subject: this.state.emailSubject,
      body: this.state.emailBodyTemplate,
      recipient_mailing_list: this.state.emailRecipients,
    };

    // TODO remove delay
    return new Promise(resolve => setTimeout(resolve, 2000))
      .then(() => apiRaw('api/v0/mail/verify_message/', 'POST', payload))
      .then(response => Promise.all([response.status, response.json()]))
      .then(([status, data]) => {
        this.setState({ loadingVerify: false });

        if (status === 200) {
          this.setState({
            currentValuesVerified: true,
            verifyErrorText: '',
            verifiedRecipients: data.recipients,
            verifiedPreviews: data.previews,
          });
        } else {
          this.setState({
            verifyErrorText: JSON.stringify(data, null, 2),
            verifiedRecipients: [],
            verifiedPreviews: [],
          });
        }
      });
  };

  performSend = () => {
    this.setState({
      loadingSend: true,
    });

    const payload = {
      subject: this.state.emailSubject,
      body: this.state.emailBodyTemplate,
      recipient_mailing_list: this.state.emailRecipients,
    };

    // TODO remove delay
    return new Promise(resolve => setTimeout(resolve, 2000))
      .then(() => apiRaw('api/v0/mail/send_message/', 'POST', payload))
      .then(response => Promise.all([response.status, response.json()]))
      .then(([status, data]) => {
        this.setState({ loadingSend: false });

        if (status === 200) {
          this.setState({ numMessagesSent: data.num_sent });
        } else {
          this.setState({
            currentValuesVerified: false,
            verifyErrorText: JSON.stringify(data, null, 2),
            verifiedRecipients: [],
            verifiedPreviews: [],
          });
        }
      });
  };

  onEmailRecipientsChange = event => {
    this.setState({
      currentValuesVerified: false,
      emailRecipients: event.target.value,
    });
  };

  onEmailSubjectChange = event => {
    this.setState({
      currentValuesVerified: false,
      emailSubject: event.target.value,
    });
  };

  onEmailBodyTemplateChange = event => {
    this.setState({
      currentValuesVerified: false,
      emailBodyTemplate: event.target.value,
    });
  };

  render() {
    const loading = this.state.loadingVerify || this.state.loadingSend;
    const canEditForm = !loading && this.state.numMessagesSent === 0;
    const canVerify =
      !loading &&
      this.state.numMessagesSent === 0 &&
      this.state.emailSubject !== '' &&
      this.state.emailBodyTemplate !== '';
    const canSend =
      !loading &&
      this.state.numMessagesSent === 0 &&
      this.state.currentValuesVerified;

    return (
      <Card body>
      <Container fluid={true}>
        {this.props.navbar}
        <Container>
          <Form>
            <VerifyErrorAlert errorText={this.state.verifyErrorText} />
            <FormGroup row>
              <Label lg={2}>
                <strong>Recipients</strong>
              </Label>
              <Col lg={10}>
                <Select
                  name="emailRecipients"
                  options={MAILING_LIST_OPTIONS}
                  value={this.state.emailRecipients}
                  onChange={this.onEmailRecipientsChange}
                  disabled={!canEditForm}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label lg={2}>
                <strong>Subject</strong>
              </Label>
              <Col lg={10}>
                <Input
                  name="emailSubject"
                  placeholder="Subject line..."
                  value={this.state.emailSubject}
                  onChange={this.onEmailSubjectChange}
                  disabled={!canEditForm}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label lg={2}>
                <strong>Body template</strong>
              </Label>
              <Col lg={10}>
                <Input
                  type="textarea"
                  name="emailBodyTemplate"
                  placeholder="Message body..."
                  value={this.state.emailBodyTemplate}
                  onChange={this.onEmailBodyTemplateChange}
                  rows={16}
                  disabled={!canEditForm}
                />

                <FormText>
                  You may use these variables in the body template:{' '}
                  {SUPPORTED_VARS.join(', ')}
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col className="text-center">
                <Button
                  onClick={this.performVerify}
                  disabled={!canVerify}
                  color="primary"
                  className="ml-2"
                >
                  {this.state.loadingVerify ? 'Verifying...' : 'Verify'}
                </Button>
              </Col>
            </FormGroup>
          </Form>
          <hr />
          <VerifiedMessagePanel
            recipients={this.state.verifiedRecipients}
            previews={this.state.verifiedPreviews}
          />
          <hr />
          <SendButtonPanel
            verified={this.state.currentValuesVerified}
            enabled={canSend}
            loading={this.loadingSend}
            numMessagesSent={this.state.numMessagesSent}
            onClick={this.performSend}
          />
        </Container>
      </Container>
      </Card>
    );
  }
}

const SendButtonPanel = ({
  verified,
  enabled,
  loading,
  numMessagesSent,
  onClick,
}) => {
  if (numMessagesSent > 0) {
    return (
      <Alert color="success">
        Message successfully sent to {numMessagesSent} recipients! To send
        another message, please refresh the page.
      </Alert>
    );
  }

  return (
    <Row className="text-center">
      <Col>
        {verified ? (
          <p className="text-danger">
            WARNING: This action cannot be undone. Please check that the message
            previews are satisfactory before clicking "Send".
          </p>
        ) : (
            <p>
              You must <strong>Verify</strong> the message and recipients before
              you may send.
          </p>
          )}
        <Button onClick={onClick} disabled={!enabled} color="danger">
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </Col>
    </Row>
  );
};

const VerifyErrorAlert = ({ errorText }) => {
  if (errorText === '') {
    return null;
  }

  return (
    <Alert color="danger">
      The server returned the following errors:
      <pre>{errorText}</pre>
    </Alert>
  );
};

const VerifiedMessagePanel = ({ recipients, previews }) => {
  const recipientItems = recipients.map(
    ({ first_name, last_name, email }, index) => (
      <li key={index}>
        {first_name} {last_name} ({email})
      </li>
    )
  );

  const recipientList = recipientItems.length ? (
    <ol>{recipientItems}</ol>
  ) : (
      'none'
    );

  const previewCards = previews.map(
    ({ from, to, subject, body, bcc }, index) => (
      <Card key={index} className={styles.previewCard}>
        <CardHeader>
          From: {from}
          <br />
          To: {to.join('; ')}
          <br />
          BCC: {(bcc || []).join('; ')}
          <br />
          Subject: {subject}
        </CardHeader>
        <CardBody dangerouslySetInnerHTML={{ __html: body }} />
      </Card>
    )
  );

  return (
    <Container>
      <Row>
        <Col md={4}>
          <h3>Recipient list</h3>
          {recipientList}
        </Col>
        <Col md={8}>
          <h3>Message previews</h3>
          {previewCards}
        </Col>
      </Row>
    </Container>
  );
};
