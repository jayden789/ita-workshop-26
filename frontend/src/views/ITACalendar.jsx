import React from 'react';
import { Container, Card, CardFooter, CardBody, CardTitle } from 'reactstrap';

export default class ITACalendar extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Card>
            <CardBody>
              <CardTitle>Monday</CardTitle>

              <table width="100%">
                <tr className="align-top">
                  <td>
                    <Card body outline color="warning">
                      8am
                    </Card>
                  </td>
                  <td>
                    <Card body inverse color="info">
                      Breakfast (included in registration)
                    </Card>
                  </td>
                </tr>
                <tr className="align-top">
                  <td>
                    <Card body outline color="warning">
                      9am
                    </Card>
                  </td>
                  <td>
                    <Card body outline color="secondary">
                      <p>Sessions</p>
                      <p className="pl-5">Channel Capacity</p>
                      <p className="pl-5">Distributed Computing</p>
                      <p className="pl-5">Wireless Networks</p>
                      <p className="pl-5">Signal Processing</p>
                      <p className="pl-5">Private Information</p>
                      <p className="pl-5">Deep Learning Theory</p>
                    </Card>
                  </td>
                </tr>
                <tr className="align-top">
                  <td>
                    <Card height="100%" body outline color="warning">
                      10am
                    </Card>
                  </td>
                  <td>
                    <Card body inverse color="success">
                      <p className="h5">Yonina Eldar</p>
                      <p>The Technion</p>
                      <p className="h2">
                        Sub-Nyquist Sampling without Sparsity
                      </p>
                    </Card>
                  </td>
                </tr>
                <tr className="align-top">
                  <td>
                    <Card body outline color="warning">
                      11am
                    </Card>
                  </td>
                  <td>
                    <Card body outline color="secondary">
                      <p>Sessions</p>
                      <p className="pl-5">Channel Capacity</p>
                      <p className="pl-5">Distributed Computing</p>
                      <p className="pl-5">Wireless Networks</p>
                      <p className="pl-5">Signal Processing</p>
                      <p className="pl-5">Private Information</p>
                      <p className="pl-5">Deep Learning Theory</p>
                    </Card>
                  </td>
                </tr>
                <tr className="align-top">
                  <td>
                    <Card body outline color="warning">
                      12am
                    </Card>
                  </td>
                  <td>
                    <Card body inverse color="warning">
                      Lunch Break
                    </Card>
                  </td>
                </tr>

                <tr className="align-top">
                  <td>
                    <Card body outline color="warning">
                      2pm
                    </Card>
                  </td>
                  <td>
                    <Card body outline color="secondary">
                      Wake up for coffee!!
                    </Card>
                  </td>
                </tr>
                <tr className="align-top">
                  <td>
                    <Card body outline color="warning">
                      3pm
                    </Card>
                  </td>
                  <td>
                    <Card body outline color="secondary">
                      <p>Sessions</p>
                      <p className="pl-5">Channel Capacity</p>
                      <p className="pl-5">Distributed Computing</p>
                      <p className="pl-5">Wireless Networks</p>
                      <p className="pl-5">Signal Processing</p>
                      <p className="pl-5">Private Information</p>
                      <p className="pl-5">Deep Learning Theory</p>
                    </Card>
                  </td>
                </tr>
                <tr className="align-top">
                  <td>
                    <Card body outline color="warning">
                      4pm
                    </Card>
                  </td>
                  <td>
                    <Card body inverse color="success">
                      <p className="h5">Yonina Eldar</p>
                      <p>The Technion</p>
                      <p className="h2">
                        Sub-Nyquist Sampling without Sparsity
                      </p>
                    </Card>
                  </td>
                </tr>
                <tr className="align-top">
                  <td>
                    <Card body outline color="warning">
                      5pm
                    </Card>
                  </td>
                  <td>
                    <Card body outline color="secondary">
                      Setup
                    </Card>
                  </td>
                </tr>
                <tr className="align-top">
                  <td>
                    <Card body outline color="warning">
                      6pm
                    </Card>
                  </td>
                  <td>
                    <Card body inverse color="info">
                      Dinner
                    </Card>
                  </td>
                </tr>
              </table>
            </CardBody>
            <CardFooter className="text-muted" />
          </Card>
        </Container>
      </div>
    );
  }
}
