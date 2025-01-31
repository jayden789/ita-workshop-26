import React from 'react';
import {
  FormGroup,
  Label,
  Input,
  Col,
  FormText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

export default class RegistrationPaperAuthor extends React.Component {
  render() {
    return (
      <div>
        <FormGroup row>
          <Label for="firstName" className="paperLabelWidth ml-3 mt-2">
            <strong>Author</strong>
          </Label>
          <Col lg={10}>
            <p className="mt-2 mb-0">
              Please enter all authors,
              <span className="text-danger">including yourself</span>, in the
              order you would like them to appear.
            </p>
            <p className="mt-0 mb-0">
              If you do not include yourself, your name will not appear on the
              program.
            </p>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label
            for="lastName"
            className="text-danger customProfileWidth ml-3 mt-2"
          >
            Last Name*asdfasdf
          </Label>
          <Col lg={4}>
            <Input
              name="lastName"
              placeholder="Turing"
              value={this.props.lastName}
              onChange={e => this.props.handleChange(e)}
            />
          </Col>
        </FormGroup>

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
              onChange={e => this.props.handleChange(e)}
            >
              <option>Affiliation1thatissuperduperlongwowsolongasheck</option>
              <option>Affiliation2</option>
              <option>Affiliation3</option>
              <option>Affiliation4</option>
              <option>Please Select</option>
              <option>UCSD</option>
              <option>Affiliation6</option>
            </Input>
          </Col>

          <Col>
            <div className="text-left">
              <Button onClick={this.props.toggleModal}>Add New</Button>

              <Modal
                isOpen={this.props.modal}
                toggle={this.props.toggleModal}
                className={this.props.className}
              >
                <ModalHeader toggle={this.props.toggleModal}>
                  Add a new affiliation
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="newAffiliation"
                    placeholder="Add an affiliation"
                  />
                  <FormText>
                    Please use concise affiliation names, e.g., "UCSD" rather
                    than "UCSD, CSE Department", or "Company X", rather than
                    "Company X Research".
                  </FormText>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.props.toggleModal}>
                    Save
                  </Button>
                  <Button color="secondary" onClick={this.props.toggleModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </Col>
        </FormGroup>
      </div>
    );
  }
}
