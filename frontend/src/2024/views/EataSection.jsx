import React from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardDeck,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';

import styles from './EataSection.module.css';

export default class EataSection extends React.Component {
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
      modal8: false,
      modalWed: false,
    };

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
    this.toggle5 = this.toggle5.bind(this);
    this.toggle6 = this.toggle6.bind(this);
    this.toggle7 = this.toggle7.bind(this);
    this.toggle8 = this.toggle8.bind(this);
    this.toggleWed = this.toggleWed.bind(this);
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

  toggleWed() {
    this.setState({
      modalWed: !this.state.modalWed,
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

  toggle8() {
    this.setState({
      modal8: !this.state.modal8,
    });
  }

  render = () => {
    console.log(this.state.modal3);
    return (
      <div>
        <Jumbotron fluid id="eata" className="mt-0 mb-0 EATABackground">
          <Container style={{ maxWidth: '1400px' }}>
            <div className="text-center">
              <h1 className="display-4 mb-2" style={{ color: 'white' }}>
                EATA
              </h1>
            </div>
            <Row className="mb-2">
              <CardDeck
                className="mb-2 ml-3 mr-3"
                style={{ marginLeft: '0px', marginRight: '0px' }}
              >
                <Col
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    padding: '1px',
                  }}
                >
                  <Card
                    className={styles.card}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={this.toggle7}
                  >
                    <CardHeader
                      style={{
                        backgroundColor: '#0f52BA',
                        verticalAlign: 'middle',
                        height: '85px',
                      }}
                    >
                      <p style={{ color: 'white' }}>Daybreak</p>
                    </CardHeader>
                    <Modal
                      isOpen={this.state.modal7}
                      toggle={this.toggle7}
                      centered
                    >
                      <ModalHeader toggle={this.toggle7}>Daybreak</ModalHeader>
                      <ModalBody>
                        Wake up to a daily Continental breakfast by the bay.
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle7}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <CardBody>
                      Daily
                      <br />8 AM
                    </CardBody>
                  </Card>
                </Col>
                <Col
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    padding: '1px',
                  }}
                >
                  <Card
                    className={styles.card}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={this.toggle8}
                  >
                    <CardHeader
                      style={{
                        backgroundColor: '#0f52BA',
                        verticalAlign: 'middle',
                        height: '85px',
                      }}
                    >
                      <p style={{ color: 'white' }}>Nightcap</p>
                    </CardHeader>
                    <Modal
                      isOpen={this.state.modal8}
                      toggle={this.toggle8}
                      centered
                    >
                      <ModalHeader toggle={this.toggle8}>Nightcap</ModalHeader>
                      <ModalBody>
                        Drinks, snacks, fun, and friends, every evening at the
                        Cabrillo suite.
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle8}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <CardBody>
                      Daily
                      <br />7 PM
                    </CardBody>
                  </Card>
                </Col>
                <Col
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    padding: '1px',
                  }}
                >
                  <Card
                    className={styles.card}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={this.toggle1}
                  >
                    <CardHeader
                      style={{
                        backgroundColor: '#0f52BA',
                        verticalAlign: 'middle',
                        height: '85px',
                      }}
                    >
                      <p style={{ color: 'white' }}>Reception</p>
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
                        Start the workshop right with a social gathering at the
                        Nelson (5th floor Ballroom). Heavy hors d'oeuvres will
                        be served, iced tea on us, more exciting libations at
                        cash bar. (Registration required)
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle1}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <CardBody>
                      Sun
                      <br />
                      6:30 PM
                    </CardBody>
                  </Card>
                </Col>

                <Col
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    padding: '1px',
                  }}
                >
                  <Card
                    className={styles.card}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={this.toggle2}
                  >
                    <CardHeader
                      style={{
                        backgroundColor: '#0f52BA',
                        verticalAlign: 'middle',
                        height: '85px',
                        color: 'white',
                      }}
                    >
                      <p style={{ marginBottom: '0px', fontSize: '13px' }}>
                        Know thy neighbor lunch
                      </p>
                      <p style={{ fontSize: '8px' }}>(for Attendees Only)</p>
                    </CardHeader>
                    <Modal
                      isOpen={this.state.modal2}
                      toggle={this.toggle2}
                      centered
                    >
                      <ModalHeader toggle={this.toggle2}>
                        Know thy neighbor lunch (for Attendees Only)
                      </ModalHeader>
                      <ModalBody>
                        Lightning intros to fellow participants. Lunch served
                        for session attendees.
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle2}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <CardBody>
                      Mon
                      <br />
                      12 - 1:20 PM
                    </CardBody>
                  </Card>
                </Col>

                <Col
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    padding: '1px',
                  }}
                >
                  <Card
                    className={styles.card}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={this.toggle2}
                  >
                    <CardHeader
                      style={{
                        backgroundColor: '#0f52BA',
                        verticalAlign: 'middle',
                        height: '85px',
                        color: 'white',
                      }}
                    >
                      <p style={{ marginBottom: '0px', fontSize: '13px' }}>
                        IT-Session Lunch
                      </p>
                      <p style={{ fontSize: '8px' }}>(for Attendees Only)</p>
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
                        Presentation by IT Society President Aylin Yener,
                        followed by a town hall discussion on forward look for
                        Information Theory and ITs Society. Light lunch served
                        (free, but requires signup at the workshop tab)
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle2}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <CardBody>
                      Mon
                      <br />
                      12:30-2 PM
                    </CardBody>
                  </Card>
                </Col>

                <Col
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    padding: '1px',
                  }}
                >
                  <Card
                    className={styles.card}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={this.toggleWed}
                  >
                    <CardHeader
                      style={{
                        backgroundColor: '#0f52BA',
                        verticalAlign: 'middle',
                        height: '85px',
                        color: 'white',
                      }}
                    >
                      <p style={{ marginBottom: '0px', fontSize: '13px' }}>
                        Taco Tuesday
                      </p>
                    </CardHeader>
                    <Modal
                      isOpen={this.state.modalWed}
                      toggle={this.toggleWed}
                      centered
                    >
                      <ModalHeader toggle={this.toggleWed}>
                        Taco Tuesday
                      </ModalHeader>
                      <ModalBody>
                        A guided stroll through local taco joints to see how
                        UCSD students get by.
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggleWed}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <CardBody>
                      Wed
                      <br />
                      5:45pm
                    </CardBody>
                  </Card>
                </Col>
                <Col
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    padding: '1px',
                  }}
                >
                  <Card
                    className={styles.card}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={this.toggle3}
                  >
                    <CardHeader
                      style={{
                        backgroundColor: '#0f52BA',
                        verticalAlign: 'middle',
                        height: '85px',
                      }}
                    >
                      <p style={{ color: 'white' }}>
                        Graduation
                        <br />
                        Lunch
                      </p>
                    </CardHeader>
                    <Modal
                      isOpen={this.state.modal3}
                      toggle={this.toggle3}
                      centered
                    >
                      <ModalHeader toggle={this.toggle3}>
                        <p style={{ fontSize: '15px' }}>Graduation Lunch</p>
                      </ModalHeader>
                      <ModalBody>
                        Enjoy a buffet lunch by the beach while perusing
                        graduation day posters at ITA Cove (aka beach).
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle3}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <CardBody>
                      Wed
                      <br />
                      12 PM
                    </CardBody>
                  </Card>
                </Col>
                <Col
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    padding: '1px',
                  }}
                >
                  <Card
                    className={styles.card}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={this.toggle4}
                  >
                    <CardHeader
                      style={{
                        backgroundColor: '#0f52BA',
                        verticalAlign: 'middle',
                        height: '85px',
                      }}
                    >
                      <p style={{ color: 'white' }}>Banquet</p>
                    </CardHeader>
                    <Modal
                      isOpen={this.state.modal4}
                      toggle={this.toggle4}
                      centered
                    >
                      <ModalHeader toggle={this.toggle4}>Banquet</ModalHeader>
                      <ModalBody>
                        Reception and plated dinner, live entertainment, and
                        audience-participation at the Nelson (5th floor
                        Ballroom). (Registration required)
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle4}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <CardBody>
                      Wed
                      <br />
                      6:30 PM
                    </CardBody>
                  </Card>
                </Col>
                <Col
                  style={{
                    marginLeft: '3px',
                    marginRight: '3px',
                    padding: '1px',
                  }}
                >
                  <Card
                    className={styles.card}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={this.toggle5}
                  >
                    <CardHeader
                      style={{
                        backgroundColor: '#0f52BA',
                        verticalAlign: 'middle',
                        height: '85px',
                      }}
                    >
                      <p style={{ color: 'white' }}>Farewell</p>
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
                        Farewell party at a TBD location with food, drinks, and
                        the traditional pĩnata finale. (Included with
                        Registration)
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={this.toggle5}>
                          Close
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <CardBody>
                      Fri
                      <br />
                      4:30 PM
                    </CardBody>
                  </Card>
                </Col>
              </CardDeck>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  };
}
