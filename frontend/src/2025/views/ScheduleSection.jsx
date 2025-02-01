import React from 'react';
import {
  Jumbotron,
  Container,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';

// constants from schedulepage
import { scheduleData } from './SchedulePage/schedule-24';

import styles from './ScheduleSection.module.css';
import classNames from 'classnames';
import { HashLink as Link } from 'react-router-hash-link';

// const talkData = scheduleData['talks'];
const sessionData = scheduleData['sessions'];
// const scheduleDayIds = scheduleData['schedule_list'];
const trackData = scheduleData['tracks'];
const dayData = {
  d_1: {
    id: '1',
    title: 'Monday',
    tracks: ['tr_1', 'tr_2'],
  },
  d_2: {
    id: '2',
    title: 'Tuesday',
    tracks: ['tr_3', 'tr_4'],
  },
  d_3: {
    id: '2',
    title: 'Tuesday',
    tracks: ['tr_5', 'tr_6'],
  },
  d_4: {
    id: '4',
    title: 'Thursday',
    tracks: ['tr_7', 'tr_8'],
  },
  d_5: {
    id: '5',
    title: 'Friday',
    tracks: ['tr_9', 'tr_10'],
  },
};

export default class ScheduleSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scheduleList: [],
      formattedList: {},
      talkList: {},
      sessionList: {},
      trackList: {},
      dayList: {},
      modal1: false,
      showModal: false,
      awardSessionModal: false,
      showNeighborModal: false,
      showBossModal: false,
    };
    this.toggle1 = this.toggle1.bind(this);
    this.computeTalkSessionText = this.computeTalkSessionText.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleAwardSessionModal = this.toggleAwardSessionModal.bind(this);
  }

  toggleNeighborModal = () => {
    this.setState((prevState) => ({
      showNeighborModal: !prevState.showNeighborModal,
    }));
  };

  toggleBossModal = () => {
    this.setState((prevState) => ({
      showBossModal: !prevState.showBossModal,
    }));
  };

  toggle1() {
    this.setState({
      modal1: !this.state.modal1,
    });
  }

  toggleModal() {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  }

  toggleAwardSessionModal() {
    this.setState((prevState) => ({
      awardSessionModal: !prevState.awardSessionModal,
    }));
  }

  computeTalkSessionText(day, sessionIndex, daylist, tracklist, sessionlist) {
    let sessions = [];
    for (let j = 0; j < daylist[day]['tracks'].length; j++) {
      // console.log(tracklist[daylist[day]['tracks'][j]]['sessions'])
      if (
        sessionlist[
          tracklist[daylist[day]['tracks'][j]]['sessions'][sessionIndex]
        ] &&
        sessionlist[
          tracklist[daylist[day]['tracks'][j]]['sessions'][sessionIndex]
        ]['title'] !== 'title' &&
        sessionlist[
          tracklist[daylist[day]['tracks'][j]]['sessions'][sessionIndex]
        ]['title'] !== ''
      )
        sessions.push(
          sessionlist[
            tracklist[daylist[day]['tracks'][j]]['sessions'][sessionIndex]
          ]['title']
        );
    }
    let link = 'schedule2023/#' + day.split('_')[1];
    return (
      <td style={{ backgroundColor: 'white' }}>
        <a href={link}>Sessions: {sessions.join(', ')}</a>
      </td>
    );
  }

  render() {
    const mon1 = this.computeTalkSessionText(
      'd_1',
      0,
      dayData,
      trackData,
      sessionData
    );
    const mon2 = this.computeTalkSessionText(
      'd_1',
      1,
      dayData,
      trackData,
      sessionData
    );
    const mon3 = this.computeTalkSessionText(
      'd_1',
      2,
      dayData,
      trackData,
      sessionData
    );
    const mon4 = this.computeTalkSessionText(
      'd_1',
      3,
      dayData,
      trackData,
      sessionData
    );

    const tue1 = this.computeTalkSessionText(
      'd_2',
      0,
      dayData,
      trackData,
      sessionData
    );
    const tue2 = this.computeTalkSessionText(
      'd_2',
      1,
      dayData,
      trackData,
      sessionData
    );
    const tue3 = this.computeTalkSessionText(
      'd_2',
      2,
      dayData,
      trackData,
      sessionData
    );
    const tue4 = this.computeTalkSessionText(
      'd_2',
      3,
      dayData,
      trackData,
      sessionData
    );

    const wed1 = this.computeTalkSessionText(
      'd_3',
      0,
      dayData,
      trackData,
      sessionData
    );

    const wed2 = this.computeTalkSessionText(
      'd_3',
      1,
      dayData,
      trackData,
      sessionData
    );
    const wed3 = this.computeTalkSessionText(
      'd_3',
      2,
      dayData,
      trackData,
      sessionData
    );
    // const wed2 = this.computeTalkSessionText(
    //  'd_3',
    //  1,
    //  dayData,
    //  trackData,
    //  sessionData
    // );*/

    const thu1 = this.computeTalkSessionText(
      'd_4',
      0,
      dayData,
      trackData,
      sessionData
    );
    const thu2 = this.computeTalkSessionText(
      'd_4',
      1,
      dayData,
      trackData,
      sessionData
    );
    const thu3 = this.computeTalkSessionText(
      'd_4',
      2,
      dayData,
      trackData,
      sessionData
    );
    const thu4 = this.computeTalkSessionText(
      'd_4',
      3,
      dayData,
      trackData,
      sessionData
    );

    const fri1 = this.computeTalkSessionText(
      'd_5',
      0,
      dayData,
      trackData,
      sessionData
    );
    const fri2 = this.computeTalkSessionText(
      'd_5',
      1,
      dayData,
      trackData,
      sessionData
    );
    /*const fri3 = this.computeTalkSessionText(
      'd_5',
      2,
      dayData,
      trackData,
      sessionData
    );
    const fri4 = this.computeTalkSessionText(
      'd_5',
      3,
      dayData,
      trackData,
      sessionData
    );*/
    return (
      <div>
        <Jumbotron
          fluid
          id="outline"
          className="mt-0 mb-0"
          style={{ backgroundColor: 'azure' }}
        >
          <Container>
            <div className="text-center">
              <h1 className="display-4">
                <strong>Schedule</strong>
              </h1>
              {/* <h4>
              The schedule has been finalized. We will post the student and graduation day poster and talks by Thursday 2/9.<br></br>
               A few slots are still available, if you would like to speak, please 
                <a href="mailto:ita@ucsd.edu"> write us</a>.
              </h4>
              <a href="https://ita.ucsd.edu/workshop/23/images/ITA%20Schedule%202023.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' } }>
              <Button color="primary" size="lg" >
                Download Schedule</Button></a> */}

              <br></br>
              <br></br>

              {/* <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Default Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">8:15 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Breakfast (included with registration)
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Sessions Begin</td>
                  </tr>
                </tbody>
              </Table> */}

              <Table className="text-left big">
                <thead style={{ backgroundColor: '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Sunday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">6:30 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Reception,{' '}
                      <span style={{ color: 'gray' }}>
                        Nelson (5th floor ballroom)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Table className="text-left big">
                <thead style={{ backgroundColor: '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Monday, Tuesday, Thursday, Friday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Catered breakfast,{' '}
                      <span style={{ color: 'gray' }}>ITA Cove (beach)</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      <div>
                        Plenary session,{' '}
                        <span style={{ color: 'gray' }}>
                          Nelson (5th floor ballroom)
                        </span>
                      </div>
                      <ul>
                        <li>Monday: Innovation that may empower 6G</li>
                        <li>Tuesday: Three cheers for information theory</li>
                        <li>Thursday: Learning and reasoning</li>
                        <li>
                          Friday: Information, meaning, and understanding in
                          large models
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:15 AM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Break, light refreshments,{' '}
                      <span style={{ color: 'gray' }}>Bahia Patio</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:30 AM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Five parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">11:50 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      <div>
                        Lunch break,{' '}
                        <span style={{ color: 'gray' }}>
                          Nelson (5th floor ballroom) (except Friday)
                        </span>
                      </div>
                      <ul>
                        <li>
                          Monday:{' '}
                          <span
                            onClick={this.toggleNeighborModal}
                            style={{
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              color: '	#0096FF',
                            }}
                          >
                            Know thy neighbor - lightning introductions to
                            fellow participants
                          </span>{' '}
                          , lunch for session participants
                        </li>
                        <li>
                          Tuesday: State of the Information Theory Society,
                          Stark Draper, lunch for session participants
                        </li>
                        <li>
                          Thursday: (1) NSF presentation, (2){' '}
                          <span
                            onClick={this.toggleBossModal}
                            style={{
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              color: '	#0096FF',
                            }}
                          >
                            Hello boss - recruitment event
                          </span>
                          , light refreshments for session attendees
                        </li>
                        <li>Friday: Fun Bahia Patio, lunch on your own</li>
                      </ul>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">1:20 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Five parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:40 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Break, refreshments,{' '}
                      <span style={{ color: 'gray' }}>Bahia Patio</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:00 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Five parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:20 PM</th>
                    <td style={{ backgroundColor: 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      <div>
                        Special sessions:{' '}
                        <span style={{ color: 'gray' }}>
                          Nelson (5th floor ballroom) (except Friday)
                        </span>
                      </div>
                      <ul>
                        <li>
                          Monday: Award Sessions: Best 2023 papers from IT,
                          IT/Comm, SP societies{' '}
                          <Button
                            color="link"
                            onClick={this.toggleAwardSessionModal}
                            size="sm"
                          >
                            Learn More
                          </Button>
                        </li>
                        <li>
                          Tuesday: The secret to your success, followed by Taco
                          Tuesday outing
                        </li>
                        <li>
                          Thursday: Award Sessions: Best 2023 papers from
                          NeurIPS, ICML, ACL{' '}
                          <Button
                            color="link"
                            onClick={this.toggleAwardSessionModal}
                            size="sm"
                          >
                            Learn More
                          </Button>
                        </li>
                        <li>Friday: Farewell bash, light food</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5:30 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Dinner on your own (except Taco Tuesday), socialize{' '}
                      <span style={{ color: 'gray' }}>
                        at the Cabrillo Suite
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">7:00 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Friends, tv, games, refreshments{' '}
                      <span style={{ color: 'gray' }}>
                        at the Cabrillo Suite
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Modal
                isOpen={this.state.showNeighborModal}
                toggle={this.toggleNeighborModal}
                centered
              >
                <ModalHeader toggle={this.toggleNeighborModal}>
                  Know Thy Neighbor
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
                    Intro slides 2024 - add your own
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
                  <Button color="secondary" onClick={this.toggleNeighborModal}>
                    Close
                  </Button>
                </ModalFooter>
              </Modal>

              <Modal
                isOpen={this.state.showBossModal}
                toggle={this.toggleBossModal}
                centered
              >
                <ModalHeader toggle={this.toggleBossModal}>
                  Hello Boss
                </ModalHeader>
                <ModalBody className="text-center">
                  The event will match students and postdocs to internship
                  mentors, postdoc supervisors, and companies. Each will present
                  one slide for at most a minute, and fun matching will follow.
                  Microsoft, Qualcomm, Samsung, and others have expressed
                  interest in participating.<br></br>
                  Please fill your slide and upload your resume below. During
                  the event you will use your slide to introduce yourself in a
                  minute or less. Please upload your information below.
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
                  <a
                    href="https://docs.google.com/presentation/d/1XKTscFbLNfHPMfNs-Ma6nHDzg9XeUzAvIzQhCkqkh3o/edit#slide=id.g7d38376bc7_385_75"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mentors/Employers slides
                  </a>
                  <br></br>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleBossModal}>
                    Close
                  </Button>
                </ModalFooter>
              </Modal>

              <Modal
                isOpen={this.state.awardSessionModal}
                toggle={this.toggleAwardSessionModal}
              >
                <ModalHeader toggle={this.toggleAwardSessionModal}>
                  Why ITA?
                </ModalHeader>
                <ModalBody>
                  Why travel to numerous conferences and pore over multiple
                  journals, when you can just attend to ITA and hear the best
                  talks from top venues: Information Theory, IT+Communications
                  Society, Signal Processing, ICML, NeurIPS, ACL. Monday and
                  Thursday at 4:30pm.
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={this.toggleAwardSessionModal}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
              {/* 
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Tuesday, February 20th</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Catered breakfast
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                      Plenary session: Three cheers for information theory
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">10:15 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:30 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                      Five parallel sessions, 4 talks each
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">11:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Lunch: State of the Information Theory Society, Stark Draper, catered lunch
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Five parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Five parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Teaching mentoring, followed by Taco Tuesday
                    </td>
                  </tr>
                </tbody>
              </Table> */}

              <Table className="text-left big">
                <thead style={{ backgroundColor: '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Wednesday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Catered breakfast,{' '}
                      <span style={{ color: 'gray' }}>ITA Cove (beach)</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Three parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Break, light refreshments,{' '}
                      <span style={{ color: 'gray' }}>Bahia Patio</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Graduation day talks, three sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Graduation day posters and general posters, catered lunch,{' '}
                      <span style={{ color: 'gray' }}>Bahia Patio</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:40 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Plenary session: New developments in algorithmic
                      economics, <span style={{ color: 'gray' }}>Ballroom</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:55 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:10 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      ITA 2025 Challenge kickoff session: Where we formulate a
                      challenge for next year’s ITA,{' '}
                      <span style={{ color: 'gray' }}>Ballroom</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:00 PM</th>
                    <td style={{ backgroundColor: 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">3:55 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Entertainment session,{' '}
                      <span style={{ color: 'gray' }}>Ballroom</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6:45 PM</th>
                    <td style={{ backgroundColor: 'white' }}>
                      Banquet, entertainment, Graduation day awards,{' '}
                      <span style={{ color: 'gray' }}>Ballroom</span>
                    </td>
                  </tr>
                </tbody>
              </Table>

              {/* <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Thursday, February 22nd</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Catered breakfast
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                      Plenary session: Learning and reasoning
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">10:15 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:30 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                      Five parallel sessions, 4 talks each
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">11:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Lunch: NSF presentation, Recruitment event, light food
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Five parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Five parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Award Session: NeurIPS, ICML, ACL
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Friday, February 23rd</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Catered breakfast
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                      Plenary session: Information, meaning, and understanding in large models
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">10:15 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:30 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                      Five parallel sessions, 4 talks each
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">11:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Lunch: Fun Bahia Patio
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Five parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Five parallel sessions, four talks each
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    Farewell bash: Light food
                    </td>
                  </tr>
                </tbody>
              </Table> */}

              {/* <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Firday, February 23</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Breakfast
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#1" >Sessions: Low-Density Parity Check (LDPC) Codes; Information Theoretic Cryptography; Machine Learning; Deep Neural Network Analysis; Estimation and Detection</Link>
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#1" >Sessions: Error Correcting Codes and List Decoding; Compression, Communication and Capacity; Data-Centric, Online, and Self-Supervised Learning; Optimization and Robustness; Multiclass and Robust Classification</Link>
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <strong>Information Theory Society Town Hall</strong>, Matthieu Bloch, ITA Society President, catered lunch 
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break 
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary: <strong>Coding compexlity</strong> &mdash; Venkatesan Guruswami, Mahdi Cheraghchi, Sivakanth Gopi
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:45 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, light refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#1" >Sessions: Statistics; Compression, Prediction and Information Inequalities; Communication Theory; Coding Theory  2; Statistical Learning and Random Sequences</Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:40 PM</th>
                    <td style={eventStyle}>
                    <Link to="/schedule2023/#1" >Sessions : Blockchains; Coding Theory 3; Wireless Communication; Domain Generalization, Nonparametirc Estimation and Fair Inference; Quantum: Annealing, Detection and Learning</Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, on your own
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5:50 PM</th>
                    <td style={eventStyle}>
                    <strong>Valentine's Day Social</strong>, Fun Games and Team Building, food served 
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">7:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      End
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Wednesday, February 15th</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Breakfast, at Krishna Lounge 
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                      <Link to="/schedule2023/#2" >Graduation Day Presentations</Link>, at Cat, Barbie and Ken
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                      <Link to="/schedule2023/#2" >Graduation Day Presentations</Link>, at Cat, Barbie and Ken
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    <Link to="/schedule2023/#2" >Graduation Day Posters</Link>, at Mac (outdoor terrace between towers 1 and 3), catered lunch 
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary: <strong>Quantum Computing</strong> &mdash; Umesh Vazirani, Geoff Penington, Henry Yuen, at Barbie and Ken
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, light refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:45 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <strong>Start Your Own Open-AI</strong>, Quinn Li, Meir Feder, Sriram Vishwanath, Experienced Experts Discuss Starting Tech Companies,  at Barbie and Ken
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:45 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, on your own
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Banquet: Dinner and Entertainment, ticket required, at Cheese(Harborside, between towers 1 and 3)
                    </td>
                  </tr>
                  
                  <tr>
                    <th scope="row">9:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      End
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Thursday, February 16th</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Breakfast, at Krishna Lounge
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#3" >Sessions: Fairness and Robustness in Machine Learning  1  ;	Online Learning;	Information Theory  2;	Learning and Control 1  ;	Diffusion Models and Distributed Computations  ;	Efficient Algorithms and Lower bounds </Link>
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#3" >Sessions: Tools from Aoi, Network Science and SIT to Address Online Misinformation  ;	Game Theory: Spectrum Sharing, Reinforcement Learning and Matching Markets;	Optimal Transport; Distributed Learning & Decision Making 1;	Domain Adaptation, Age of Information and Inference Control;	Physical Layer Privacy, Secure Communication and Wireless Communication</Link>
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">11:40 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <strong>NSF Updates</strong>, Alhussein Abouzeid & Alfred Hero from NSF will discuss new programs and funding opportunities, at Cat<br></br>
                      <strong>Hello Boss</strong>, students and postdocs meet internship mentors, postdoc advisors, and employers, at Mouse<br></br>
                      Lunch on your own
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary: <strong>Deep Learning Theory</strong> &mdash; Nathan Srebro, Andrea Montanari, Matus Telgarsky
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:55 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, light refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:10 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#3" >Sessions : Differential Privacy  1  ;	Machine Learning and Applications;	Machine Learning and Neural Nets;	Robust Learning;	Coding Theory 4;	Statistical Learning Theory for Control</Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:50 PM</th>
                    <td style={eventStyle}>
                    <Link to="/schedule2023/#3" >Sessions : Graphs: Manifold Learning, Compression and Combinatorial Statisitics;	Reinforcement Learning  2;	Deep Learning; Distributed Learning & Decision Making 2;	Coding Theory 5;	Learning and Control 2</Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      End
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Friday, February 17th</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Breakfast
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#4" >Sessions: Privacy and Security in Machine Learning;	Fairness and Robustness in Machine Learning  2;	Trustworthy Machine Learning;	Distributed Learning & Decision Making 3;	Distributed Learning;	Statistics and Learning Theory</Link>
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#4" >Sessions : Differential Privacy  2;	Game Theory  1; Optimization;	Robust Learning in Presence of Adversaries; 	Optimal Algorithms and Generative Modelling;	Control Theory and Reinforcement Learning</Link>
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    <Link to="/schedule2023/#4" ><strong>Student Posters</strong></Link>, catered lunch
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary: <strong>Machine Learning Applications</strong> &mdash; Vahab Mirrokni, Aakanksha Chowdhery, Sebastien Bubeck
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:15 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, light refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#4" >Sessions : Information-Theoretic Tools for Trustworthy ML ;	Game Theory  2;	Deep Learning and Optimization;	Distributed Learning & Decision Making 4</Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <strong>Farewell Bash</strong>, Food and Goodbye
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      End
                    </td>
                  </tr>
                </tbody>
              </Table>
            

 */}
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
