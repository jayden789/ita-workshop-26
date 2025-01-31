import React from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import classNames from 'classnames';

import Select from '../../Select';
import {
  PARTICIPATION_STATUS_OPTIONS,
  DAY_OPTIONS,
  RECEPTION_OPTIONS,
  BANQUET_SELF_OPTIONS,
  SATURDAY_SELF_OPTIONS,
  /* VALENTINES_EVENT_OPTIONS, */
  LUNCH_OPTIONS,
} from '../../const';
import PaymentPageController from './PaymentPageController';
import RegistrationInfo from './RegistrationInfo';

import styles from './RegistrationWorkshop.module.css';

function dayCheck(firstDay, lastDay) {
  var first;
  var last;
  var logical = true;
  switch (firstDay) {
    case 'Monday':
      first = 1;
      break;
    case 'Tuesday':
      first = 2;
      break;
    case 'Wednesday':
      first = 3;
      break;
    case 'Thursday':
      first = 4;
      break;
    case 'Friday':
      first = 5;
      break;
    case 'Please Select':
      first = -1;
      break;
    default:
      first = -1;
  }
  switch (lastDay) {
    case 'Monday':
      last = 1;
      break;
    case 'Tuesday':
      last = 2;
      break;
    case 'Wednesday':
      last = 3;
      break;
    case 'Thursday':
      last = 4;
      break;
    case 'Friday':
      last = 5;
      break;
    case 'Please Select':
      first = -1;
      break;
    default:
      first = -1;
  }
  if (first > last) {
    logical = false;
  }

  if (first === -1 || last === -1) {
    logical = true;
  }

  return logical;
}

function calculateNumDays(
  nonconsecDays,
  firstDay,
  lastDay,
  mon,
  tues,
  wed,
  thurs,
  fri
) {
  var dayCount = 0;
  var first = 0;
  var last = 0;
  if (nonconsecDays) {
    if (mon) {
      dayCount += 1;
    }
    if (tues) {
      dayCount += 1;
    }
    if (wed) {
      dayCount += 1;
    }
    if (thurs) {
      dayCount += 1;
    }
    if (fri) {
      dayCount += 1;
    }
  } else {
    if (firstDay === 'Monday') {
      first = 0;
    } else if (firstDay === 'Tuesday') {
      first = 1;
    } else if (firstDay === 'Wednesday') {
      first = 2;
    } else if (firstDay === 'Thursday') {
      first = 3;
    } else if (firstDay === 'Friday') {
      first = 4;
    }

    if (lastDay === 'Monday') {
      last = 1;
    } else if (lastDay === 'Tuesday') {
      last = 2;
    } else if (lastDay === 'Wednesday') {
      last = 3;
    } else if (lastDay === 'Thursday') {
      last = 4;
    } else if (lastDay === 'Friday') {
      last = 5;
    }
    if (firstDay !== '' && lastDay !== '') {
      dayCount = last - first;
    }
  }
  if (dayCount > 0) {
    return dayCount;
  } else {
    return 0;
  }
}

function calculatePrice(Price, Count) {
  if (Count >= 0) {
    return Count * Price;
  } else {
    return 0;
  }
}

function calculateSum(option) {
  if (option === 'Please Select') {
    return 0;
  } else if (option === 'ita23_sundayReception_notAttending') {
    return 0;
  } else if (option === 'ita23_sundayReception_selfOnly') {
    return 1;
  } else if (option === 'ita23_sundayReception_selfPlus1') {
    return 2;
  } else if (option === 'ita23_sundayReception_selfPlus2') {
    return 3;
  }
}

function calculateWed(option) {
  return {
    'Please Select': 0,
    ita23_banquetSelf_notAttending: 0,
    ita23_banquetSelf_selfOnly: 1,
    ita23_banquetSelf_selfPlus1: 2,
    ita23_banquetSelf_selfPlus2: 3,
  }[option];
}
function calculateSat(option) {
  return {
    'Please Select': 0,
    ita23_saturdayWorkshop_notAttending: 0,
    ita23_saturdayWorkshop_attending: 1
  }[option];
}

/* function calculateValentines(option) {
  return {
    'Please Select': 0,
    ita22_valentinesEvent_notAttending: 0,
    ita22_valentinesEvent_selfOnly: 1,
    ita22_valentinesEvent_selfPlus1: 2,
    ita22_valentinesEvent_selfPlus2: 3,
  }[option];
} */

// function calculateEvent(boolean) {
//   if (boolean) {
//     return 1;
//   } else {
//     return 0;
//   }
// }

