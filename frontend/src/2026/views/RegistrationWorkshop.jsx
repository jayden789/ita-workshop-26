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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
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
  BANQUET_GUEST_OPTIONS,
} from '../../const';
// import PaymentPageController from './PaymentPageController';
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
  return {
    '': 0,
    'Please Select': 0,
    ita26_sundayReception_notAttending: 0,
    ita26_sundayReception_selfOnly: 1,
    ita26_sundayReception_selfPlus1: 2,
    ita26_sundayReception_selfPlus2: 3,
  }[option] ?? 0;
}


function calculateWed(option) {
  return {
    '': 0,
    'Please Select': 0,
    ita26_banquetSelf_notAttending: 0,
    ita26_banquetSelf_selfOnly: 1,
    ita26_banquetSelf_selfPlus1: 2,
    ita26_banquetSelf_selfPlus2: 3,
  }[option] ?? 0; // safe fallback
}
function calculateSat(option) {
  return {
    '': 0,
    'Please Select': 0,
    ita25_saturdayWorkshop_notAttending: 0,
    ita25_saturdayWorkshop_attending: 1,
  }[option];
}

function calculateItalt(option) {
  return {
    '': 0,
    ita25_italt_attending: 1,
    ita25_italt_notAttending: 0,
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
  // dinnerOptions,
  // valentinesEvent,
  // shirtType,
  // shirtSize,
  // banquetOption,
}) {
  const mustNotBeBlank = [
    firstName,
    lastName,
    affiliation,
    sundayRecep,
    wedBanq,
    // dinnerOptions,
    // valentinesEvent,
    // shirtType,
    // shirtSize,
    // banquetOption,
  ];
  const nonBlankOk = !mustNotBeBlank.includes('');
  const consecOk = nonconsecDays || ![firstDay, lastDay].includes('');
  const nonconsecOk =
    !nonconsecDays || [mon, tues, wed, thurs, fri].includes(true);

  // const numWedGuests = calculateWed(wedBanq);
  // const banquetOptionOk =
  //   numWedGuests === 0 ||
  //   (banquetOption && banquetOption.length === numWedGuests);

   return nonBlankOk && consecOk && nonconsecOk ;//&& banquetOptionOk
}

// this is hacky. TODO replace with something more robust
const hackyTitleCaseWord = (word) => {
  return word.slice(0, 1) + word.slice(1).toLowerCase();
};

