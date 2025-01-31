import React from 'react';
import { Card, FormGroup, Col, Label, Input, Button } from 'reactstrap';
import { FEETYPE_OPTIONS, REGISTRANT_TYPE_OPTIONS } from '../../const';
import Select from '../../Select';

export default class RegistrationAdmin extends React.Component {
  render() {
    return (
      <Card body>
        <h2>Administrator-only information</h2>
        <FormGroup row className="mt-2">
          <Label md={2}>Original first name</Label>
          <Col md={4}>
            <Input disabled value={this.props.firstNameOriginal} />
          </Col>
          <Label md={2}>Original last name</Label>
          <Col md={4}>
            <Input disabled value={this.props.lastNameOriginal} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Nickname</Label>
          <Col md={4}>
            <Input
              name="nickname"
              placeholder="Nickname here"
              value={this.props.nickname}
              onChange={e => this.props.handleChange(e)}
            />
          </Col>
          <Label md={2}>Original email</Label>
          <Col md={4}>
            <Input disabled value={this.props.emailOriginal} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>User type</Label>
          <Col md={2}>
            <Select
              name="registrantType"
              options={REGISTRANT_TYPE_OPTIONS}
              value={this.props.registrantType}
              onChange={this.props.handleChange}
              disabled={false}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Fee type override</Label>
          <Col md={2}>
            <Select
              name="feetype_override"
              options={FEETYPE_OPTIONS}
              value={this.props.feetype_override}
              onChange={this.props.handleChange}
              disabled={false}
              emptyDisabled={false}
              emptyChildren={'No override'}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Presenting by default</Label>
          <FormGroup className="mr-sm-3" />
          <FormGroup check inline>
            <Label check>
              <Input
                type="radio"
                value="true"
                name="presentingDefault"
                checked={this.props.presentingDefault}
                onChange={e => this.props.handleBinaryOptionChange(e)}
              />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input
                type="radio"
                value="false"
                name="presentingDefault"
                checked={!this.props.presentingDefault}
                onChange={e => this.props.handleBinaryOptionChange(e)}
              />
              No
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Presenting this year</Label>
          <FormGroup className="mr-sm-3" />
          <FormGroup check inline>
            <Label>
              <Input
                type="radio"
                value="true"
                name="adminPresentingThisYear"
                checked={this.props.adminPresentingThisYear}
                onChange={e => this.props.switchPresentingThisYear(e)}
              />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label>
              <Input
                type="radio"
                value="false"
                name="adminPresentingThisYear"
                checked={!this.props.adminPresentingThisYear}
                onChange={e => this.props.switchPresentingThisYear(e)}
              />
              No
            </Label>
          </FormGroup>
          </FormGroup>
          {this.props.adminPresentingThisYear && (
          <FormGroup row>
          <Label md={2}>Presentation type</Label>
          <FormGroup className="mr-sm-3" />
          <FormGroup check inline>
            <Label check>
              <Input
                type="checkbox"
                value="true"
                name="poster"
                checked={this.props.poster}
                onChange={e => this.props.handleCheckboxChange(e)}
              />
              Poster
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input
                type="checkbox"
                value="false"
                name="presentation"
                checked={this.props.presentation}
                onChange={e => this.props.handleCheckboxChange(e)}
              />
              Talk
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input
                type="checkbox"
                value="false"
                name="graduationDay"
                checked={this.props.graduationDay}
                onChange={e => this.props.handleCheckboxChange(e)}
              />
              Graduation Day
            </Label>
          </FormGroup>
          <FormGroup check inline hidden={!this.props.graduationDay}>
            <Label check>
              <Input
                type="checkbox"
                value="false"
                name="graduationTalk"
                checked={this.props.graduationTalk}
                onChange={e => this.props.handleCheckboxChange(e)}
              />
              Talk
            </Label>
          </FormGroup>
          <FormGroup check inline hidden={!this.props.graduationDay}>
            <Label check>
              <Input
                type="checkbox"
                value="false"
                name="graduationPresentation"
                checked={this.props.graduationPresentation}
                onChange={e => this.props.handleCheckboxChange(e)}
              />
              Presentation
            </Label>
          </FormGroup>
        </FormGroup>)}
        <FormGroup row>
        <Label md={2}>Plenary</Label>
        <FormGroup className="mr-sm-3" />
        <FormGroup check inline>
            <Label check>
              <Input
                type="checkbox"
                value="false"
                name="plenary"
                checked={this.props.plenary === true}
                onChange={e => this.props.handleCheckboxChange(e)}
              />
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Inviter</Label>
          <Col md={4}>
            <Input
              type="select"
              name="inviter"
              value={this.props.inviter}
              onChange={e => this.props.handleChange(e)}
            >
              <option>Placeholder Option1</option>
              <option>Placeholder Option2</option>
              <option>Placeholder Option3</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label md={2}>Email</Label>
          <Col md={2}>
            <Button
              onClick={this.props.onClickVerifyEmail}
              disabled={this.props.emailIsVerified}
              color={this.props.emailIsVerified ? null : 'danger'}
            >
              {this.props.emailIsVerified
                ? `Email ${this.props.email} is verified.`
                : `Verify email (${this.props.email})`}
            </Button>
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col>
            <div className="text-center">
              <Button onClick={this.props.saveChanges}>Save all tabs</Button>
              &nbsp;&nbsp; {/* TODO this is crappy, remove this */}
              <Button href={`mailto:${this.props.email}`}>Email user</Button>
            </div>
          </Col>
        </FormGroup>
      </Card>
    );
  }
}