function checkRequired({
  firstName,
  lastName,
  affiliation,
  nonconsecDays,
  firstDay,
  lastDay,
  mon,
  tues,
  wed,
  thurs,
  fri,
  sundayRecep,
  wedBanq,
  dinnerOptions,
  valentinesEvent,
  shirtType,
  shirtSize,
}) {
  const mustNotBeBlank = [
    firstName,
    lastName,
    affiliation,
    sundayRecep,
    wedBanq,
    dinnerOptions,
    valentinesEvent,
    shirtType,
    shirtSize,
  ];
  const nonBlankOk = !mustNotBeBlank.includes('');
  const consecOk = nonconsecDays || ![firstDay, lastDay].includes('');
  const nonconsecOk =
    !nonconsecDays || [mon, tues, wed, thurs, fri].includes(true);

  return nonBlankOk && consecOk && nonconsecOk;
}

// this is hacky. TODO replace with something more robust
const hackyTitleCaseWord = word => {
  return word.slice(0, 1) + word.slice(1).toLowerCase();
};

export default class RegistrationWorkshop extends React.Component {
  render() {
    const daysOk = dayCheck(this.props.firstDay, this.props.lastDay);
    const requiredFieldsOk = checkRequired({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      affiliation: this.props.affiliation,
      nonconsecDays: this.props.nonConsecutiveDays,
      firstDay: this.props.firstDay,
      lastDay: this.props.lastDay,
      mon: this.props.nonConsecMon,
      tues: this.props.nonConsecTue,
      wed: this.props.nonConsecWed,
      thurs: this.props.nonConsecThu,
      fri: this.props.nonConsecFri,
      sundayRecep: this.props.SundayReceptionOption,
      wedBanq: this.props.WednesdayBanquetOption,
      dinnerOptions: this.props.DinnerOptions
    });
    const numDays = calculateNumDays(
      this.props.nonConsecutiveDays,
      this.props.firstDay,
      this.props.lastDay,
      this.props.nonConsecMon,
      this.props.nonConsecTue,
      this.props.nonConsecWed,
      this.props.nonConsecThu,
      this.props.nonConsecFri
    );
    const dayPrice = calculatePrice(this.props.dayPrice, numDays);
    const numSatGuests = calculateSat(this.props.saturdayWorkshopOption);
    const satdayPrice = calculatePrice(this.props.dayPrice,numSatGuests);
    const numSunGuests = calculateSum(this.props.SundayReceptionOption);
    const sunPrice = calculatePrice(this.props.sunReceptionPrice, numSunGuests);
    const numWedGuests = calculateWed(this.props.WednesdayBanquetOption);
    const wedPrice = calculatePrice(this.props.wedBanquetPrice, numWedGuests);
    /*   const valentinesPrice = calculatePrice(
        this.props.valentinesEventPrice,
        calculateValentines(this.props.ValentinesEventOption)
      ); */

    const likelyToParticipate = ['ALMOST_CERTAINLY', 'PROBABLY'].includes(
      this.props.likelihood
    );

    const effectiveFeeTypeText = this.props.effectiveFeeType
      ? hackyTitleCaseWord(this.props.effectiveFeeType)
      : '';

    const paymentAllowed =
      !this.props.isChanged && requiredFieldsOk && daysOk && !this.props.paid && this.props.formReady;
      console.log(requiredFieldsOk,daysOk,!this.props.paid,this.props.formReady)
    const payRelatedFieldsDisabled = this.props.paid || ( this.props.isAdmin ===false ) ;

    return (
      <Card body>
        {this.props.paymentAlert}
        <h2>Your workshop information</h2>
        <RegistrationInfo />
          {(this.props.title === 'MISTER' || this.props.title === 'MISS') && 
          <FormGroup row>
          <Col lg={2}>
            <Label className="text-danger mt-2">Registration type*</Label>
          </Col>
          <Col lg={9} className="mt-2">
            <FormGroup check inline className="mb-0">
              <Label check className="mb-0 mr-4">
                <Input
                  type="radio"
                  value="false"
                  name="studentOption"
                  checked={!this.props.studentOption}
                  onChange={e => {this.props.handleBinaryOptionChange(e)}}
                  className="mb-0"
                  disabled={payRelatedFieldsDisabled}
                />
                Non-student
              </Label>
            </FormGroup>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Student:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="true"
                  name="presentingThisYear"
                  checked={this.props.studentOption && this.props.presentingThisYear}
                  onChange={e => {this.props.handleBinaryOptionChange(e);this.props.switchPresentingThisYear(e);this.props.switchStudentOption(true);this.props.enablePresentationOption('poster')}}
                  className="mb-0"
                  disabled={payRelatedFieldsDisabled}
                />
                Presenting
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="false"
                  name="presentingThisYear"
                  checked={this.props.studentOption&& !this.props.presentingThisYear}
                  onChange={e => {this.props.handleBinaryOptionChange(e);this.props.switchPresentingThisYear(e);this.props.switchStudentOption(true);this.props.disablePresentationOption()}}
                  className="mb-0"
                  disabled={payRelatedFieldsDisabled}
                />
                Non-presenting
              </Label>
            </FormGroup>
            <FormText color="muted" className="mt-0 mb-0">
            Students can present at a poster session. If you are a final-year Ph.D. student or a postdoc and would<br></br> like to be considered for Graduation Day, please ask your supervisor to email us at ita@ucsd.edu.
            </FormText>
            </Col>
            </FormGroup>
          }

          {(this.props.title === 'PROFESSOR' || this.props.title === 'DOCTOR') && 
          <FormGroup row>
          <Col lg={2}>
            <Label className="text-danger mt-2">Presentation*</Label>
          </Col>
          <Col lg={9} className="mt-2">
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="true"
                  name="presentingThisYear"
                  checked={this.props.presentingThisYear}
                  onChange={e => {this.props.handleBinaryOptionChange(e);this.props.switchPresentingThisYear(e);this.props.switchStudentOption(false);this.props.enablePresentationOption('presentation')}}
                  className="mb-0"
                  disabled={payRelatedFieldsDisabled}
                />
                Presenting
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="false"
                  name="presentingThisYear"
                  checked={!this.props.presentingThisYear}
                  onChange={e => {this.props.handleBinaryOptionChange(e);this.props.switchPresentingThisYear(e);this.props.switchStudentOption(false);this.props.disablePresentationOption()}}
                  className="mb-0"
                  disabled={payRelatedFieldsDisabled}
                />
                Non-presenting
              </Label>
            </FormGroup>
            </Col>
            </FormGroup>
          }
          
          <FormGroup row className="mb-0">
            <Col lg={2}>
              <Label className="text-danger mt-2">Participation*</Label>
            </Col>
            <Col lg={8}>
              <Row>
                <Col lg={3}>
                  <Select
                    name="likelihood"
                    options={PARTICIPATION_STATUS_OPTIONS}
                    value={this.props.likelihood}
                    onChange={this.props.handleChange}
                    disabled={payRelatedFieldsDisabled}
                  />
                </Col>
                <Col lg={9}>
                  <FormText>
                    Please indicate your participation likelihood so we can plan
                    and others can see if you are coming.
                  </FormText>
                </Col>
              </Row>
            </Col>
            <Label
              className={classNames('ml-auto', 'mt-2', 'mr-2', {
                [styles.grayText]: !likelyToParticipate,
              })}
            >
              {this.props.effectiveFeeType === 'FULL' ? null : (
                <span>({effectiveFeeTypeText}) </span>
              )}
              <strong>${this.props.basePrice}</strong>
            </Label>
          </FormGroup>

          <FormGroup row className="mb-2 mt-4">
            <Col lg={2}>
              <Label className="text-danger">Days attending*</Label>
            </Col>
            <Col lg={10}>
              <FormText color="muted" className="mt-0 mb-0">
                Days you will attend. We budget the workshop to break even, so
                please select the days accurately.
              </FormText>
              <FormGroup check inline>
                <Label check className="mr-4">
                  <Input
                    type="radio"
                    value="false"
                    name="nonConsecutiveDays"
                    checked={this.props.nonConsecutiveDays === false}
                    onChange={e => this.props.handleBinaryOptionChange(e)}
                    disabled={payRelatedFieldsDisabled}
                  />
                  Consecutive
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    value="true"
                    name="nonConsecutiveDays"
                    checked={this.props.nonConsecutiveDays === true}
                    onChange={e => this.props.handleBinaryOptionChange(e)}
                    disabled={payRelatedFieldsDisabled}
                  />
                  Non-consecutive
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>

          {!this.props.nonConsecutiveDays ? (
            <FormGroup row>
              <Col lg={2}>
                <Label for="firstDay" className="text-danger mt-2">
                  First day*
                </Label>
              </Col>
              <Col lg={2}>
                <Select
                  name="firstDay"
                  options={DAY_OPTIONS}
                  value={this.props.firstDay}
                  onChange={this.props.handleChange}
                  disabled={payRelatedFieldsDisabled}
                />
              </Col>
              <Col lg={{ size: 2, offset: 1 }} className="rightAlign">
                <Label for="lastDay" className="text-danger mt-2">
                  Last day*
                </Label>
              </Col>
              <Col lg={2}>
                <Select
                  name="lastDay"
                  options={DAY_OPTIONS}
                  value={this.props.lastDay}
                  onChange={this.props.handleChange}
                  disabled={payRelatedFieldsDisabled}
                />
              </Col>
              <Label className="ml-auto mt-2 mr-2">
                (${this.props.dayPrice}/day) <strong>${dayPrice}</strong>
              </Label>
            </FormGroup>
          ) : (
              <FormGroup row>
                <Col lg={{ size: 10, offset: 2 }}>
                  <FormGroup check inline>
                    <Label check className="mr-4">
                      <Input
                        type="checkbox"
                        name="nonConsecMon"
                        checked={this.props.nonConsecMon}
                        onChange={e => this.props.handleCheckboxChange(e)}
                        disabled={payRelatedFieldsDisabled}
                      />
                      Monday
                  </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check className="mr-4">
                      <Input
                        type="checkbox"
                        name="nonConsecTue"
                        checked={this.props.nonConsecTue}
                        onChange={e => this.props.handleCheckboxChange(e)}
                        disabled={payRelatedFieldsDisabled}
                      />
                      Tuesday
                  </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check className="mr-4">
                      <Input
                        type="checkbox"
                        name="nonConsecWed"
                        checked={this.props.nonConsecWed}
                        onChange={e => this.props.handleCheckboxChange(e)}
                        disabled={payRelatedFieldsDisabled}
                      />
                      Wednesday
                  </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check className="mr-4">
                      <Input
                        type="checkbox"
                        name="nonConsecThu"
                        checked={this.props.nonConsecThu}
                        onChange={e => this.props.handleCheckboxChange(e)}
                        disabled={payRelatedFieldsDisabled}
                      />
                      Thursday
                  </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check className="mr-4">
                      <Input
                        type="checkbox"
                        name="nonConsecFri"
                        checked={this.props.nonConsecFri}
                        onChange={e => this.props.handleCheckboxChange(e)}
                        disabled={payRelatedFieldsDisabled}
                      />
                      Friday
                  </Label>
                  </FormGroup>
                </Col>
                <Label className="ml-auto mt-2 mr-2">
                  (${this.props.dayPrice}/day) <strong>${dayPrice}</strong>
                </Label>
              </FormGroup>
            )}

          {!daysOk && !this.props.nonConsecutiveDays ? (
            <Alert color="danger">
              The first day you have selected occurs after the last day you have
              selected. Please select a valid date range.
            </Alert>
          ) : null}

          <FormGroup row>
            <Col lg={2}>
              <Label className="text-danger mt-2">Sunday Reception*</Label>
            </Col>
            <Col lg={8}>
            <Row>
            <Col lg={3}>
              <Select
                name="SundayReceptionOption"
                options={RECEPTION_OPTIONS}
                value={this.props.SundayReceptionOption}
                onChange={this.props.handleChange}
                disabled={payRelatedFieldsDisabled}
              />
            </Col>
            <Col lg={9}>
              <FormText color="muted">
              Dinner reception, heavy hors d'oeuvres, starting at 6:15 pm.
              {/* Dinner reception, heavy hors d'oeuvres, starting at 6:15 pm, shortly after the <a href="https://sites.google.com/eng.ucsd.edu/vardymemorialsymposium/home">memorial for Prof. Alex Vardy.</a> If you would like to participate in the memorial itself, please: a) RSVP at the memorial link and indicate there whether you are attending dinner, our department will cover the dinner cost for memorial participants, b) to avoid double counting, list yourself here as *not attending the reception. Note that the memorial RSVP form also lets you indicate whether you would like to say a few words about Alex. */}
              </FormText>
            </Col>
            </Row>
            </Col>
            <Label className="ml-auto mt-2 mr-2">
              (${this.props.sunReceptionPrice}/guest){' '}
              <strong>${sunPrice}</strong>
            </Label>
          </FormGroup>

          {/* <FormGroup row>
            <Col lg={2}>
              <Label className="mt-2">Monday Lunch</Label>
            </Col>
            <Col lg="auto">
              <Select
                name="monReceptionOption"
                options={LUNCH_OPTIONS}
                value={this.props.monReceptionOption}
                onChange={this.props.handleChange}
              />
            </Col>
            <Col lg="auto">
              <FormText color="muted">
                Light lunch for the IT-Society session participants (free, but
                requires this registration)
              </FormText>
            </Col>
          </FormGroup> */}

          <FormGroup row>
            <Col lg={2}>
              <Label className="text-danger mt-2">Wednesday Banquet*</Label>
            </Col>
            <Col lg="auto">
              <Select
                name="WednesdayBanquetOption"
                options={BANQUET_SELF_OPTIONS}
                value={this.props.WednesdayBanquetOption}
                onChange={this.props.handleChange}
                disabled={payRelatedFieldsDisabled}
              />
            </Col>
            <Label className="ml-auto mt-2 mr-2">
              (${this.props.wedBanquetPrice}/guest) <strong>${wedPrice}</strong>
            </Label>
          </FormGroup>

          {/* <FormGroup row>
            <Col lg={2}>
              <Label className="text-danger mt-2">Saturday Workshop</Label>
            </Col>
            <Col lg="auto">
              <Select
                name="saturdayWorkshopOption"
                options={SATURDAY_SELF_OPTIONS}
                value={this.props.saturdayWorkshopOption}
                onChange={this.props.handleChange}
                disabled={payRelatedFieldsDisabled}
              />
            </Col>
            <Col lg="auto">
              <FormText color="muted">
              Tutorials and expository talks on Machine Learning
              </FormText>
            </Col>
            <Label className="ml-auto mt-2 mr-2">
              (${this.props.dayPrice}) <strong>${satdayPrice}</strong>
            </Label>
          </FormGroup> */}
          <FormGroup row>
            <Label className="ml-auto mt-0 mr-2 mb-0">
              <h3>
                <strong>
                  Total: $
                  {this.props.basePrice +
                    dayPrice +
                    sunPrice +
                    wedPrice +
                    satdayPrice}
                </strong>
              </h3>
            </Label>
          </FormGroup>
          <div className="text-center">
            <p className="small mt-0" >Please fill mandatory <font color='red'>fields*</font> before proceeding.</p>
            {/* {this.state.titleError ? <p className="small text-danger mt-0" > Title is a mandatory field</p> : ''}
            {this.state.nameError ? <p className="small text-danger mt-0" > Name is a mandatory field</p> : ''}
            {this.state.affiliationError ? <p className="small text-danger mt-0" > Please select an affiliation to proceed</p> : ''} */}
          </div>
          <FormGroup check row>
            <Col>
              <div className="text-center">
              <form method="post" 
                    action="https://accept.authorize.net/payment/payment" 
                    id="formAuthorizeNetTestPage" 
                    name="formAuthorizeNetTestPage" 
                    
              >
                <Button
                  onClick={this.props.saveChanges}
                  disabled={!this.props.nonConsecutiveDays && !daysOk}
                >
                  Save all tabs
                </Button>
                &nbsp;&nbsp; {/* TODO this is crappy, remove this */}
                  <input type="hidden" name="token" value={this.props.token || ''} />
                  <Button id="registerButton" disabled={!paymentAllowed} >Register (aka Pay)</Button>
                
          
                <div>
                  <p style={{ color: 'red', fontSize: '12px' }}>You can't edit any information anymore, If you think something is wrong  please  <a href="mailto:ita@ucsd.edu">contact us</a>. </p>
                </div>
                {paymentAllowed ? null : this.props.isSavedModal ? (<h4 className='text-center text-danger mt-2'>
                To continue payment, please reload page 
                </h4>)  : (
                  <h4 className="text-center text-danger mt-2">To pay, please save changes and then reload page.</h4>
                )}
                </form>
              </div>
            </Col>
          </FormGroup>

          {/* <p className="text-center mt-4 mb-0">
            Registration is for attendance only. Talk presentation requires a
            separate invitation. If you are interested in presenting a talk, please{' '}
              <a href="mailto:ita@ucsd.edu">contact us</a>.
          </p> */}
          
          
    
          {/* <p className="text-center mt-0">
            To change or cancel your registration, please{' '}
            <a href="mailto:ita@ucsd.edu">contact us</a>. Until January 12th we
            will provide full refund, from January 13th to the 24th 50% refund,
            and starting January 24th, no refund can be offered as we will have
            committed to our vendors.
          </p> */}

        <PaymentPageController
          token={this.props.token}
          formUrl={this.props.formUrl}
          triggerOpen={this.props.triggerOpen}
          onComplete={this.props.onPaymentComplete}
          onCanceled={this.props.onPaymentCanceled}
        />
      </Card >
    );
  }
}