export default class RegistrationWorkshop extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
    };
  }

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
      // dinnerOptions: this.props.DinnerOptions,
      // banquetOption: this.props.banquetOption,
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
    const satdayPrice = calculatePrice(this.props.dayPrice, numSatGuests);
    const numSunGuests = calculateSum(this.props.SundayReceptionOption);
    const sunPrice = calculatePrice(this.props.sunReceptionPrice, numSunGuests);
    const numWedGuests = calculateWed(this.props.WednesdayBanquetOption);
    const wedPrice = calculatePrice(this.props.wedBanquetPrice, numWedGuests);
    const numItalt = calculateItalt(this.props.attendingITALT);
    const italtPrice = numItalt * this.props.italtPrice;
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
      this.props.paymentRequired &&
      !this.props.isChanged &&
      requiredFieldsOk &&
      daysOk &&
      !this.props.paid ;
      // && this.props.formReady;

    const payRelatedFieldsDisabled = this.props.paid;

    const toggle = () => {
      this.setState({
        modal: !this.state.modal,
      });
    };

    const totalPrice =  this.props.basePrice +
                        dayPrice +
                        sunPrice +
                        wedPrice +
                        satdayPrice +
                        italtPrice;
    var registerType = this.props.studentOption ? "S" : "R";
    if (totalPrice === 370 && dayPrice/this.props.dayPrice === 3) {
      registerType = registerType + "33"
    } else if (totalPrice === 420 && dayPrice/this.props.dayPrice === 4) {
      registerType = registerType + "43"
    } else if (totalPrice === 470 && dayPrice/this.props.dayPrice === 5) {
      registerType = registerType + "53"
    } else if (totalPrice === 555 && dayPrice/this.props.dayPrice === 3) {
      registerType = registerType + "33"
    } else if (totalPrice === 630 && dayPrice/this.props.dayPrice === 4) {
      registerType = registerType + "43"
    } else if (totalPrice === 705 && dayPrice/this.props.dayPrice === 5) {
      registerType = registerType + "53"
    }
    const paymentUrl = 'https://commerce.cashnet.com/UCSD_ITA' + registerType + "_Pay$" + totalPrice;
    return (
      <Card body className="notranslate">
        {this.props.paymentAlert}
        <h2>Your workshop information</h2>
        <RegistrationInfo />
        {(this.props.title === 'MISTER' || this.props.title === 'MISS') && (
          <FormGroup row>
            <Col lg={2}>
              <Label className="text-danger mt-2">Registration type*</Label>
            </Col>
            <Col lg={9} className="mt-2">
              <Row>
                <Col lg={5}>
                  <FormGroup check inline className="mb-0">
                    <Label check className="mb-0 mr-4">
                      <Input
                        type="radio"
                        value="false"
                        name="studentOption"
                        checked={!this.props.studentOption}
                        onChange={(e) => {
                          this.props.handleBinaryOptionChange(e);
                        }}
                        className="mb-0"
                        disabled={payRelatedFieldsDisabled}
                      />
                      Non-student
                    </Label>
                    <Label check className="mb-0 mr-4">
                      <Input
                        type="radio"
                        value="true"
                        name="studentOption"
                        checked={this.props.studentOption}
                        onChange={(e) => {
                          this.props.handleBinaryOptionChange(e);
                        }}
                        className="mb-0"
                        disabled={payRelatedFieldsDisabled}
                      />
                      Student
                    </Label>
                  </FormGroup>
                </Col>
                <Col lg={7}>
                  <FormText color="muted" className="mt-0 mb-0">
                    This selection determines your registration fees and
                    presentation type. Once you pay, you will not be able to
                    change this field.
                  </FormText>
                </Col>
              </Row>
              {/* <FormText color="muted" className="mt-0 mb-0">
                Students can present at a poster session. If you are a
                final-year Ph.D. student or a postdoc and would<br></br> like to
                be considered for Graduation Day, please ask your supervisor to
                email us at ita@ucsd.edu.
              </FormText> */}
            </Col>
          </FormGroup>
        )}

        <FormGroup row className="mb-0">
          <Col lg={2}>
            <Label className="text-danger mt-2">Participation*</Label>
          </Col>
          <Col lg={8}>
            <Row>
              <Col lg={3}>
                <Input
                  type="select"
                  name="likelihood"
                  value={this.props.likelihood}
                  onChange={this.props.handleChange}
                  disabled={payRelatedFieldsDisabled}
                >
                  <option value={''}>Please Select</option>
                  <option value={'ALMOST_CERTAINLY'}>Almost Surely</option>
                  <option value={'PROBABLY'}>Probably</option>
                  <option value={'PROBABLY_NOT'}>Probably Not</option>
                  <option value={'NEXT_TIME'}>Next Time</option>
                </Input>
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
                  onChange={(e) => this.props.handleBinaryOptionChange(e)}
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
                  onChange={(e) => this.props.handleBinaryOptionChange(e)}
                  disabled={payRelatedFieldsDisabled}
                />
                Non-consecutive
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>

        {!this.props.nonConsecutiveDays ? (
          <FormGroup row className="mb-1 mt-2">
            <Col lg={2}>
              <Label for="firstDay" className="text-danger mt-2">
                First day*
              </Label>
            </Col>
            <Col lg={2}>
              <Input
                type="select"
                name="firstDay"
                value={this.props.firstDay}
                onChange={this.props.handleChange}
                disabled={payRelatedFieldsDisabled}
              >
                <option value={''}>Please Select</option>
                <option value={'Monday'}>Monday</option>
                <option value={'Tuesday'}>Tuesday</option>
                <option value={'Wednesday'}>Wednesday</option>
                <option value={'Thursday'}>Thursday</option>
                <option value={'Friday'}>Friday</option>
              </Input>
            </Col>
            <Col lg={{ size: 2, offset: 1 }} className="rightAlign">
              <Label for="lastDay" className="text-danger mt-2">
                Last day*
              </Label>
            </Col>
            <Col lg={2}>
              <Input
                type="select"
                name="lastDay"
                value={this.props.lastDay}
                onChange={this.props.handleChange}
                disabled={payRelatedFieldsDisabled}
              >
                <option value={''}>Please Select</option>
                <option value={'Monday'}>Monday</option>
                <option value={'Tuesday'}>Tuesday</option>
                <option value={'Wednesday'}>Wednesday</option>
                <option value={'Thursday'}>Thursday</option>
                <option value={'Friday'}>Friday</option>
              </Input>
            </Col>
            <Label
              className={classNames('ml-auto', 'mt-2', 'mr-2', {
                [styles.grayText]: !likelyToParticipate,
              })}
            >
              (${this.props.dayPrice}/day) <strong>${dayPrice}</strong>
            </Label>
          </FormGroup>
        ) : (
          <FormGroup row className="mb-1 mt-2">
            <Col lg={{ size: 10, offset: 2 }}>
              <FormGroup check inline>
                <Label check className="mr-4">
                  <Input
                    type="checkbox"
                    name="nonConsecMon"
                    checked={this.props.nonConsecMon}
                    onChange={(e) => this.props.handleCheckboxChange(e)}
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
                    onChange={(e) => this.props.handleCheckboxChange(e)}
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
                    onChange={(e) => this.props.handleCheckboxChange(e)}
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
                    onChange={(e) => this.props.handleCheckboxChange(e)}
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
                    onChange={(e) => this.props.handleCheckboxChange(e)}
                    disabled={payRelatedFieldsDisabled}
                  />
                  Friday
                </Label>
              </FormGroup>
            </Col>
            <Label
              className={classNames('ml-auto', 'mt-2', 'mr-2', {
                [styles.grayText]: !likelyToParticipate,
              })}
            >
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

        <FormGroup row className="mb-1 mt-2">
          <Col lg={2}>
            <Label className="text-danger mt-2">Sunday Reception*</Label>
          </Col>
          <Col lg={8}>
            <Row>
              <Col lg={3}>
                <Input
                  type="select"
                  name="SundayReceptionOption"
                  value={this.props.SundayReceptionOption}
                  onChange={this.props.handleChange}
                  disabled={payRelatedFieldsDisabled}
                >
                  <option value={''}>Please Select</option>
                  <option value={'ita26_sundayReception_notAttending'}>
                    Not attending
                  </option>
                  <option value={'ita26_sundayReception_selfOnly'}>You</option>
                  {/* <option value={'ita26_sundayReception_selfPlus1'}>
                    You + 1
                  </option>
                  <option value={'ita26_sundayReception_selfPlus2'}>
                    You + 2
                  </option> */}
                </Input>
              </Col>
              <Col lg={9}>
                <FormText color="muted">
                  Dinner reception, heavy hors d'oeuvres, starting at 6:15 pm.
                  {/* Dinner reception, heavy hors d'oeuvres, starting at 6:15 pm, shortly after the <a href="https://sites.google.com/eng.ucsd.edu/vardymemorialsymposium/home">memorial for Prof. Alex Vardy.</a> If you would like to participate in the memorial itself, please: a) RSVP at the memorial link and indicate there whether you are attending dinner, our department will cover the dinner cost for memorial participants, b) to avoid double counting, list yourself here as *not attending the reception. Note that the memorial RSVP form also lets you indicate whether you would like to say a few words about Alex. */}
                </FormText>
              </Col>
            </Row>
          </Col>
          <Label
            className={classNames('ml-auto', 'mt-2', 'mr-2', {
              [styles.grayText]: !likelyToParticipate,
            })}
          >
            (${this.props.sunReceptionPrice}/guest) <strong>${sunPrice}</strong>
          </Label>
        </FormGroup>

        <FormGroup row className="mb-1 mt-2">
          <Col lg={2}>
            <Label className="text-danger mt-2">Wednesday Banquet*</Label>
          </Col>
          <Col lg={8}>
            <Row>
              <Col lg={3}>
                <Input
                  type="select"
                  name="WednesdayBanquetOption"
                  value={this.props.WednesdayBanquetOption}
                  onChange={this.props.handleChange}
                  disabled={payRelatedFieldsDisabled}
                >
                  <option value={''}>Please Select</option>
                  <option value={'ita26_banquetSelf_notAttending'}>
                    Not attending
                  </option>
                  <option value={'ita26_banquetSelf_selfOnly'}>You</option>
                  {/* <option value={'ita26_banquetSelf_selfPlus1'}>You + 1</option>
                  <option value={'ita26_banquetSelf_selfPlus2'}>You + 2</option> */}
                </Input>
              </Col>
            </Row>
          </Col>

          <Label
            className={classNames('ml-auto', 'mt-2', 'mr-2', {
              [styles.grayText]: !likelyToParticipate,
            })}
          >
            (${this.props.wedBanquetPrice}/guest) <strong>${wedPrice}</strong>
          </Label>
        </FormGroup>

        {/* {numWedGuests > 0 ? (
          <FormGroup row className="mb-1 mt-2">
            <Col lg={2}>
              <Label className="text-danger mt-2">Choose your entrée*</Label>
            </Col>
            <Col lg={8}>
              <Row>
                {Array.from(new Array(numWedGuests)).map((_, idx) => (
                  <Col key={idx} lg={3}>
                    <Select
                      name="banquetOption"
                      options={BANQUET_GUEST_OPTIONS}
                      value={this.props.banquetOption?.[idx] ?? ''}
                      onChange={(e) => {
                        this.props.handleBanquetOptionChange(e, idx);
                      }}
                      disabled={payRelatedFieldsDisabled}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </FormGroup>
        ) : null} */}

        <FormGroup row>
          <Label
            className={classNames('ml-auto mt-0 mr-2 mb-0', {
              [styles.grayText]: !likelyToParticipate,
            })}
          >
            <h3>
              <strong>
                Total: $
                {likelyToParticipate
                  ? this.props.basePrice +
                    dayPrice +
                    sunPrice +
                    wedPrice +
                    satdayPrice +
                    italtPrice
                  : 0.00}
              </strong>
            </h3>
          </Label>
        </FormGroup>
        <FormGroup check row>
          <Col>
            <div className="text-center">
              <Button
                onClick={this.props.saveChanges}
                // disable since workshop is closed
                // disabled={!requiredFieldsOk ||
                //           (!this.props.nonConsecutiveDays && !daysOk) ||
                //           this.props.loading
                // }
                // disabled
                className="mr-3"
              >
                {this.props.loading ? (
                  <Spinner size="sm mr-2">Saving...</Spinner>
                ) : null}
                Save all tabs
              </Button>
              <Button
                onClick={() => {
                  this.props.saveChanges();
                  this.props.toggle('3');
                }}
                disabled={
                  !requiredFieldsOk ||
                  (!this.props.nonConsecutiveDays && !daysOk) ||
                  this.props.loading
                }
                className="mr-3"
              >
                Next tab
              </Button>
              <a  hidden={ !paymentAllowed || this.props.paid }
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href={ paymentUrl} 
                  className="btn btn-secondary"
              >
                Register (aka Pay)
              </a>

              {/* <Button hidden disabled={!paymentAllowed} onClick={toggle}>
                Register (aka Pay)
              </Button> */}
              {paymentAllowed || this.props.paid ? null : (
                <div style={{ display: 'grid', placeItems: 'center' }}>
                  <Alert
                    color="danger"
                    className="mt-2 p-2"
                    style={{ width: '600px' }}
                  >
                    Please Save your options for the pay button to be enabled.
                    <br></br>
                    If there is anything wrong, please contact us through ita@ucsd.edu.
                  </Alert>
                </div>
              )}
            </div>
          </Col>
          {/* <div className="text-center">
            <Button
              className="text-center mt-4"
              disabled={true}
              color="primary"
            >
              We are updating the payment gateway, we will let you know when you
              can pay.
            </Button>
          </div> */}
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

        {/* <PaymentPageController
          token={this.props.token}
          formUrl={this.props.formUrl}
          triggerOpen={this.props.triggerOpen}
          onComplete={this.props.onPaymentComplete}
          onCanceled={this.props.onPaymentCanceled}
        /> */}
        {/* <Modal isOpen={this.state.modal} toggle={toggle}>
          <ModalHeader toggle={toggle} className="text-danger">
            IMPORTANT MESSAGE
          </ModalHeader>
          <ModalBody>
            We are about to forward you to UCSD's Authorize.net payment site.
            After you press the <span className={styles.blueText}>Pay</span>{' '}
            button, you'll see the final payment page.{' '}
            <span className={styles.dangerText}>
              Please make sure to click the
            </span>{' '}
            <span className={styles.blueText}>Click for Receipt</span> button,
            as that will{' '}
            <span className={styles.dangerText}>
              mark you as paid and generate your receipt.
            </span>
          </ModalBody>
          <ModalFooter>
            <form
              method="post"
              action={this.props.formUrl}
              id="formAuthorizeNetTestPage"
              name="formAuthorizeNetTestPage"
            >
              <input
                type="hidden"
                name="token"
                value={this.props.token || ''}
              />
              <Button color="secondary" onClick={toggle} className="mr-2">
                Cancel
              </Button>
              <Button id="registerButton" color="primary">
                Continue
              </Button>{' '}
            </form>
          </ModalFooter>
        </Modal> */}
      </Card>
    );
  }
}
