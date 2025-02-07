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
import awardImg from './img2025/award.jpg';
import challengesImg from './img2024/challenges.jpeg';
import successImg from './img2024/success.jpeg';
import morning1 from './img2024/morning-1.png';
import morning2 from './img2024/morning-2.png';
import entertainment from './img2024/entertainment.jpeg';
import running from './img2024/running.jpeg';
import startupImg from './img2025/startup.jpeg'
import townhallImg from './img2025/townhall.jpg'
import gradImg from './img2025/grad.jpg'
import bossImg from './img2025/boss.jpg'
import gameImg from './img2025/game.jpg'
import thriveImg from './img2025/thrive.jpg'

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
      modalSecretSuccess: false,
      entertainmentModal: false,
      morningModal: false,
      modalThrive: false,
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
    this.toggleEntertainment = this.toggleEntertainment.bind(this);
    this.toggleMorning = this.toggleMorning.bind(this);
    this.toggleThrive = this.toggleThrive.bind(this);
    this.toggleSecretSuccess = this.toggleSecretSuccess.bind(this);
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

  toggleThrive() {
    this.setState({
      modalThrive: !this.state.modalThrive,
    });
  }

  toggleEntertainment() {
    this.setState({
      entertainmentModal: !this.state.entertainmentModal,
    });
  }

  toggleMorning() {
    this.setState({
      morningModal: !this.state.morningModal,
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

  toggleSecretSuccess() {
    this.setState((prevState) => ({
      modalSecretSuccess: !prevState.modalSecretSuccess,
    }));
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
    const rowStyle = { height: '550px' };
    const imgHeight = '38%';
    return (
      <div>
        <Jumbotron
          fluid
          id="specialevents"
          className="mt-0 mb-0 SpecialBackground"
        >
          <Container style={{ maxWidth: '1550px' }}>
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
                  onClick={this.toggle13}
                >
                  <CardImg
                    top
                    width="100%"
                    height={imgHeight}
                    src={awardImg}
                    alt="Award Sessions"
                    style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal13}
                    toggle={this.toggle13}
                    centered
                  >
                    <ModalHeader toggle={this.toggle13}>
                      Award Sessions
                    </ModalHeader>
                    <ModalBody>
                      Why travel to multiple conferences, and mull through
                      numerous journals, when you can just attend ITA and hear
                      the best talks from top journals and conferences. On
                      Monday at 9:00 we’ll hear Joint Communications and Information 
                      Theory Society Paper Awardee, and the James Massey Research 
                      and Education Awardee. On Thursday we’ll hear the winners of the
                      ICML, ACL, and ALT Paper Awards.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle13}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">Award Sessions</CardTitle>
                  <CardBody>
                    This year’s award winning papers from top journals and
                    conferences.
                    <br />
                    <br />
                    <br />
                    <br />
                    Pia Pal and Ahmad Beirami
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Mon, Thu 9AM
                  </CardFooter>
                </Card>
              </Col>
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggleThrive}
                >
                  <this.HatComponent />
                  <CardImg
                    top
                    width="100%"
                    height={imgHeight}
                    src={thriveImg}
                    alt="How to thrive as a researcher"
                    style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modalThrive}
                    toggle={this.toggleThrive}
                    centered
                  >
                    <ModalHeader toggle={this.toggleThrive}>How to thrive as a researcher</ModalHeader>
                    <ModalBody>
                      The panel will focus on "How to Thrive as an Outlier?" and help the ITA participants 
                      learn more about life as a professional researcher, straddling industry and academia, 
                      the challenges of work-life balance.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggleThrive}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggleThrive}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      How to thrive as a researcher
                    </span>
                  </CardTitle>
                  <CardBody>
                      Help participants learn more about life as a professional researcher and the challenges of work-life balance.
                    <br />
                    <br />
                    Lalitha Sankar
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Mon noon
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
                    src={townhallImg}
                    alt="Information Theory Town Hall"
                    style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal2}
                    toggle={this.toggle2}
                    centered
                  >
                    <ModalHeader toggle={this.toggle2}>IT Town Hall</ModalHeader>
                    <ModalBody>
                      President's address followed by a town hall on forward
                      look for Information Theory.
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
                      Information Theory Townhall
                    </span>
                  </CardTitle>
                  <CardBody>
                    President's address and town hall. Lunch served.
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    Aaron Wagner
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Tue noon
                  </CardFooter>
                </Card>
              </Col>

              {/* <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggleSecretSuccess}
                >
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src={successImg}
                    alt="The Secret to Your Success"
                  />
                  <Modal
                    isOpen={this.state.modalSecretSuccess}
                    toggle={this.toggleSecretSuccess}
                    centered
                  >
                    <ModalHeader toggle={this.toggleSecretSuccess}>
                      The Secret to Your Success
                    </ModalHeader>
                    <ModalBody>
                      Lively discussion and proven advice about careers in
                      academia and research, navigating the tangled academic /
                      research career path, productivity tips, how to engage
                      with industry and make an impact, and maintaining a
                      healthy work-life balance. Moderated by the IT Society
                      WHITHITS officers Rashmi Vinayak and Sanghamitra Dutta.
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary"
                        onClick={this.toggleSecretSuccess}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggleSecretSuccess}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      The Secret to Your Success
                    </span>
                  </CardTitle>
                  <CardBody>
                    Career advice, productivity tips, making an impact.
                    <br />
                    <br />
                    Rashmi Vinayak and Sanghamitra Dutta
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Tue 4:30PM
                  </CardFooter>
                </Card>
              </Col> */}

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
                    src={gradImg}
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
                      If you would like to participate in a graduation
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
                    Graduating students and postdocs present their work, Jury
                    awarded prizes.
                    <br />
                    <br />
                    <br />
                    Parinaz Naghizadeh
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Wed 10:40AM
                  </CardFooter>
                </Card>
              </Col>

              {/* <Col>
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
                    src={challengesImg}
                    alt="Student Posters"
                    style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal6}
                    toggle={this.toggle6}
                    centered
                  >
                    <ModalHeader toggle={this.toggle6}>
                      <p>
                        ITA 3<sup>4</sup>5<sup>2</sup>Challenge Kickoff
                      </p>
                    </ModalHeader>
                    <ModalBody>
                      We are starting a new tradition, the ITA challenge.
                      Propose a new, important, interesting, and quantifiable
                      challenge
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
                      <p>
                        ITA 3<sup>4</sup>5<sup>2</sup> Challenge Kickoff
                      </p>
                    </span>
                  </CardTitle>
                  <CardBody>
                    Propose an award-bearing challenge for the next ITA.{' '}
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Wed 3:20PM
                  </CardFooter>
                </Card>
              </Col> */}
              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle3}
                >
                  <CardImg
                    top
                    width="100%"
                    height={imgHeight}
                    src={bossImg}
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
                      will follow. Qualcomm, Samsung, and others have
                      expressed interest in participating.<br></br>
                      Please fill your slide and upload your resume below.
                      During the event you will use your slide to introduce
                      yourself in a minute or less. Please upload your
                      information below.
                      <br></br>
                      For workshop participants only.
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1F02syUTPL2bNVaAGZB-sqbsv5VVyO2sYLq2RqP60g4Y/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Students/ Postdoc slides 2025 - Add Your Own
                      </a>
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1JI5PMcW6bb1LaHdJsLtQmuwHFiZi2jVT7SxbLqvPiuY/edit#slide=id.p"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Students/ Postdoc slides 2024
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
                      <a
                        href="https://docs.google.com/presentation/d/1Z0RBMWGhBMJSY0IAPP806LH0XZrmFOMsF8WVDXXIE9s/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Mentors/Employers slides 2025 - Add Your Own
                      </a>
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1XKTscFbLNfHPMfNs-Ma6nHDzg9XeUzAvIzQhCkqkh3o/edit#slide=id.g7d38376bc7_385_75"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Mentors/Employers slides 2024
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
                      meet potential internship mentors, postdoc advisors, and
                      employers.
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Thu Noon
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
                    src={startupImg}
                    alt="Startup ITAcubator"
                    style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal11}
                    toggle={this.toggle11}
                    centered
                  >
                    <ModalHeader toggle={this.toggle11}>
                      Startup ITAcubator
                    </ModalHeader>
                    <ModalBody>
                    This event will consist of researchers who started companies, sharing 
                    their experience and providing advice to aspiring entrepreneurs. You 
                    can propose your ideas or ask questions. Our last session has resulted 
                    in seed funding.
                    <br></br>
                    <a
                      href="https://docs.google.com/presentation/d/19bXfDuhd43gRSsKNFfMUkTaFAQYPHJ0B6z8FvL3IMxg/edit#slide=id.p"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Idea and question slides
                    </a>
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
                      Startup ITAcubator
                    </span>
                  </CardTitle>
                  <CardBody>
                    {' '}
                    Experience and advice from community members who founded startups
                    <br></br>
                    <br></br>
                    <br></br>
                    <p>
                    Salman Avestimehr and Alex Dimakis
                    </p>
                  </CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px' }}>
                    Fri Noon
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <br></br>
            <br></br>

            <div
              className="text-center"
              id="socialevents"
              style={{ marginTop: '20px' }}
            >
              <h1 className="display-4 mt-7 mb-2" style={{ color: 'white' }}>
                Social Events
              </h1>
              <h4 style={{ color: 'white' }}>
                Several activities that bring together students, postdocs,
                researchers, and faculty, foster new friendships and research
                collaborations, and facilitate employment and mentorship
                opportunities.
              </h4>
            </div>
            <Row style={rowStyle}>
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
                    src={gameImg}
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
                  <CardBody>Friends, games, TV, and refreshments</CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Daily 7PM
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
                      Lunch and lightning introductions to fellow participants.
                      Create your ITA business card here:
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1oRA3UA0hGI8KHgCdd5Yc37Sub-2ik5ae3Azu2i2QELc/edit#slide=id.p"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Intro slides 2025 - add your own
                      </a>
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1RZ28k44RAXSbQKo1yh1lczS9mKR_mBQamKphH5y2IrM/edit#slide=id.p"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Intro slides 2024
                      </a>
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1hvMHeyXEhFTLJdVJxQG5xCeMb0BdFB3UOXF9UTTApjg/edit#slide=id.g7d38376bc7_83_5"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Intro slides 2023
                      </a>
                      <br></br>
                      <a
                        href="https://docs.google.com/presentation/d/1mRNx_yoQ416PJBBk230U_GLutMuU__dravC83N0uoqE/edit#slide=id.p"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Intro slides 2020
                      </a>
                      <br></br>
                      <a
                        href="https://www.youtube.com/watch?v=jhW3S7ha9mw&list=PLbbCsk7MUIGf6Y-rCWFRv-n3l6-fBVKSK&index=3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Intro video 2020
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
                    Lightning intros to fellow participants. Lunch served.{' '}
                    <br></br>
                    <a href="javascript:void(0)" onClick={this.toggle7}>
                      Create your “ITA Business Card”
                    </a>
                    <p style={{ marginTop: '1em' }}>Rick Wesel</p>
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Monday Noon
                  </CardFooter>
                </Card>
              </Col>

              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggleMorning}
                >
                  <this.HatComponent />
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src={running}
                    alt="Morning run"
                  />
                  <Modal
                    isOpen={this.state.morningModal}
                    toggle={this.toggleMorning}
                    centered
                  >
                    <ModalHeader toggle={this.toggleMorning}>
                      Morning runs
                    </ModalHeader>
                    <ModalBody className="text-center">
                      <img src={morning1} alt="Morning run" />
                      <img src={morning2} alt="Morning run" className="mt-4" />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggleMorning}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggleMorning}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Morning runs
                    </span>
                  </CardTitle>
                  <CardBody>
                    Scenic 5km runs around the bay, see popup for details
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Tue and Thu ~ 6:45am
                  </CardFooter>
                </Card>
              </Col>

              <Col>
                <Card
                  className="text-center"
                  style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggleEntertainment}
                >
                  <this.HatComponent />
                  <CardImg
                    top
                    width="100%"
                    height="40%"
                    src={entertainment}
                    alt="Entertainment party"
                  />
                  <Modal
                    isOpen={this.state.entertainmentModal}
                    toggle={this.toggleEntertainment}
                    centered
                  >
                    <ModalHeader toggle={this.toggleEntertainment}>
                      Entertainment Session
                    </ModalHeader>
                    <ModalBody className="text-center">
                      Looking at the lighter side of research and ITA. Please{' '}
                      <a href="mailto:ita@ucsd.edu">email us</a> if you are
                      willing to participate.
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary"
                        onClick={this.toggleEntertainment}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span
                      onClick={this.toggleEntertainment}
                      style={{ cursor: 'pointer', fontSize: '17px' }}
                    >
                      Entertainment Session
                    </span>
                  </CardTitle>
                  <CardBody>
                    Lightning intros to fellow participants. Lunch served.{' '}
                    <br></br>
                    <a
                      href="javascript:void(0)"
                      onClick={this.toggleEntertainment}
                    >
                      Create your “ITA Business Card”
                    </a>
                    <p style={{ marginTop: '1em' }}>
                      
                    </p>
                  </CardBody>
                  <CardFooter className="mt-auto" style={cardFooterStyle}>
                    Wed 4:10pm
                  </CardFooter>
                </Card>
              </Col>

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
                    alt="Farewell Bash"
                  />
                  <Modal
                    isOpen={this.state.modal10}
                    toggle={this.toggle10}
                    centered
                  >
                    <ModalHeader toggle={this.toggle10}>
                      Farewell Bash
                    </ModalHeader>
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
                      Farewell Bash
                    </span>
                  </CardTitle>
                  <CardBody>Fun, food, and farewell friends</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px' }}>
                    Fri 4:30PM
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
