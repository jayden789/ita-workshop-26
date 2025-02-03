import React from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Media,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
  Tooltip,
} from 'reactstrap';
import classNames from 'classnames';

import { apiConfig } from '../../helpers';
import styles from './RegistrationProfile.module.css';

export default class RegistrationProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePicFile: null,
      profilePicFileUploaded: false,
      profilePicUploadStatus: null,
      profilePicErrorMessage: null,
      formError: true,
      titleError: true,
      nameError: true,
      lastNameError: true,
      affiliationError: true,
      emailError: true,
      tooltipOpen: false,
    };

    this.profilePicInputRef = React.createRef();
  }

  getProfilePicFile = () => {
    if (this.profilePicInputRef.current === null) {
      return null;
    }

    const files = this.profilePicInputRef.current.files;
    if (files.length < 1) {
      return null;
    }
    return files[0];
  };

  onChangeProfilePic = (event) => {
    const profilePicFile = this.getProfilePicFile();
    this.setState({ profilePicFile, profilePicFileUploaded: false });
  };

  handleCheckboxInput = (event) => {
    if (event.target.value == '') {
      this.state.titleError = true;
    } else {
      this.state.titleError = false;
    }
    this.props.handleOptionChange(event);
    this.formError =
      this.nameError &&
      this.lastNameError &&
      this.emailError &&
      this.affiliationError &&
      this.titleError;
  };

  handleFormInput = (event) => {
    if (event.target.name == 'firstName') {
      if (event.target.value.length < 1) {
        this.state.nameError = true;
      } else {
        this.state.nameError = false;
      }
    }
    if (event.target.name == 'lastName') {
      if (event.target.value.length < 1) {
        this.state.lastNameError = true;
      } else {
        this.state.lastNameError = false;
      }
    }
    if (event.target.name == 'affiliation') {
      if (event.target.value == '' || !event.target.value) {
        this.state.affiliationError = true;
      } else {
        this.state.affiliationError = false;
      }
    }
    if (event.target.name == 'email') {
      if (!event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        this.state.emailError = true;
      } else {
        this.state.emailError = false;
      }
    }
    this.props.handleChange(event);
    this.state.formError =
      this.nameError &&
      this.lastNameError &&
      this.emailError &&
      this.affiliationError &&
      this.titleError;
  };

  toggleTooltip = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  };

  onClickUploadProfilePic = (event) => {
    if (this.state.profilePicFile === null) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.state.profilePicFile);

    const fetchConfig = apiConfig('POST', {}, true);
    fetchConfig.body = formData;
    delete fetchConfig.headers['Content-Type'];

    new Promise((resolve) =>
      this.setState(
        {
          profilePicUploadStatus: 'loading',
          profilePicErrorMessage: null,
        },
        resolve
      )
    )
      .then(() => fetch(this.props.addProfilePicUrl, fetchConfig))
      .then((response) => Promise.all([response.ok, response.json()]))
      .then(([success, data]) => {
        if (success) {
          this.props.updateProfilePicUrl(data['profile_pic']);
          this.setState({
            profilePicUploadStatus: 'success',
            profilePicFileUploaded: true,
            profilePicErrorMessage: null,
          });
        } else {
          const errorMessage =
            data.file && data.file.length > 0
              ? data.file[0]
              : 'Unknown upload error.';
          this.setState({
            profilePicUploadStatus: 'failure',
            profilePicErrorMessage: errorMessage,
          });
        }
      });
  };

  render() {
    this.state.titleError = this.props.title == '';
    this.state.nameError = this.props.firstName.length < 1;
    this.state.lastNameError = this.props.lastName.length < 1;
    this.state.affiliationError =
      !this.props.affiliation || this.props.affiliation == '';
    this.state.emailError = !this.props.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    this.state.formError =
      this.state.nameError ||
      this.state.lastNameError ||
      this.state.emailError ||
      this.state.affiliationError ||
      this.state.titleError;

    let affiliations = this.props.affiliations;
    let optionItems = affiliations.map((affiliation) => (
      <option key={affiliation.title} value={affiliation.url}>
        {affiliation.title}
      </option>
    ));

    const hasCurrentProfilePic = (this.props.profilePicUrl || '').length > 0;
    const profilePicElement = hasCurrentProfilePic ? (
      <Media
        object
        src={this.props.profilePicUrl}
        alt="Your current profile picture"
        className={styles.profilePicMedia}
      />
    ) : (
      <p>You currently have no profile picture.</p>
    );

    // Can't upload profile pic if any of these are true:
    // - no profile pic is selected
    // - the selected profile pic has already been successfully uploaded
    // - the selected profile pic is currently being uploaded
    const canUploadProfilePic = !(
      this.getProfilePicFile() === null ||
      this.state.profilePicFileUploaded ||
      this.state.profilePicUploadStatus === 'loading'
    );

    const profilePicSuccess =
      this.state.profilePicUploadStatus === 'success' ? (
        <p className="text-success">
          Your profile picture has been successfully uploaded.
        </p>
      ) : null;
    const profilePicLoading =
      this.state.profilePicUploadStatus === 'loading' ? (
        <p className="text-primary">Uploading profile picture...</p>
      ) : null;
    const profilePicFailure =
      this.state.profilePicUploadStatus === 'failure' ? (
        <p className="text-danger">{this.state.profilePicErrorMessage}</p>
      ) : null;
    const hasProfilePicFeedback =
      profilePicSuccess || profilePicLoading || profilePicFailure;

    return (
      <Card body>
        <Form>
          <h2>Your personal information</h2>
          <FormGroup row>
            <Label className="text-danger customProfileWidth ml-3 mt-2">
              Title*{' '}
            </Label>
            <FormGroup className="mr-sm-3" />
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="MISTER"
                  name="title"
                  checked={this.props.title === 'MISTER'}
                  onChange={(e) => this.handleCheckboxInput(e)}
                  invalid={this.state.titleError}
                />
                Mr.
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="MISS"
                  name="title"
                  checked={this.props.title === 'MISS'}
                  onChange={(e) => this.handleCheckboxInput(e)}
                  invalid={this.state.titleError}
                />
                Ms.
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="DOCTOR"
                  name="title"
                  checked={this.props.title === 'DOCTOR'}
                  onChange={(e) => {
                    this.handleCheckboxInput(e);
                    this.props.enablePresentation();
                    this.props.switchStudentOption(false);
                  }}
                  invalid={this.state.titleError}
                />
                Dr.
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="PROFESSOR"
                  name="title"
                  checked={this.props.title === 'PROFESSOR'}
                  onChange={(e) => {
                    this.handleCheckboxInput(e);
                    this.props.enablePresentation();
                    this.props.switchStudentOption(false);
                  }}
                  invalid={this.state.titleError}
                />
                Prof.
              </Label>
            </FormGroup>
          </FormGroup>
          {/* {this.state.titleError ? <p className="small text-danger mt-0" > Title is a mandatory field</p> : ''} */}
          <FormGroup row>
            <Label
              for="firstName"
              className="text-danger customProfileWidth ml-3 mt-2"
            >
              First Name*
            </Label>
            <Col lg={4}>
              <Input
                name="firstName"
                placeholder="Claude"
                value={this.props.firstName}
                onChange={(e) => this.handleFormInput(e)}
                invalid={this.state.nameError}
              />
            </Col>
            <Label
              for="lastName"
              className="text-danger customProfileWidth ml-3 mt-2"
            >
              Last Name*
            </Label>
            <Col lg={4}>
              <Input
                name="lastName"
                placeholder="Turing"
                value={this.props.lastName}
                onChange={(e) => this.handleFormInput(e)}
                invalid={this.state.lastNameError}
              />
            </Col>
          </FormGroup>
          {/* {this.state.nameError ? <p className="small text-danger mt-0" > Name is a mandatory field</p> : ''} */}

          <FormGroup row className="mb-0">
            <Label
              for="affiliation"
              className="text-danger customProfileWidth ml-3 mt-2"
            >
              Affiliation*
            </Label>
            <Col lg={4}>
              <Input
                type="select"
                name="affiliation"
                placeholder="UCSD"
                value={this.props.affiliation}
                onChange={(e) => this.handleFormInput(e)}
                invalid={this.state.affiliationError}
              >
                <option value={''}>Please Select</option>
                {optionItems}
              </Input>
            </Col>

            <Col>
              <div className="text-left">
                <Button onClick={this.props.toggleModal}>Add New</Button>

                <Modal
                  isOpen={this.props.modal}
                  toggle={this.props.toggleModal}
                >
                  <ModalHeader toggle={this.props.toggleModal}>
                    Add a new affiliation
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      name="newAffiliationTitle"
                      placeholder="Add an affiliation"
                      value={this.props.newAffiliationTitle}
                      onChange={(e) => this.props.handleChange(e)}
                    />
                    <FormText>
                      Please use a concise affiliation name, e.g., "UCSD" rather
                      than "UCSD, CSE Department", or "Company X" rather than
                      "Company X Research".
                    </FormText>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={this.props.postAffiliation}
                    >
                      Save
                    </Button>
                    <Button color="secondary" onClick={this.props.toggleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </Col>
            <Col lg={4} />
          </FormGroup>
          <FormGroup row className="mt-0">
            <Label className="customProfileWidth ml-3 mt-2" />
            <Col lg={10}>
              <FormText>
                Please select your affiliation from the drop-down menu, ideally
                using just the root organization, e.g. “MIT” and not “MIT -
                EECS”. If it is not there, please select “add new” to add it.
              </FormText>
            </Col>
          </FormGroup>
          {/* {this.state.affiliationError ? <p className="small text-danger mt-0" > Please select an affiliation to proceed</p> : ''} */}

          <FormGroup row>
            <Label for="website" className="customProfileWidth ml-3 mt-2">
              Website
            </Label>
            <Col lg={4}>
              <Input
                type="url"
                name="website"
                placeholder="https://ece.ucsd.edu/claude_turing"
                value={this.props.website}
                onChange={(e) => this.props.handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              for="email"
              className="text-danger customProfileWidth ml-3 mt-2"
            >
              Email*
            </Label>
            <Col lg={4}>
              <Input
                type="url"
                name="email"
                placeholder="test@example.com"
                value={this.props.email}
                onChange={(e) => this.handleFormInput(e)}
                invalid={this.state.emailError}
              />
            </Col>
            {this.state.emailError ? (
              <p className="small text-danger mt-0">
                {' '}
                Please add a valid email id
              </p>
            ) : (
              ''
            )}
          </FormGroup>
          <FormGroup row>
            <Label for="phoneNum" className="customProfileWidth ml-3 mt-2">
              Phone
            </Label>
            <Col md={4}>
              <Input
                name="phoneNum"
                placeholder="+1-858-555-1212"
                value={this.props.phoneNum}
                onChange={(e) => this.props.handleChange(e)}
              />
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Label for="profilePic" className="customProfileWidth ml-3 mt-2">
              Picture
            </Label>
            <Col lg={10}>
              <Row>
                <Col lg="auto">{profilePicElement}</Col>
              </Row>
              <Row className="mt-2">
                <Col lg="auto">
                  <Input
                    type="file"
                    name="profilePic"
                    innerRef={this.profilePicInputRef}
                    onChange={this.onChangeProfilePic}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg="auto">
                  <Button
                    onClick={this.onClickUploadProfilePic}
                    disabled={!canUploadProfilePic}
                    color="primary"
                  >
                    Upload
                  </Button>
                </Col>
              </Row>
              {hasProfilePicFeedback ? (
                <Row className="mt-2">
                  <Col lg="auto">
                    {profilePicSuccess}
                    {profilePicLoading}
                    {profilePicFailure}
                  </Col>
                </Row>
              ) : null}
            </Col>
          </FormGroup>
          {/* <h3 className="mb-0">
            Shirt&nbsp;
            <span
              className={classNames(
                'mt-0',
                'mb-sm-3',
                'text-muted',
                styles.shirtHelpText
              )}
            >
              for the personalized t-shirt we plan to make for you
            </span> 
          </h3> */}
          {/* <FormGroup row>
            <Label className="text-danger customProfileWidth mt-2 ml-3">
              Type*
            </Label>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="MENS"
                  name="shirtType"
                  checked={this.props.shirtType === 'MENS'}
                  onChange={e => this.props.handleOptionChange(e)}
                />
                Men's
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  value="WOMENS"
                  name="shirtType"
                  checked={this.props.shirtType === 'WOMENS'}
                  onChange={e => this.props.handleOptionChange(e)}
                />
                Women's
              </Label>
            </FormGroup>
          </FormGroup> */}

          {/* <FormGroup row>
            <Label className="text-danger customProfileWidth mt-2 ml-3">
              Size*
            </Label>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  name="shirtSize"
                  value="SMALL"
                  checked={this.props.shirtSize === 'SMALL'}
                  onChange={e => this.props.handleOptionChange(e)}
                />
                S
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  name="shirtSize"
                  value="MEDIUM"
                  checked={this.props.shirtSize === 'MEDIUM'}
                  onChange={e => this.props.handleOptionChange(e)}
                />
                M
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  name="shirtSize"
                  value="LARGE"
                  checked={this.props.shirtSize === 'LARGE'}
                  onChange={e => this.props.handleOptionChange(e)}
                />
                L
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  name="shirtSize"
                  value="XLARGE"
                  checked={this.props.shirtSize === 'XLARGE'}
                  onChange={e => this.props.handleOptionChange(e)}
                />
                XL
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check className="mr-4">
                <Input
                  type="radio"
                  name="shirtSize"
                  value="XXLARGE"
                  checked={this.props.shirtSize === 'XXLARGE'}
                  onChange={e => this.props.handleOptionChange(e)}
                />
                XXL
              </Label>
            </FormGroup>
          </FormGroup> */}
          <FormGroup check row>
            <Col>
              <div className="text-center">
                <Button
                  disabled={this.state.formError || this.props.loading}
                  onClick={this.props.saveChanges}
                  id="SaveChangesButton"
                >
                  {this.props.loading ? (
                    <Spinner size="sm mr-2">Saving...</Spinner>
                  ) : null}
                  Save all tabs
                </Button>
                &nbsp;&nbsp; {/* TODO this is crappy, remove this */}
                <Button
                  onClick={() => {
                    this.props.toggle('2');
                  }}
                  disabled={this.state.formError || this.props.loading}
                >
                  Next tab
                </Button>
              </div>
            </Col>
          </FormGroup>
        </Form>
        {this.state.formError ? (
          <Tooltip
            isOpen={this.state.tooltipOpen}
            target="SaveChangesButton"
            toggle={this.toggleTooltip}
          >
            Please fill all required fields before saving
          </Tooltip>
        ) : null}
      </Card>
    );
  }
}
