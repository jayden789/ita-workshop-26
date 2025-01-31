import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Row } from 'reactstrap';

import { apiConfig, isLoggedIn } from '../helpers';

export default class TestProfilePicUpload extends React.Component {
  constructor(props) {
    super(props);
    this.profilePicInputRef = React.createRef();
    this.state = {
      selectedFile: null,
    };
  }

  getSelectedFile = () => {
    if (this.profilePicInputRef.current === null) {
      return null;
    }

    const files = this.profilePicInputRef.current.files;
    if (files.length < 1) {
      return null;
    }
    return files[0];
  };

  onChangeProfilePic = event => {
    const selectedFile = this.getSelectedFile();
    this.setState({ selectedFile });

    if (selectedFile !== null) {
      console.log('name:', selectedFile.name);
      console.log('size:', selectedFile.size);
      console.log('type:', selectedFile.type);
    }
  };

  onClickUpload = event => {
    if (this.state.selectedFile === null) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    const fetchConfig = apiConfig('POST', {}, true);
    fetchConfig.body = formData;
    delete fetchConfig.headers['Content-Type'];
    // fetchConfig.headers['Content-Type'] = 'multipart/form-data';

    fetch(this.props.addProfilePicUrl, fetchConfig).then(data => {
      console.log(data);
    });
  };

  render() {
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }

    const uploadButtonDisabled = this.state.selectedFile === null;

    return (
      <div>
        {this.props.navbar}
        <Container>
          <Row>
            <Form>
              <FormGroup>
                <Input
                  type="file"
                  name="profilePic"
                  innerRef={this.profilePicInputRef}
                  onChange={this.onChangeProfilePic}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  onClick={this.onClickUpload}
                  disabled={uploadButtonDisabled}
                  color="primary"
                >
                  Upload
                </Button>
              </FormGroup>
            </Form>
          </Row>
        </Container>
      </div>
    );
  }
}
