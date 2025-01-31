import React from 'react';
import {
  Card,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Col,
  FormText,
  Button,
} from 'reactstrap';

import { apiConfig } from '../helpers';

function textCount(text) {
  return String(text).length;
}
export default class ITARegisterPaper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPaperFile: null,
      selectedPaperFileWasUploaded: false,
      paperUploadStatus: null,
      paperUploadErrorMessage: null,
    };

    this.paperInputRef = React.createRef();
  }

  onChangePaperInput = event => {
    const files = this.paperInputRef.current.files;
    const selectedPaperFile = files.length < 1 ? null : files[0];
    this.setState({ selectedPaperFile, selectedPaperFileWasUploaded: false });
  };

  onClickUploadPaper = event => {
    if (this.state.selectedPaperFile === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.state.selectedPaperFile);

    const fetchConfig = apiConfig('POST', {}, true);
    fetchConfig.body = formData;
    delete fetchConfig.headers['Content-Type'];

    new Promise(resolve =>
      this.setState(
        {
          paperUploadStatus: 'loading',
          paperUploadErrorMessage: null,
          selectedPaperFileWasUploaded: false,
        },
        resolve
      )
    )
      .then(() => fetch(this.props.addPaperUrl, fetchConfig))
      .then(response => Promise.all([response.ok, response.json()]))
      .then(([success, data]) => {
        if (success) {
          this.props.updatePaperUrl(data['paper_url']);
          this.setState({
            paperUploadStatus: 'success',
            paperUploadErrorMessage: null,
            selectedPaperFileWasUploaded: true,
          });
        } else {
          const errorMessage =
            data.file && data.file.length > 0
              ? data.file[0]
              : 'Unknown upload error.';
          this.setState({
            paperUploadStatus: 'failure',
            paperUploadErrorMessage: errorMessage,
            selectedPaperFileWasUploaded: false,
          });
        }
      });
  };

  render() {
    const length = textCount(this.props.paperAbstract);

    const hasCurrentPaper = (this.props.paperUrl || '').length > 0;
    const currentPaperElement = hasCurrentPaper ? (
      <p>
        <a href={this.props.paperUrl} target="_blank" rel="noopener noreferrer">
          Click here
        </a>{' '}
        to view your uploaded paper.
      </p>
    ) : (
      <p>Your paper has not been uploaded.</p>
    );

    // Can't upload if any of these are true:
    // - no file is selected
    // - the selected file was already successfully uploaded
    // - the selected file is currently being uploaded
    const canUploadPaper = !(
      this.state.selectedPaperFile === null ||
      this.state.selectedPaperFileWasUploaded ||
      this.state.paperUploadStatus === 'loading'
    );

    const paperUploadSuccess =
      this.state.paperUploadStatus === 'success' ? (
        <p className="text-success">
          Your paper has been successfully uploaded.
        </p>
      ) : null;
    const paperUploadLoading =
      this.state.paperUploadStatus === 'loading' ? (
        <p className="text-primary">Uploading paper...</p>
      ) : null;
    const paperUploadFailure =
      this.state.paperUploadStatus === 'failure' ? (
        <p className="text-danger">{this.state.paperUploadErrorMessage}</p>
      ) : null;
    const hasPaperUploadFeedback =
      paperUploadSuccess || paperUploadLoading || paperUploadFailure;

    return (
      <Card body>
        <Form>
          <h2>Your presentation information</h2>
          <p>
            You are registering as a presenter. To maintain the workshop's
            quality we kindly ask you to present the talk yourself. If you
            prefer not to speak, please{' '}
            <a href="mailto:ita@ucsd.edu">contact us</a>.
          </p>
          <p>
            To help us schedule your talk, please upload the following
            information as soon as possible.{' '}
          </p>
          <FormGroup row>
            <Label className="paperLabelWidth ml-3 mt-2">
              <strong>Title</strong>
            </Label>
            <Col lg={10}>
              <Input
                name="paperTitle"
                placeholder=""
                value={this.props.paperTitle}
                onChange={e => this.props.handleChange(e)}
              />
              <FormText>
                For program uniformity, please capitalize only first word,
                acronyms, and eponyms, e.g., 'On Markov-chain applications to
                MIMO'. This is for the program only, in the paper itself you can
                use your preferred capitalization scheme.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="paperLabelWidth ml-3 mt-2">
              <strong>Co-authors</strong>
            </Label>
            <Col lg={10}>
              <Input
                type="textarea"
                name="paperAuthorsComment"
                placeholder=""
                value={this.props.paperAuthorsComment}
                onChange={e => this.props.handleChange(e)}
              />
              <FormText>
                Please enter all paper co-authors,{' '}
                <strong style={{ color: 'red' }}>including yourself</strong>, in
                the order you would like them to appear. Please do not include
                affiliation, etc.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="paperLabelWidth ml-3 mt-2">
              <strong>Abstract</strong>
            </Label>
            <Col lg={10}>
              <Input
                type="textarea"
                name="paperAbstract"
                placeholder=""
                value={this.props.paperAbstract}
                onChange={e => this.props.handleChange(e)}
              />
              <div>
                <FormText className="text-right">
                  Characters used: {length}
                </FormText>
              </div>
              <FormText>
                Please include just the abstract's body, do not enter the title,
                authors, \begin{'{'}
                abstract
                {'}'}, etc. Please keep it as simple as possible and below 800
                characters if possible. While latex commands ($2^n$) are okay,
                and popular packages (e.g., amssymb) are included, please
                minimize their use.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="paperLabelWidth ml-3 mt-2">
              <strong>
                Topic <br />
                Comment
              </strong>
            </Label>
            <Col lg={10}>
              <Input
                type="textarea"
                name="paperTopicComment"
                placeholder=""
                value={this.props.paperTopicComment}
                onChange={e => this.props.handleChange(e)}
              />
              <FormText>
                To help us schedule your talk at an appropriate session, please
                indicate its topic. For example: online learning, sparsity, or
                interference alignment. Please be as specific as you (briefly)
                like.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="paperLabelWidth ml-3 mt-2">
              <strong>
                Scheduling <br />
                Comment
              </strong>
            </Label>
            <Col lg={10}>
              <Input
                type="textarea"
                name="paperComment"
                placeholder=""
                value={this.props.paperComment}
                onChange={e => this.props.handleChange(e)}
              />
              <FormText>
                If you can present during only part of the workshop, please
                select the days you can attend at the workshop tab, and include
                additional timing requests here. If your workshop tab lists one
                day, we will try to accommodate it, but cannot guarantee it and
                will contact you if we cannot. If your workshop tab lists at
                least two non-Wednesday days (e.g. Tuesday and Thursday), we
                will schedule your talk on one of the indicated days, so you can
                plan your travel right now. For a coherent schedule, please
                include as many days as you can.
              </FormText>
            </Col>
          </FormGroup>

          <FormGroup row className="mb-0">
            <Label
              for="presentationPlaceholder"
              className="paperLabelWidth ml-3 mt-2"
            >
              <strong>
                Paper <br />
                Upload
              </strong>
            </Label>
            <Col lg={10}>
              <Row>
                <Col lg={12}>{currentPaperElement}</Col>
              </Row>
              <Row>
                <Col lg="auto">
                  <Input
                    type="file"
                    name="paper"
                    innerRef={this.paperInputRef}
                    onChange={this.onChangePaperInput}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg="auto">
                  <Button
                    onClick={this.onClickUploadPaper}
                    disabled={!canUploadPaper}
                    color="primary"
                  >
                    Upload
                  </Button>
                </Col>
              </Row>
              {hasPaperUploadFeedback ? (
                <Row className="mt-2">
                  <Col lg="auto">
                    {paperUploadLoading}
                    {paperUploadSuccess}
                    {paperUploadFailure}
                  </Col>
                </Row>
              ) : null}
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col>
              <div className="text-center">
                <Button onClick={this.props.saveChanges}>Save all tabs</Button>
              </div>
            </Col>
          </FormGroup>
        </Form>
      </Card>
    );
  }
}
