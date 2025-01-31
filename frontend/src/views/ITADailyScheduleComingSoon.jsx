import React from 'react';
import { Jumbotron, Container, Button, Row, Col } from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';
export default class ITADailyScheduleComingSoon extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron
          fluid
          id="talks"
          className="mt-0 mb-0 DailyScheduleBackground"
        >
          <Container>
            <div className="text-center">
              <h1 className="display-4 dailywords mt-5 mb-5">
                <strong>Daily Schedule</strong>
              </h1>
              <h5 className="dailywords mt-5 mb-5">
                <strong>
                  Every day, two sessions will be held on the W.D. Evans
                  Sternwheeler shown in the background
                </strong>
              </h5>
              <Row>
                <Col>
                  <Button color="info" tag={Link} to="/schedule/#d_1">
                    Monday
                  </Button>{' '}
                </Col>

                <Col>
                  <Button color="info" tag={Link} to="/schedule/#d_2">
                    Tuesday
                  </Button>{' '}
                </Col>

                <Col>
                  <Button color="info" tag={Link} to="/schedule/#d_3">
                    Wednesday
                  </Button>{' '}
                </Col>

                <Col>
                  <Button color="info" tag={Link} to="/schedule/#d_4">
                    Thursday
                  </Button>{' '}
                </Col>

                <Col>
                  <Button color="info" tag={Link} to="/schedule/#d_5">
                    Friday
                  </Button>{' '}
                </Col>
              </Row>
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
