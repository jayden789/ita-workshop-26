import React from 'react';
import { Jumbotron, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

// constants from schedulepage
import { scheduleData } from './SchedulePage/schedule-118';

import styles from './ITAScheduleOutline.module.css';
import classNames from 'classnames';

// const talkData = scheduleData['talks'];
const sessionData = scheduleData['sessions'];
// const scheduleDayIds = scheduleData['schedule_list'];
const trackData = scheduleData['tracks'];
const dayData = {
  d_1: {
    id: 'd_1',
    title: 'Monday',
    tracks: ['tr_1', 'tr_2', 'tr_3', 'tr_4', 'tr_5'],
  },
  d_2: {
    id: 'd_2',
    title: 'Tuesday',
    tracks: ['tr_7', 'tr_8', 'tr_9', 'tr_10', 'tr_11', 'tr_12'],
  },
  d_3: {
    id: 'd_3',
    title: 'Wednesday',
    tracks: ['tr_13', 'tr_14', 'tr_15', 'tr_16', 'tr_17', 'tr_18'],
  },
  d_4: {
    id: 'd_4',
    title: 'Thursday',
    tracks: ['tr_19', 'tr_20', 'tr_21', 'tr_22', 'tr_23', 'tr_24'],
  },
  d_5: {
    id: 'd_5',
    title: 'Friday',
    tracks: ['tr_25', 'tr_26', 'tr_27', 'tr_28', 'tr_29', 'tr_30'],
  },
};

export default class ITAScheduleOutline extends React.Component {
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
    };
    this.toggle1 = this.toggle1.bind(this);
    this.computeTalkSessionText = this.computeTalkSessionText.bind(this);
  }

  toggle1() {
    this.setState({
      modal1: !this.state.modal1,
    });
  }

  computeTalkSessionText(day, sessionIndex, daylist, tracklist, sessionlist) {
    let sessions = [];
    for (let j = 0; j < daylist[day]['tracks'].length; j++) {
      if (
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
    let link = 'schedule/#' + day;
    return (
      <td style={{ 'backgroundColor': 'white' }}>
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

    //const wed1 = this.computeTalkSessionText(
    //  'd_3',
    //  0,
    //  dayData,
    //  trackData,
    //  sessionData
    //);
    //const wed2 = this.computeTalkSessionText(
    //  'd_3',
    //  1,
    //  dayData,
    //  trackData,
    //  sessionData
    //);

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
      2,
      dayData,
      trackData,
      sessionData
    );
    const fri3 = this.computeTalkSessionText(
      'd_5',
      3,
      dayData,
      trackData,
      sessionData
    );

    return (
      <div>
        <Jumbotron
          fluid
          id="outline"
          className="mt-0 mb-0"
          style={{ 'backgroundColor': 'white' }}
        >
          <Container>
            <div className="text-center">
              <h1 className="display-4">
                <strong>Schedule Outline</strong>
              </h1>
              <Table className={`text-left big ${styles.outlineTable}`}>
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Sunday, February 10th, 2019</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">6:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Opening Ceremony: reception with heavy hors d'oeuvres and
                      personal caricature drawing in the Aviary room
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Monday, Tuesday, Thursday Default Schedule</th>
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
                    <td style={{ 'backgroundColor': 'white' }}>Sessions</td>
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Sessions</td>
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Lunch break (catered on Monday, Wednesday, and Friday;
                      other days on your own)
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Plenaries</td>
                  </tr>
                  <tr>
                    <th scope="row">2:55 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">3:10 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Sessions</td>
                  </tr>
                  <tr>
                    <th scope="row">4:10 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Sessions</td>
                  </tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Monday, February 11th, 2019</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    {mon1}
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                    {mon2}
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <button className={classNames(
                        'clicky',
                        styles.linkbutton
                      )} onClick={this.toggle1}>Information Theory Society presentation and catered lunch
                      (free registration required)</button>
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
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session: <strong>6-G</strong> &mdash; Jeff
                      Andrews, Andrea Goldsmith, Yury Polyanskiy, John Smee
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:10 PM</th>
                    {mon3}
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    {mon4}
                  </tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Tuesday, February 12th, 2019</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    {tue1}
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                    {tue2}
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      {' '}
                      Lunch (on your own), soccer and volleyball by the beach
                      (see registration desk for lunch purchase)
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session: <strong>Distributed Learning</strong>{' '}
                      &mdash; Nati Srebro, Alex Dimakis, Brendan McMahan, Ayfer
                      Özgür
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:10 PM</th>
                    {tue3}
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    {tue4}
                  </tr>
                  <tr>
                    <th scope="row">6:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Fun With Your Creative Brain: Playful exercises designed
                      to spark your creativity and exercise your sense of humor
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Wednesday, February 13th, 2019</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <a href="schedule/#d_3">Graduation Day talks, part 1</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <a href="schedule/#d_3">Graduation Day talks, part 2</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <a href="schedule/#d_3">
                        Graduation Day posters and catered lunch
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session:{' '}
                      <strong>Mining Structures in Networks</strong> &mdash;
                      Olgica Milenkovic, David Gleich, Jiawei Han, Jure Leskovec
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Group photo</td>
                  </tr>
                  <tr>
                    <th scope="row">3:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      The ITALENT Show — The unexpected talent of ITA
                      participants, with prizes and surprises (till 5pm)
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6:15 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Banquet reception at the Aviary (ticket required) and fire
                      show on the lawn
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">7:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Banquet and Luau show (ticket required)
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Thursday, February 14th, 2019</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    {thu1}
                  </tr>

                  <tr>
                    <th scope="row">10:40 AM</th>
                    {thu2}
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Lunch (on your own); soccer, volleyball, and other games
                      by the beach (see registration desk for lunch purchase)
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session: <strong>Algorithmic Fairness</strong>{' '}
                      &mdash; Maya Gupta, Karthikeyan Ramamurthy, Omer Reingold,
                      Suresh Venkatasubramanian
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:10 PM</th>
                    {thu3}
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    {thu4}
                  </tr>
                  <tr>
                    <th scope="row">6:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Viva Valentine &mdash; A cruise aboard the W.D. Evans,
                      with entertainment and a chance to form new friendships
                      and collaborations
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Friday, February 15th, 2019</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session:{' '}
                      <strong>Denial in Machine Learning</strong> &mdash;
                      Dimitris Achlioptas, Edo Liberty, Christopher Ré, Benjamin
                      Recht
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                    {fri1}
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Student posters and lunch
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:40 PM</th>
                    {fri2}
                  </tr>
                  <tr>
                    <th scope="row">2:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">3:00 PM</th>
                    {fri3}
                  </tr>

                  <tr>
                    <th scope="row">4:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Closing Ceremony and Farewell Bash
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
