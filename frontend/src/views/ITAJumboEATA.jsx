import React from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';

export default class ITAJumboProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      modal7: false,
    };

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
    this.toggle5 = this.toggle5.bind(this);
    this.toggle6 = this.toggle6.bind(this);
    this.toggle7 = this.toggle7.bind(this);
  }

  toggle1() {
    this.setState({
      modal1: !this.state.modal1,
    });
  }

  toggle2() {
    this.setState({
      modal2: !this.state.modal2,
    });
  }

  toggle3() {
    this.setState({
      modal3: !this.state.modal3,
    });
  }

  toggle4() {
    this.setState({
      modal4: !this.state.modal4,
    });
  }

  toggle5() {
    this.setState({
      modal5: !this.state.modal5,
    });
  }

  toggle6() {
    this.setState({
      modal6: !this.state.modal6,
    });
  }

  toggle7() {
    this.setState({
      modal7: !this.state.modal7,
    });
  }

  render = () => {
    return (
      <div>
        <Jumbotron fluid id="eata" className="mt-0 mb-0 EATABackground">
          <Container>
            <div className="text-center">
              <h1 className="display-4 mb-2" style={{ color: 'white' }}>
                EATA
              </h1>
            </div>
            <Row className="mb-2">
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardHeader style={{ height: '73px', padding: '0px' }}>
                    <Button
                      onClick={this.toggle1}
                      className="m-0"
                      style={{ height: '100%', width: '100%' }}
                    >
                      Sunday Reception
                    </Button>
                  </CardHeader>
                  <Modal
                    isOpen={this.state.modal1}
                    toggle={this.toggle1}
                    centered
                  >
                    <ModalHeader toggle={this.toggle1}>
                      Sunday Reception
                    </ModalHeader>
                    <ModalBody>
                      Let's start the workshop right with a social gathering at
                      the Catamaran's Aviary Room. Heavy hors d'oeuvres will be
                      served, iced tea on us, more exciting libations at cash
                      bar. (Registration required)
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle1}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardBody>Sun 6:30</CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardHeader style={{ height: '73px', padding: '0px' }}>
                    <Button
                      onClick={this.toggle7}
                      className="m-0"
                      style={{ height: '100%', width: '100%' }}
                    >
                      Daybreak
                    </Button>
                  </CardHeader>
                  <Modal
                    isOpen={this.state.modal7}
                    toggle={this.toggle7}
                    centered
                  >
                    <ModalHeader toggle={this.toggle7}>Daybreak</ModalHeader>
                    <ModalBody>
                      Daily Continental breakfast to start the day right.
                      (Included with Registration)
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle7}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardBody>Sun 6:30</CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardHeader style={{ height: '73px', padding: '0px' }}>
                    <Button
                      onClick={this.toggle2}
                      className="m-0"
                      style={{ height: '100%', width: '100%' }}
                    >
                      IT-Session Lunch
                      <br />
                      (for Attendees Only)
                    </Button>
                  </CardHeader>
                  <Modal
                    isOpen={this.state.modal2}
                    toggle={this.toggle2}
                    centered
                  >
                    <ModalHeader toggle={this.toggle2}>
                      IT-Session Lunch (for Attendees Only)
                    </ModalHeader>
                    <ModalBody>
                      A president's address followed by an outline of technical and social activities carried out and planned by the Information Theory Society. <br /><br />
                      Light Lunch for attendees of the Information Theory
                      Society event (free, but requires signup at the workshop
                      tab)
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle2}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardBody>Mon 12:30 - 2</CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardHeader style={{ height: '73px', padding: '0px' }}>
                    <Button
                      onClick={this.toggle3}
                      className="m-0"
                      style={{ height: '100%', width: '100%' }}
                    >
                      Graduation-day <br />
                      Lunch
                    </Button>
                  </CardHeader>
                  <Modal
                    isOpen={this.state.modal3}
                    toggle={this.toggle3}
                    centered
                  >
                    <ModalHeader toggle={this.toggle3}>
                      Graduation-day Lunch
                    </ModalHeader>
                    <ModalBody>
                      Enjoy a buffet lunch while perusing graduation day
                      posters. (Included with Registration)
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle3}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardBody>Wed 12</CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardHeader style={{ height: '73px', padding: '0px' }}>
                    <Button
                      onClick={this.toggle4}
                      className="m-0"
                      style={{ height: '100%', width: '100%' }}
                    >
                      Banquet
                    </Button>
                  </CardHeader>
                  <Modal
                    isOpen={this.state.modal4}
                    toggle={this.toggle4}
                    centered
                  >
                    <ModalHeader toggle={this.toggle4}>Banquet</ModalHeader>
                    <ModalBody>
                      Polynesian luau with buffet dinner, live entertainment,
                      and audience-participation. (Registration required)
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle4}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardBody>Wed 6:30</CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardHeader style={{ height: '73px', padding: '0px' }}>
                    <Button
                      onClick={this.toggle6}
                      className="m-0"
                      style={{ height: '100%', width: '100%' }}
                    >
                      Poster Lunch
                    </Button>
                  </CardHeader>
                  <Modal
                    isOpen={this.state.modal6}
                    toggle={this.toggle6}
                    centered
                  >
                    <ModalHeader toggle={this.toggle6}>
                      Poster Lunch
                    </ModalHeader>
                    <ModalBody>
                      Light Lunch accompanying the student poster presentations.
                      (Included with Registration)
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle6}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardBody>Fri 12:30</CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardHeader style={{ height: '73px', padding: '0px' }}>
                    <Button
                      onClick={this.toggle5}
                      className="m-0"
                      style={{ height: '100%', width: '100%' }}
                    >
                      Farewell
                    </Button>
                  </CardHeader>
                  <Modal
                    isOpen={this.state.modal5}
                    toggle={this.toggle5}
                    centered
                  >
                    <ModalHeader toggle={this.toggle5}>
                      Closing Ceremony
                    </ModalHeader>
                    <ModalBody>
                      Farewell party at the hotel with food, drinks, and the
                      traditional pĩnata finale. (Included with Registration)
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle5}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardBody>Fri 4:30</CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  };
}
