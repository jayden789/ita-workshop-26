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
  Alert,
  Spinner,
} from 'reactstrap';

import { apiConfig } from '../../helpers';

function textCount(text) {
  return String(text).length;
}
export default class RegistrationPaper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPaperFile: null,
      selectedPaperFileWasUploaded: false,
      paperUploadStatus: null,
      paperUploadErrorMessage: null,
      selectedVideoFile: null,
      selectedVideoFileWasUploaded: false,
      videoUploadStatus: null,
      titleError: true,
      coAuthorError: true,
      videoFileTypeError: null,
    };

    this.paperInputRef = React.createRef();
    this.videoInputRef = React.createRef();
  }


  onClickRemovePaper = () => {
    if (this.paperInputRef.current) {
      this.paperInputRef.current.value = '';
    }
    this.setState({ selectedPaperFile: null, selectedPaperFileWasUploaded: false, paperUploadStatus: 'removed'});
    this.props.updatePaperUrl(null);
  };

  onClickRemoveVideo = () => {
    if (this.videoInputRef.current) {
      this.videoInputRef.current.value = '';
    }
    this.setState({ selectedVideoFile: null, selectedVideoFileWasUploaded: false, videoUploadStatus: 'removed' });
    this.props.updateVideoUrl(null);
  };

  onChangePaperInput = (event) => {
    const files = this.paperInputRef.current.files;
    const selectedPaperFile = files.length < 1 ? null : files[0];
    this.setState({ selectedPaperFile, selectedPaperFileWasUploaded: false });
  };

  onChangeVideoInput = (event) => {
    const files = this.videoInputRef.current.files;
    const selectedVideoFile = files.length < 1 ? null : files[0];
    this.setState({ selectedVideoFile, selectedVideoFileWasUploaded: false });
  };

  onClickUploadPaper = (event) => {
    if (this.state.selectedPaperFile === null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.state.selectedPaperFile);

    const fetchConfig = apiConfig('POST', {}, true);
    fetchConfig.body = formData;
    delete fetchConfig.headers['Content-Type'];
    console.log('talk props', this.props);
    new Promise((resolve) =>
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
      .then((response) => Promise.all([response.ok, response.json()]))
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
            paperUploadErrorMessage: 'Please upload a PDF file.',
            selectedPaperFileWasUploaded: false,
          });
        }
      });
  };

  onClickVideoPaper = (event) => {
    if (this.state.selectedVideoFile === null) {
      return;
    }

    const fileExtension = this.state.selectedVideoFile.name.split('.').pop().toUpperCase();
    const VIDEO_TYPES = ['WEBM', 'MPG', 'MP2', 'MPEG', 'MPE', 'MPV', 'OGG', 'AVCHD', 'MP4', 'M4P', 'M4V', 'AVI', 'WMV', 'MOV', 'QT', 'FLV', 'SWF'];
    if (!VIDEO_TYPES.includes(fileExtension)) {
      this.setState({
        videoFileTypeError: 'Please upload a supported file. Supported types: WEBM, MPG, MP4, AVI, etc.',
        videoUploadStatus: 'failure',
      });
      console.log('File type not supported. Supported types: WEBM, MPG, MP4, AVI, etc.');
      return;
    } 

    this.setState({ videoFileTypeError: null });
    const formData = new FormData();
    formData.append('file', this.state.selectedVideoFile);

    const fetchConfig = apiConfig('POST', {}, true);
    fetchConfig.body = formData;
    delete fetchConfig.headers['Content-Type'];

    new Promise((resolve) =>
      this.setState(
        {
          videoUploadStatus: 'loading',
          videoUploadErrorMessage: null,
          selectedVideoFileWasUploaded: false,
        },
        resolve
      )
    )
      .then(() => fetch(this.props.addVideoUrl, fetchConfig))
      .then((response) => Promise.all([response.ok, response.json()]))
      .then(([success, data]) => {
        if (success) {
          this.props.updateVideoUrl(data['video_url']);
          this.setState({
            videoUploadStatus: 'success',
            videoUploadErrorMessage: null,
            selectedVideoFileWasUploaded: true,
            videoUrl: data['video_url'],
          });
        } else {
          const errorMessage =
            data.file && data.file.length > 0
              ? data.file[0]
              : 'Unknown upload error.';
          this.setState({
            videoUploadStatus: 'failure',
            videoUploadErrorMessage: errorMessage,
            selectedVideoFileWasUploaded: false,
          });
        }
      });
  };

  canUploadPaper = () => {
    return !(
      this.state.selectedPaperFile === null ||
      this.state.selectedPaperFileWasUploaded ||
      this.state.paperUploadStatus === 'loading'
    );
  };

  canUploadVideo = () => {
    return !(
      this.state.selectedVideoFile === null ||
      this.state.selectedVideoFileWasUploaded ||
      this.state.videoUploadStatus === 'loading'
    );
  };
  
  render() {

    const length = textCount(this.props.paperAbstract);
    const hasCurrentPaper = (this.props.paperUrl || '').length > 0;
    const hasCurrentVideo = (this.props.videoUrl || '').length > 0;
 
    // Can't upload if any of these are true:
    // - no file is selected
    // - the selected file was already successfully uploaded
    // - the selected file is currently being uploaded


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

    const videoUploadSuccess =
      this.state.videoUploadStatus === 'success' ? (
        <p className="text-success">
          Your video has been successfully uploaded.
        </p>
      ) : null;
    const videoUploadLoading =
      this.state.paperUploadStatus === 'loading' ? (
        <p className="text-primary">Uploading video...</p>
      ) : null;
    const videoUploadFailure =
      this.state.paperUploadStatus === 'failure' ? (
        <p className="text-danger">{this.state.videoUploadErrorMessage}</p>
      ) : null;
    const hasVideoUploadFeedback =
      videoUploadSuccess || videoUploadLoading || videoUploadFailure;

    const admincomments = this.props.loggedInAsAdmin ? (
      <FormGroup row>
        <Label className="paperLabelWidth ml-3 mt-2">
          <strong>Admin Comments</strong>
        </Label>
        <Col lg={10}>
          <Input
            name="adminComments"
            placeholder=""
            value={this.props.adminComments}
            onChange={(e) => this.props.handleChange(e)}
          />
          <FormText>These comments are visible to admins only.</FormText>
        </Col>
      </FormGroup>
    ) : null;


    const getPresentingText = () => {
      if (this.props.studentOption) {
        if (this.props.isPresenting) {
          return 'As a student, you can present at a  poster session. If you prefer not to present, please indicate on the left.';
        }
        return 'You are listed as not presenting this year, if you would like to present a poster, please indicate on the left.';
      }
      if (this.props.isPresenting) {
        return 'You are listed as presenting a talk. If you prefer not to present this year, please indicate on the left.';
      }
      return 'You are listed as not presenting this year, if you would like to present a talk, please indicate on the left.';
    };

    const titleError = this.props.paperTitle?.length === 0;
    const coAuthorError = this.props.paperAuthorsComment?.length === 0;
    const isFormInvalid =
      this.props.isPresenting && (titleError || coAuthorError);

    return (
      <Card body>
        <h2>Your presentation information</h2>
        <Form>
          <FormGroup row>
            <Col lg={2}>
              <Label className="mt-2">Presentation</Label>
            </Col>
            <Col lg={9} className="mt-2">
              <Row>
                <Col lg={5}>
                  <FormGroup check inline>
                    <Label check className="mr-4">
                      <Input
                        type="radio"
                        value="true"
                        name="presentingThisYear"
                        checked={this.props.isPresenting}
                        onChange={(e) => {
                          this.props.handleBinaryOptionChange(e);
                          this.props.switchPresentingThisYear(e);
                          this.props.enablePresentationOption('presentation');
                        }}
                        className="mb-0"
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
                        checked={!this.props.isPresenting}
                        onChange={(e) => {
                          this.props.handleBinaryOptionChange(e);
                          this.props.switchPresentingThisYear(e);
                          this.props.disablePresentationOption();
                        }}
                        className="mb-0"
                      />
                      Not-presenting
                    </Label>
                  </FormGroup>
                </Col>
                <Col lg={7}>
                  <FormText className="mt-0" color="muted">
                    {getPresentingText()}
                  </FormText>
                </Col>
              </Row>
            </Col>
          </FormGroup>

          {this.props.isPresenting ? (
            <>
              {this.props.studentOption ? (
                <Alert color="info">
                  Students can present at a poster session. If you are a
                  final-year Ph.D. student or a postdoc seeking a research
                  position and would like to be considered for Graduation Day,
                  please ask your supervisor to send a brief recommendation to{' '}
                  <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>.
                </Alert>
              ) : null}
              <p>
                You are registering as a presenter. To maintain the workshop's
                quality we kindly ask you to present the talk yourself.
              </p>
              <p>
                To help us schedule your talk, please upload the following
                information as soon as possible.{' '}
              </p>
              <FormGroup row>
                <Label className="paperLabelWidth text-danger ml-3 mt-2">
                  <strong>Title*</strong>
                </Label>
                <Col lg={10}>
                  <Input
                    name="paperTitle"
                    placeholder=""
                    value={this.props.paperTitle}
                    onChange={(e) => this.props.handleChange(e)}
                    invalid={titleError}
                  />
                  <FormText>
                    For program uniformity, please capitalize only first word,
                    acronyms, and eponyms, e.g., 'On Markov-chain applications
                    to MIMO'. This is for the program only, in the paper itself
                    you can use your preferred capitalization scheme.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="paperLabelWidth text-danger ml-3 mt-2">
                  <strong>Co-authors*</strong>
                </Label>
                <Col lg={10}>
                  <Input
                    type="textarea"
                    name="paperAuthorsComment"
                    placeholder=""
                    value={this.props.paperAuthorsComment}
                    onChange={(e) => this.props.handleChange(e)}
                    invalid={coAuthorError}
                  />
                  <FormText>
                    Please enter all paper co-authors,{' '}
                    <strong style={{ color: 'red' }}>including yourself</strong>
                    , in the order you would like them to appear. Please do not
                    include affiliation, etc.
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
                    onChange={(e) => this.props.handleChange(e)}
                  />
                  <div>
                    <FormText className="text-right">
                      Characters used: {length}
                    </FormText>
                  </div>
                  <FormText>
                    Please include just the abstract's body, do not enter the
                    title, authors, \begin{'{'}
                    abstract
                    {'}'}, etc. Please keep it as simple as possible and below
                    800 characters if possible. While latex commands ($2^n$) are
                    okay, and popular packages (e.g., amssymb) are included,
                    please minimize their use.
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
                    onChange={(e) => this.props.handleChange(e)}
                  />
                  <FormText>
                    To help us schedule your talk at an appropriate session,
                    please indicate its topic. For example: online learning,
                    sparsity, or interference alignment. Please be as specific
                    as you (briefly) like.
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
                    onChange={(e) => this.props.handleChange(e)}
                  />
                  <FormText>
                    If you can present during only part of the workshop, please
                    select the days you can attend at the workshop tab, and
                    include additional timing requests here. If your workshop
                    tab lists one day, we will try to accommodate it, but cannot
                    guarantee it and will contact you if we cannot. If your
                    workshop tab lists at least two non-Wednesday days (e.g.
                    Tuesday and Thursday), we will schedule your talk on one of
                    the indicated days, so you can plan your travel right now.
                    For a coherent schedule, please include as many days as you
                    can.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label className="paperLabelWidth ml-3 mt-2">
                  <strong>
                    Paper <br />
                    Upload
                  </strong>
                  </Label> 

                <Col lg={5}>
                  <Input
                    type="file"
                    name="paper"
                    innerRef={this.paperInputRef}
                    onChange={this.onChangePaperInput}
                  />
                </Col>

                <Col lg={5} className="small text-muted pt-4 text-left">
                  Paper upload is optional. We are exploring the possibility of uploading the papers on IEEE Xplore. If that happens, we’ll let you know.
                </Col>
              </FormGroup>

              <FormGroup row className="align-items-center">
                <Label className="paperLabelWidth ml-3 mt-2">
                  </Label> 

                <Col lg={1}>
                  <Button
                    color="primary"
                    onClick={this.onClickUploadPaper}
                    disabled={!this.canUploadPaper()}
                  >
                    Upload
                  </Button>
                </Col>

                <Col lg={1}>
                  <Button
                    color="secondary"
                    onClick={() => window.open(this.props.paperUrl, '_blank')}
                    disabled={!hasCurrentPaper}
                    style={{ padding: '0.375rem 1.25rem' }}
                  >
                    View
                  </Button>
                </Col>

                <Col lg={1}>
                  <Button
                    color="danger"
                    onClick={this.onClickRemovePaper}
                    disabled={!hasCurrentPaper}
                    // {!this.props.paperUrl || this.props.paperUrl == null}
                  >
                    Remove
                  </Button>
                </Col>

              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label className="paperLabelWidth ml-3 mt-2">
                  </Label> 
                {this.state.paperUploadStatus && (
                  <Row className="mt-2">
                    <Col lg="auto">
                      {this.state.paperUploadStatus === 'loading' && <p className="text-primary">  Uploading paper...</p>}
                      {this.state.paperUploadStatus === 'success' && <p className="text-success">  Your paper has been successfully uploaded.</p>}
                      {this.state.paperUploadStatus === 'failure' && <p className="text-danger">  {this.state.paperUploadErrorMessage}</p>}
                      {this.state.paperUploadStatus === 'removed' && <p className="text-success">  Your paper has been successfully removed.</p>}
                      
                    </Col>
                  </Row>
                )}
              </FormGroup>

              <FormGroup row className="align-items-center">
                <Label className="paperLabelWidth ml-3 mt-2">
                    <strong>
                      Video <br />
                      Upload
                    </strong>
                </Label>
                <Col lg={5}>
                  <Input
                    type="file"
                    name="video"
                    innerRef={this.videoInputRef}
                    onChange={this.onChangeVideoInput}
                  />
                </Col>

                <Col lg={5} className="small text-muted pt-4 text-left">
                  Optional, short, up to 2-minute video of your talk that we’ll show on the schedule.
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label className="paperLabelWidth ml-3 mt-2">
                  </Label> 
                <Col lg={1}>
                  <Button
                    color="primary"
                    onClick={this.onClickVideoPaper}
                    disabled={!this.canUploadVideo()}
                  >
                    Upload
                  </Button>
                </Col>
                <Col lg={1}>
                  <Button
                    color="secondary"
                    onClick={() => window.open(this.state.videoUrl || this.props.videoUrl, '_blank')}
                    disabled={!hasCurrentVideo}
                    style={{ padding: '0.375rem 1.25rem' }}
                  >
                    View
                  </Button>
                </Col>
                <Col lg={1}>
                  <Button
                    color="danger"
                    onClick={this.onClickRemoveVideo}
                    disabled={!hasCurrentVideo}
                  >
                    Remove
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup row className="align-items-center">
                <Label className="paperLabelWidth ml-3 mt-2">
                  </Label> 
                {this.state.videoUploadStatus && (
                  <Row className="mt-2">
                    <Col lg="auto">
                      {this.state.videoUploadStatus === 'loading' && <p className="text-primary">  Uploading video...</p>}
                      {this.state.videoUploadStatus === 'success' && hasCurrentVideo && <p className="text-success">  Your video has been successfully uploaded.</p>}
                      {this.state.videoUploadStatus === 'failure' && <p className="text-danger">  {this.state.videoFileTypeError}</p>}
                      {this.state.videoUploadStatus === 'removed' && <p className="text-success">  Your video has been successfully removed.</p>}
                    </Col>
                  </Row>
                )}
              </FormGroup>
              <br></br>
              {admincomments}
            </>
          ) : null}
          <FormGroup check row>
            <Col>
              <div className="text-center">
                <Button
                  disabled={isFormInvalid || this.props.loading}
                  onClick={this.props.saveChanges}
                >
                  {this.props.loading ? (
                    <Spinner size="sm mr-2">Saving...</Spinner>
                  ) : null}
                  Save all tabs
                </Button>
              </div>
            </Col>
          </FormGroup>
        </Form>
      </Card>
    );
  }
}
