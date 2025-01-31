import React from 'react';
import classNames from 'classnames';
import {
  Jumbotron,
  Container,
  Row,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardFooter,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';

import bonfireImg from './img2020/bonfire.jpg';
import iowaImg from './img2020/iowa.png';
import stateOfTheUnionImg from './img2020/sotu.jpg';
import flowerWorkshopImg from './img2020/flowerws.jpg';
import finalBashImg from './img2020/final_bash.jpg';
import icmlImg from './img2020/icml.png';
import nsfLogoImg from './img2020/nsflogo.png';
import superbowlImg from './img2020/superbowl.jpg';

export default class SpecialEventsSection extends React.Component {
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
      modal9: false,
      modal10: false,
      modal11: false,
      modal12: false,
    };

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
    this.toggle5 = this.toggle5.bind(this);
    this.toggle6 = this.toggle6.bind(this);
    this.toggle7 = this.toggle7.bind(this);
    this.toggle8 = this.toggle8.bind(this);
    this.toggle9 = this.toggle9.bind(this);
    this.toggle10 = this.toggle10.bind(this);
    this.toggle11 = this.toggle11.bind(this);
    this.toggle12 = this.toggle12.bind(this);
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

  toggle8() {
    this.setState({
      modal8: !this.state.modal8,
    });
  }

  toggle9() {
    this.setState({
      modal9: !this.state.modal9,
    });
  }
  toggle10() {
    this.setState({
      modal10: !this.state.modal10,
  });
}
toggle11() {
  this.setState({
    modal11: !this.state.modal11,
});
}
toggle12() {
  this.setState({
    modal12: !this.state.modal12,
});
}

  render = () => {
    return (
      <div>
        <Jumbotron
          fluid
          id="specialevents"
          className="mt-0 mb-0 SpecialBackground"
        >
          <Container>
            <div className="text-center">
              <h1 className="display-4 mb-2" style={{ color: 'white' }}>
                Special Events
              </h1>
            </div>
            <Row className="mb-2">
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle1}>
                  <CardImg
                    top
                    src={icmlImg}
                    alt="ICML" style={{borderBottom: '1px solid lightgray'}}
                  />
                  <Modal
                    isOpen={this.state.modal1}
                    toggle={this.toggle1}
                    centered
                  >
                    <ModalHeader toggle={this.toggle1}>
                      ICML Paper-ation
                    </ModalHeader>
                    <ModalBody>
                      Tables, drinks, and snacks for individuals and groups submitting ICML papers
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle1}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle1} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      ICML Paper-ation
                    </span>
                  </CardTitle>
                  <CardBody>Prepare your ICML paper at ITA</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>Throughout Each Day</CardFooter>
                </Card>
              </Col>

              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle2}>
                  <CardImg
                    top
                    width="100%"
                    height="auto"
                    src="https://www.itsoc.org/++theme++itsoc.diazotheme/static/images/logo.png"
                    alt="Information Theory Society" style={{borderBottom: '1px solid lightgray'}}
                  />
                  <Modal
                    isOpen={this.state.modal2}
                    toggle={this.toggle2}
                    centered
                  >
                    <ModalHeader toggle={this.toggle2}>
                    State of the Society Address
                    </ModalHeader>
                    <ModalBody>
                    President's address followed by a town hall on forward look for Information Theory and ITs Society. 
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle2}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle2} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Information Theory Society
                    </span>
                  </CardTitle>
                  <CardBody>President's address and town hall.</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>Mon 9:00-9:50 PM</CardFooter>
                </Card>
              </Col>

              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle12}>
                  <CardImg
                    top
                    width="100%"
                    height="auto"
                    src="/workshop/static/media/icebreaker.e936b998.jpeg"
                    alt="Lunch and Plenary Ice breaker" style={{borderBottom: '1px solid lightgray'}}
                  />
                  <Modal
                    isOpen={this.state.modal12}
                    toggle={this.toggle12}
                    centered
                  >
                    <ModalHeader toggle={this.toggle12}>
                    Lunch and Plenary Ice breaker
                    </ModalHeader>
                    <ModalBody>
                    Meet and get to know other workshop attendees. Briefly introduce yourself and your passion to other workshop attendees. <br></br>
