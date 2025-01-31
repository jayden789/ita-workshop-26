import React from 'react';
import { Jumbotron, Container, Button } from 'reactstrap';

export default class ITAJumboSchedule extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron fluid className="mt-0 mb-0">
          <Container>
            <div className="text-center">
              <h1 className="display-4 m-3">Talk Schedule</h1>
              <Button outline color="primary m-5">
                Monday
              </Button>
              <Button outline color="primary m-5">
                Tuesday
              </Button>
              <Button outline color="primary m-5">
                Wednesday
              </Button>
              <Button outline color="primary m-5">
                Thursday
              </Button>
              <Button outline color="primary m-5">
                Friday
              </Button>
            </div>
            <div className="text-center">
              <p>
                Every day, two sessions will be held on the W.D. Evans
                Sternwheeler shown in the background
              </p>
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
