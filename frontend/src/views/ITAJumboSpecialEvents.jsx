import React from 'react';
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

export default class ITAJumboSpecialEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
    };

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
    this.toggle5 = this.toggle5.bind(this);
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
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardImg
                    style={{ cursor: 'pointer' }}
                    onClick={this.toggle1}
                    top
                    width="100%"
                    src="https://www.itsoc.org/++theme++itsoc.diazotheme/static/images/logo.png"
                    alt="Information Theory Society"
                  />
                  <Modal
                    isOpen={this.state.modal1}
                    toggle={this.toggle1}
                    centered
                  >
                    <ModalHeader toggle={this.toggle1}>
                      Information Theory: The State of the Union, the State of
                      the Art, and the Shape of the Horizon
                    </ModalHeader>
                    <ModalBody>
                    A president's address followed by an outline of technical and social activities carried out and planned by the Information Theory Society.<br /> Participants include the society officers and the activity leaders.  <br />
                      Light lunch served (free, but requires signup at the
                      workshop tab)
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle1}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-2">
                    <span onClick={this.toggle1} style={{ cursor: 'pointer' }}>
                      Information Theory Society
                    </span>
                  </CardTitle>
                  <CardBody>Light Lunch Served</CardBody>
                  <CardFooter className="mt-auto">Mon 12:30 - 2</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardImg
                    style={{ cursor: 'pointer' }}
                    onClick={this.toggle2}
                    top
                    width="100%"
                    src="https://ita.ucsd.edu/workshop/18/images/beach_view.jpg"
                    alt="Graduation Day"
                  />
                  <Modal
                    isOpen={this.state.modal2}
                    toggle={this.toggle2}
                    centered
                  >
                    <ModalHeader toggle={this.toggle2}>
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
                      <Button color="secondary" onClick={this.toggle2}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-2">
                    <span onClick={this.toggle2} style={{ cursor: 'pointer' }}>
                      Graduation Day
                    </span>
                  </CardTitle>
                  <CardBody> Research Overview Presentations</CardBody>
                  <CardFooter className="mt-auto">Wed 10 – 2</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardImg
                    style={{ cursor: 'pointer' }}
                    onClick={this.toggle3}
                    top
                    width="100%"
                    src="https://ita.ucsd.edu/workshop/19/images/valentine.jpg"
                    alt="Viva Valentine"
                  />
                  <Modal
                    isOpen={this.state.modal3}
                    toggle={this.toggle3}
                    centered
                  >
                    <ModalHeader toggle={this.toggle3}>
                      Viva Valentine
                    </ModalHeader>
                    <ModalBody>
                      Valentine’s evening event with food, fun, and prizes, to
                      promote collaboration and collegiality. (Registration
                      Required)
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle3}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-2">
                    <span onClick={this.toggle3} style={{ cursor: 'pointer' }}>
                      Viva Valentine
                    </span>
                  </CardTitle>
                  <CardBody>Evening Food and Fun</CardBody>
                  <CardFooter className="mt-auto">Thu 7 - 9</CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%' }}>
                  <CardImg
                    style={{ cursor: 'pointer' }}
                    onClick={this.toggle4}
                    top
                    width="100%"
                    src="https://ita.ucsd.edu/workshop/18/images/graduation.jpg"
                    alt="Student Posters"
                  />
                  <Modal
                    isOpen={this.state.modal4}
                    toggle={this.toggle4}
                    centered
                  >
                    <ModalHeader toggle={this.toggle4}>
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
                      <Button color="secondary" onClick={this.toggle4}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-2">
                    <span onClick={this.toggle4} style={{ cursor: 'pointer' }}>
                      Student Posters
                    </span>
                  </CardTitle>
                  <CardBody>Show off your research!</CardBody>
                  <CardFooter className="mt-auto">Fri 12:30 - 2</CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  };
}