Lunch served for event participants.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle12}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle12} style={{ cursor: 'pointer', fontSize: '17px' }}>
                    Lunch and Plenary Ice breaker
                    </span>
                  </CardTitle>
                  <CardBody>Get to know workshop attendees</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>Mon 12:20-1:50 PM</CardFooter>
                </Card>
              </Col>

              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle5}>
                  <CardImg
                    top
                    width="100%"
                    height="auto"
                    src="https://ita.ucsd.edu/workshop/18/images/beach_view.jpg"
                    alt="Graduation Day" style={{borderBottom: '1px solid lightgray'}}
                  />
                  <Modal
                    isOpen={this.state.modal5}
                    toggle={this.toggle5}
                    centered
                  >
                    <ModalHeader toggle={this.toggle5}>
                      Graduation Day
                    </ModalHeader>
                    <ModalBody>
                      Graduation Day provides a forum for exceptional graduate
                      students and recently-graduated postdocs seeking academic
                      careers to present expository talks on their research.
                      Presenters are selected by their schools through a
                      competitive process, and deliver either an oral talk or a
                      poster presentation. If you would like to participate in a
                      future graduation day, please contact attending faculty
                      from your institution or{' '}
                      <a href="mailto:ita@ucsd.edu">email us</a>.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle5}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle5} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Graduation Day
                    </span>
                  </CardTitle>
                  <CardBody> Research Overview Presentations</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>Wed 10AM–2PM</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} 
                onClick={this.toggle11}>
                  <CardImg
                    top
                    width="100%"
                    height="auto"
                    src={nsfLogoImg}
                    alt="An Update from NSF" style={{borderBottom: '1px solid lightgray'}}
                  />
                  <Modal
                    isOpen={this.state.modal11}
                    toggle={this.toggle11}
                    centered
                  >
                    <ModalHeader toggle={this.toggle11}>
                      An Update from NSF
                    </ModalHeader>
                    <ModalBody>
                    Everything you always wanted to know about NSF, but were afraid to ask.
                    <br></br>
                    A presentation about NSF funding opportunities followed by
                    a Q&amp;A session with program directors Philip Regalia
                    and Alexander Sprintson. 
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle11}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                  <span onClick={this.toggle5} style={{ cursor: 'pointer', fontSize: '17px' }}>
                    An Update from NSF
                    </span>
                  </CardTitle>
                  <CardBody> Everything you always wanted to know about NSF...</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px' }}>Wed ~5PM</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle6}>
                  <CardImg
                    top
                    width="100%"
                    height="auto"
                    src="https://ita.ucsd.edu/workshop/18/images/graduation.jpg"
                    alt="Student Posters" style={{borderBottom: '1px solid lightgray'}}
                  />
                  <Modal
                    isOpen={this.state.modal6}
                    toggle={this.toggle6}
                    centered
                  >
                    <ModalHeader toggle={this.toggle6}>
                      Poster Perfect
                    </ModalHeader>
                    <ModalBody>
                      Following last year’s success we will organize a student
                      poster session on Friday. If you would like to present
                      your work, please ask your advisor to recommend your
                      presentation to us at{' '}
                      <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>. Space may
                      be limited.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle6}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle6} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Student Posters
                    </span>
                  </CardTitle>
                  <CardBody>Show off your research!</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>Fri 12:30-2 PM</CardFooter>
                </Card>
              </Col>
            </Row>



            <div className="text-center">
              <h1 className="display-4 mt-7 mb-2" style={{ color: 'white' }}>
                Social Events
              </h1>
            </div>
            <Row style={{ fontSize: '12px' }}>
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle7}>
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src={superbowlImg}
                    alt="Super Bowl Party"
                  />
                  <Modal
                    isOpen={this.state.modal7}
                    toggle={this.toggle7}
                    centered
                  >
                    <ModalHeader toggle={this.toggle7}>
                      Super Bowl Party
                    </ModalHeader>
                    <ModalBody>
                      Kick off the workshop with Super Bowl LIV live at the Plumeria Suite, food and drinks.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle7}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle7} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Super Bowl LIV
                    </span>
                  </CardTitle>
                  <CardBody>Kick off the workshop</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>Sun 3:30 PM</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle3}>
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src={iowaImg}
                    alt="Iowa Caucuses"
                  />
                  <Modal
                    isOpen={this.state.modal3}
                    toggle={this.toggle3}
                    centered
                  >
                    <ModalHeader toggle={this.toggle3}>
                      Iowa Caucuses
                    </ModalHeader>
                    <ModalBody>
                      Predict, watch, and debate the Iowa Caucuses results, the opening salvo of a crazy election year.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle3}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle3} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Iowa Caucuses
                    </span>
                  </CardTitle>
                  <CardBody>Let chaos begin</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>Mon Evening</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle8}>
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src={stateOfTheUnionImg}
                    alt="State of the Union Address"
                  />
                  <Modal
                    isOpen={this.state.modal8}
                    toggle={this.toggle8}
                    centered
                  >
                    <ModalHeader toggle={this.toggle8}>
                      State of the Union Address
                    </ModalHeader>
                    <ModalBody>
                      State of the Union Address, Cheer and Jeer the POTUS State of the Union Address.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle8}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle8} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      State of the Union Address
                    </span>
                  </CardTitle>
                  <CardBody>POTUS SOTU 2020</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>Tue 6 PM</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle4}>
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src={flowerWorkshopImg}
                    alt="Flower Workshop"
                  />
                  <Modal
                    isOpen={this.state.modal4}
                    toggle={this.toggle4}
                    centered
                  >
                    <ModalHeader toggle={this.toggle4}>
                      Flower Workshop
                    </ModalHeader>
                    <ModalBody>
                      Tuesday evening, from 7pm to 9pm, professional floral designer Johnny Nguyen
  will run a workshop on the theory and practice of flower arrangement. Participants
  will design their own centerpiece bouquet for Wednesday’s banquet, and get to keep it afterwards.

                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle4}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle4} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Flower Workshop
                    </span>
                  </CardTitle>
                  <CardBody>Design your own Banquet Bouquet</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>Tue 7-9 PM</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle9}>
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src={bonfireImg}
                    alt="Bonfire"
                  />
                  <Modal
                    isOpen={this.state.modal9}
                    toggle={this.toggle9}
                    centered
                  >
                    <ModalHeader toggle={this.toggle9}>
                      Bonfire
                    </ModalHeader>
                    <ModalBody>
                      Bonfire by the beach
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle9}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-2">
                    <span onClick={this.toggle9} style={{ cursor: 'pointer' }}>
                      Bonfire
                    </span>
                  </CardTitle>
                  <CardBody>Bonfire by the beach</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px' }}>Thu 6 PM</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle10}>
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src={finalBashImg}
                    alt="Final Bash"
                  />
                  <Modal
                    isOpen={this.state.modal10}
                    toggle={this.toggle10}
                    centered
                  >
                    <ModalHeader toggle={this.toggle10}>
                      Final Bash
                    </ModalHeader>
                    <ModalBody>
                      Celebrate the end of the workshop with comestibles and libations and bid farewell to old and new friends!
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle10}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-2">
                    <span onClick={this.toggle10} style={{ cursor: 'pointer' }}>
                      Final Bash
                    </span>
                  </CardTitle>
                  <CardBody>Fun, food and farewell!</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px' }}>Fri 5 PM</CardFooter>
                </Card>
              </Col>
            </Row>


          </Container>
        </Jumbotron>
      </div>
    );
  };
}
