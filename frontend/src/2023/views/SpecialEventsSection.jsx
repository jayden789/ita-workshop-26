import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHotdog } from '@fortawesome/free-solid-svg-icons';
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

import styles from './SpecialEventsSection.module.css';

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
      modal13: false,
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
    this.toggle13 = this.toggle13.bind(this);
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
  toggle13() {
    this.setState({
      modal13: !this.state.modal13,
    });
  }

  HatComponent() {
    return (
      // <img src='https://cdn3.iconfinder.com/data/icons/cafe-and-restaurant-1/512/Chefs_hat-512.png'
      // width="70px"
      // height="70px"
      // style={{
      //   position:'absolute',
      //   right:'-45%',
      //   top:'-30px',
      //   transform: "rotate(40deg)",
      //   objectFit: 'contain'}}/>
      <div></div>
    );
  }

  render = () => {
    const cardFooterStyle = { fontSize: '12px', minHeight: '25px' };
    const rowStyle = { height: '500px' };
    const imgHeight = '38%';
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
            <Row className="mb-2" style={rowStyle}>
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle1}
                >
                  <this.HatComponent />
                  <CardImg
                    top
                    width="100%"
                    height={imgHeight}
                    src={
                      'https://ita.ucsd.edu/workshop/23/images/SpecialEvents_Alumni_23.jpg'
                    }
                    alt="Alumni in Industry"
                    style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal1}
                    toggle={this.toggle1}
                    centered
                  >
                    <ModalHeader toggle={this.toggle1}>
                      Alumni in Industry
                    </ModalHeader>
                    <ModalBody>
                      Tingfang Ji (Qualcomm), Peter Kairouz (Google), Sujay
                      Sanghavi (UTexas) and Sreeram Kannan (UWashingthon) to
                      discuss ways that academics can work with industry.
                      <br></br> We will discuss questions such as, how do you
                      approach an industry if you do not know someone there
                      already? What is a good way to ask for funding if
                      available?
                      <br></br>Please bring us your questions too!
                      <br></br>Moderated by Christina Fragouli.
                      <br></br>Followed by a reception
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle1}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle1}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Alumni in Industry
                    </span>
                  </CardTitle>
                  <CardBody>
                    How academics interact with industry. Reception follows.{' '}
                    <br></br> <br></br>
                    <p style={{ display: 'flex', marginTop: '1em' }}>
                      Christina Fragouli
                    </p>
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Mon 4:30 PM
                  </CardFooter>
                </Card>
              </Col>

              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle2}
                >
                  <this.HatComponent />
                  <CardImg
                    top
                    width="100%"
                    height={imgHeight}
                    src="https://ita.ucsd.edu/workshop/23/images/SpecialEvents_IEEE_ITS_2_23.jpg"
                    alt="Information Theory Society"
                    style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal2}
                    toggle={this.toggle2}
                    centered
                  >
                    <ModalHeader toggle={this.toggle2}>IT Society</ModalHeader>
                    <ModalBody>
                      President's address followed by a town hall on forward
                      look for Information Theory and ITs Society.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle2}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle2}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      IT Society
                    </span>
                  </CardTitle>
                  <CardBody>
                    President's address and town hall. Lunch served.<br></br>{' '}
                    <br></br>
                    <p style={{ display: 'flex', marginTop: '4em' }}>
                      Matthieu Bloch
                    </p>
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Tue Noon
                  </CardFooter>
                </Card>
              </Col>

              {/* <Col>
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
                  <CardFooter className="mt-auto" style={cardFooterStyle}>Mon 12:20-1:50 PM</CardFooter>
                </Card>
              </Col> */}

              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle5}
                >
                  <this.HatComponent />
                  <CardImg
                    top
                    width="100%"
                    height={imgHeight}
                    src="https://ita.ucsd.edu/workshop/23/images/SpecialEvents_GraduationDay_23.jpg"
                    alt="Graduation Day"
                    style={{ borderBottom: '1px solid lightgray' }}
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
                      students and recently-graduated postdocs seeking research
                      careers to present expository talks about their work.
                      Distinguished judges will select roughly ten presentations
                      for award.
                      <br></br>
                      If you would like to participate in a future graduation
                      day, please contact attending faculty from your
                      institution or <a href="mailto:ita@ucsd.edu">email us</a>.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle5}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle5}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Graduation Day
                    </span>
                  </CardTitle>
                  <CardBody>
                    {' '}
                    Research Overview Presentations. <br></br> Jury awarded
                    prizes.
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Wed Noon
                  </CardFooter>
                </Card>
              </Col>
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle13}
                >
                  <CardImg
                    top
                    width="100%"
                    height={imgHeight}
                    src="https://ita.ucsd.edu/workshop/23/images/SpecialEvents_OpenAI_23.jpg"
                    alt="Graduation Day"
                    style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal13}
                    toggle={this.toggle13}
                    centered
                  >
                    <ModalHeader toggle={this.toggle13}>
                      Start the new <del>FTX</del> OpenAI
                    </ModalHeader>
                    <ModalBody>
                      Quinn Li, head of Qualcomm Ventures, Meir Feder the “Oscar
                      Entrepreneur”, and Sriram Vishwanath, IT’s serial
                      entrepreneur, will discuss the ins and outs of starting a
                      company.
                      <br></br>
                      If you like them to comment at the session about your
                      (open to the public) idea, please upload it
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLScKkIF-WYuqUN1k3x_OJs1R20akP6qfTl6er2zBaDkmdxmKJw/viewform?usp=sf_link">
                        {' '}
                        here
                      </a>
                      .
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle13}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle13}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Start the new <del>FTX</del> OpenAI
                    </span>
                  </CardTitle>
                  <CardBody>
                    {' '}
                    Hear from pros how to start your own company.
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Wed 3:40 PM
                  </CardFooter>
                </Card>
              </Col>

              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle11}
                >
                  <CardImg
                    top
                    width="100%"
                    height={imgHeight}
                    src={nsfLogoImg}
                    alt="An Update from NSF"
                    style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal11}
                    toggle={this.toggle11}
                    centered
                  >
                    <ModalHeader toggle={this.toggle11}>
                      NSF Opportunities
                    </ModalHeader>
                    <ModalBody>
                      Everything you always wanted to know about NSF, but were
                      afraid to ask.
                      <br></br>A presentation about NSF funding opportunities
                      followed by Q&A and (optional, non-free) lunch with
                      program directors Alhussein Abouzeid and Alfred Hero.
                      <br></br>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle11}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle11}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      NSF Opportunities
                    </span>
                  </CardTitle>
                  <CardBody>
                    {' '}
                    New programs and funding opportunities. <br></br>
                    <br></br>
                    <p style={{ display: 'flex', marginTop: '2.5em' }}>
                      Alhussein Abouzeid & Alfred Hero
                    </p>
                  </CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px' }}>
                    Thu 11:50 AM
                  </CardFooter>
                </Card>
              </Col>
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle6}
                >
                  <this.HatComponent />
                  <CardImg
                    top
                    width="100%"
                    height={imgHeight}
                    src="https://ita.ucsd.edu/workshop/23/images/SpecialEvents_poster_23.jpg"
                    alt="Student Posters"
                    style={{ borderBottom: '1px solid lightgray' }}
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
                      Outdoor student poster sessions along with lunch, Friday.
                      To present your work please upload your poster
                      information.
                      <br></br>
                      Audience award to a few posters.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle6}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle6}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Poster Perfect
                    </span>
                  </CardTitle>
                  <CardBody>Student posters & yummy lunch</CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Fri Noon
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <br></br>
            <br></br>

            <div className="text-center" id="socialevents">
              <h1 className="display-4 mt-7 mb-2" style={{ color: 'white' }}>
                Social Events
              </h1>
              <h4 style={{ color: 'white' }}>
                To mark Valentine’s Day week, we will hold several activities
                that bring together students, postdocs, researchers, and
                faculty, foster new friendships and research collaborations, and
                facilitate employment and mentorship opportunities.
              </h4>
            </div>
            <Row style={rowStyle}>
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle7}
                >
                  <this.HatComponent />
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src="https://www.goodencenter.org/wp-content/uploads/2019/02/bigstock-223855057.jpg"
                    alt="Free No Free Lunch Lunch"
                  />
                  <Modal
                    isOpen={this.state.modal7}
                    toggle={this.toggle7}
                    centered
                  >
                    <ModalHeader toggle={this.toggle7}>
                      Free No Free Lunch Lunch
                    </ModalHeader>
                    <ModalBody className="text-center">
                      Lunch and lightning introductions to fellow participants
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1hvMHeyXEhFTLJdVJxQG5xCeMb0BdFB3UOXF9UTTApjg/edit#slide=id.g7d38376bc7_83_5"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Add your intro slide
                      </a>
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1mRNx_yoQ416PJBBk230U_GLutMuU__dravC83N0uoqE/edit#slide=id.p"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        See past intro slides
                      </a>
                      <br></br>
                      <a
                        href="https://www.youtube.com/watch?v=jhW3S7ha9mw&list=PLbbCsk7MUIGf6Y-rCWFRv-n3l6-fBVKSK&index=3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch past intros
                      </a>
                      <br></br>
                      Moderated by Rick Wesel
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle7}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle7}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Know Thy Neighbor
                    </span>
                  </CardTitle>
                  <CardBody>
                    Lightning intros to fellow participants. <br></br>
                    <a href="javascript:void(0)" onClick={this.toggle7}>
                      Create your “ITA Business Card”
                    </a>
                    .<p style={{ marginTop: '1em' }}>Rick Wesel</p>
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Monday
                  </CardFooter>
                </Card>
              </Col>
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle8}
                >
                  <this.HatComponent />
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src="https://ita.ucsd.edu/workshop/23/images/SpecialEvents_valentine_23.jpg"
                    alt="Valentine’s Day Social"
                  />
                  <Modal
                    isOpen={this.state.modal8}
                    toggle={this.toggle8}
                    centered
                  >
                    <ModalHeader toggle={this.toggle8}>
                      Valentine’s Day Social
                    </ModalHeader>
                    <ModalBody>
                      {/* Please <a href="mailto:ita@ucsd.edu">email us</a> to propose games and activities, let us know if you are willing to participate.  */}
                      Experience the thrill of the competition and the joy of
                      collaboration at this evening’s social event at ITA.
                      <br></br>
                      Join us for AI assisted games where you work with your
                      team to win exciting prizes!!!
                      <br></br>
                      Get ready for the ultimate showdown!
                      <br></br>
                      Location: Where Monday lunch was :)
                      <img
                        src="https://ita.ucsd.edu/workshop/23/images/SocialEventsModal_ValentinesDay.jpg"
                        style={{ 'object-fit': 'contain' }}
                      ></img>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle8}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle8}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Valentine’s Day Social
                    </span>
                  </CardTitle>
                  <CardBody>
                    Valentine’s day event with games, food and social
                    interaction
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Tue 5:50 PM
                  </CardFooter>
                </Card>
              </Col>
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle3}
                >
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src="https://ita.ucsd.edu/workshop/23/images/SpecialEvents_nextboss_23.jpg"
                    alt="Hello Boss"
                  />
                  <Modal
                    isOpen={this.state.modal3}
                    toggle={this.toggle3}
                    centered
                  >
                    <ModalHeader toggle={this.toggle3}>Hello Boss</ModalHeader>
                    <ModalBody className="text-center">
                      The event will match students and postdocs to internship
                      mentors, postdoc supervisors, and companies. Each will
                      present one slide for at most a minute, and fun matching
                      will follow. Microsoft, Qualcomm, Samsung, and others have
                      expressed interest in participating.<br></br>
                      Please fill your slide and upload your resume below.
                      During the event you will use your slide to introduce
                      yourself in a minute or less. Please upload your
                      information below.
                      <br></br>
                      For workshop participants only.
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1JI5PMcW6bb1LaHdJsLtQmuwHFiZi2jVT7SxbLqvPiuY/edit#slide=id.p"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Students/ Postdoc slides
                      </a>
                      <br></br>
                      <a
                        href="https://docs.google.com/forms/d/1NGJDS-eO01Mz1znDkQ3H3VW2XbQGn508hiRZXA93EIw/edit#settings"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resumes
                      </a>
                      <br></br>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle3}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle3}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Hello Boss
                    </span>
                  </CardTitle>
                  <CardBody>
                    A fun event where students and postdocs,{' '}
                    <a href="javascript:void(0)">
                      meet potential internship mentors, postdoc advisors, and
                      employers.
                    </a>
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Thu 11:40 AM
                  </CardFooter>
                </Card>
              </Col>
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle4}
                >
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src="https://ita.ucsd.edu/workshop/23/images/SpecialEvents_games_23.png"
                    alt="Fun and Games"
                  />
                  <Modal
                    isOpen={this.state.modal4}
                    toggle={this.toggle4}
                    centered
                  >
                    <ModalHeader toggle={this.toggle4}>
                      Fun and Games
                    </ModalHeader>
                    <ModalBody>Games and other fun activities</ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle4}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle4}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Fun and Games
                    </span>
                  </CardTitle>
                  <CardBody>Games and other fun activities</CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Thu Lunchtime
                  </CardFooter>
                </Card>
              </Col>
              {/* <Col>
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
              </Col> */}
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle10}
                >
                  <this.HatComponent />
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
                    <ModalHeader toggle={this.toggle10}>Final Bash</ModalHeader>
                    <ModalBody>
                      Celebrate the end of the workshop with comestibles and
                      libations and bid farewell to old and new friends!
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle10}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggle10}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Final Bash
                    </span>
                  </CardTitle>
                  <CardBody>Fun, food and farewell!</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px' }}>
                    Friday
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  };
}
