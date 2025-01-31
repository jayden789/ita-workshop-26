import React from 'react';
import { Card, Form, FormGroup, Label, Input, Col, Button, Alert } from 'reactstrap';

export default class ITAEmailToolVerify extends React.Component {
  render() {

    return (
      <Card body>
        <Form>
        <h3>Verify</h3>
        <FormGroup row>
          <Label lg={2}>
            <strong>Recipients:</strong>
          </Label>
          <Col lg={10} className="mt-2">
            <Label>{this.props.emailRecipients}</Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label lg={2}>
            <strong>Subject:</strong>
          </Label>
          <Col lg={10}>
            <Label>{this.props.emailSubject}</Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label lg={2}>
            <strong>Message Body:</strong>
          </Label>
          <Col lg={10}>
            <Input
              type="textarea"
              name="emailMsgBody"
              value={this.props.emailMsgBody}
              readOnly
            />
          </Col>
        </FormGroup>
        <h3>Send</h3>
        <FormGroup row>
          <Col className="text-center">
            <Alert color="danger">
              Please make sure the information in the "Verify" section is correct. Once you click Send, emails will be sent out to all recipients and cannot be undone.
            </Alert>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="text-center">
            <Button>
              Send
            </Button>
          </Col>
        </FormGroup>
        </Form>
      </Card>
    );
  }
}
