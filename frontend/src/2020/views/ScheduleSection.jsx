import React from 'react';
import { Jumbotron, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

// constants from schedulepage
import { scheduleData } from './SchedulePage/schedule-14';

import styles from './ScheduleSection.module.css';
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
    let link = 'schedule2020/#' + day;
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

    const wed1 = this.computeTalkSessionText(
     'd_3',
     0,
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
    // );

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
    const fri3 = this.computeTalkSessionText(
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
                    <th>Sunday, February 2nd, 2020</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">3:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Kick off the workshop with Super Bowl LIV live at the Plumeria Suite, food and drinks.
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Opening Ceremony: reception with heavy hors d'oeuvres and
                      south-of-the-border entertainment!
                     </td>
                  </tr>
                </tbody>
              </Table>
              <Table className="text-left big">
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
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Monday, February 3rd, 2020</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">9:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <button className={classNames(
                        'clicky',
                        styles.linkbutton
                      )} onClick={this.toggle1}>Information Theory Society presentation</button>
                      <Modal
                        isOpen={this.state.modal1}
                        toggle={this.toggle1}
                        centered
                      >
                        <ModalHeader toggle={this.toggle1}>
                        State of the Society Address
                        </ModalHeader>
                        <ModalBody>
                        President's address followed by a town hall on forward look for Information Theory and ITs Society. Light lunch served (free, but requires signup at the workshop tab)
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
                    <th scope="row">9:50 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:00 AM</th>
                    {mon1}
                  </tr>
                  <tr>
                    <th scope="row">11:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">11:20 AM</th>
                    {mon2}
                  </tr>
                  <tr>
                    <th scope="row">12:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Lunch
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session: <strong>Deep Learning for Source and Channel Coding</strong> &mdash; Alex Dimakis,
                      Rebecca Willet, Pramod Viswanath
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:50 PM</th>
                    {mon3}
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    {mon4}
                  </tr>
                  <tr>
                    <th scope="row">Evening</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                  Predict, watch, and debate the Iowa Caucuses results, the opening salvo of a crazy election year.
                  </td></tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Tuesday, February 4th, 2020</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    {tue1}
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                    {tue2}
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Lunch
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session: <strong>Reinforcement Learning</strong>{' '}
                      &mdash; Ben Recht, Elad Hazan, Sham Kakade
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:10 PM</th>
                    {tue3}
                  </tr>
                  <tr>
                    <th scope="row">4:10 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    {tue4}
                  </tr>
                  <tr>
                    <th scope="row">Evening</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    State of the Union Address, Cheer and Jeer the POTUS State of the Union Address.
                  </td></tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Wednesday, February 5th, 2020</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    {wed1}
                  </tr>
                  <tr>
                    <th scope="row">10:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <a href="schedule2020/#d_3">Graduation Day talks, part 1</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">11:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">11:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <a href="schedule2020/#d_3">Graduation Day talks, part 2</a>
                    </td>
                  </tr>
                  
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <a href="schedule2020/#d_3">
                        Graduation Day posters and catered lunch
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session:{' '}
                      <strong>Algorithmic Game Theory</strong> &mdash;
                      Vijay Vazirani, Ruta Mehta, Joel Sobel
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Group photo</td>
                  </tr>
                  <tr>
                    <th scope="row">4:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Contraventional : A broader view of Machine Learning <br></br>and<br></br> An Update from NSF
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6:15 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Banquet reception at the Aviary (ticket required) 
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">7:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Quinceañera Banquet with surpises and prizes(ticket required)
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Thursday, February 6th, 2020</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">9:00 AM</th>
                    {thu1}
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                    {thu2}
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Lunch (on your own); soccer, volleyball, and other games
                      by the beach
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session: <strong>Constrained Learning</strong>{' '}
                      &mdash; Gregory Valiant, Ran Raz, Kunal Talwar
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:10 PM</th>
                    {thu3}
                  </tr>
                  <tr>
                    <th scope="row">4:10 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    {thu4}
                  </tr>
                  <tr>
                    <th scope="row">5:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">7:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                        Bonfire by the ocean
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Friday, February 7th, 2020</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">9:00 AM</th>
                    {fri1}
                  </tr>
                  <tr>
                    <th scope="row">10:20 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>Break</td>
                  </tr>
                  <tr>
                    <th scope="row">10:40 AM</th>
                    {fri2}
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                    <a href="schedule2020/#d_5">Student Posters and Lunch</a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:40 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary Session:{' '}
                      <strong>Deep Learning</strong> &mdash;
                      Kamalika Chaudhuri, Ruslan Salakhutdinov, Daniel Roy
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">2:50 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:05 PM</th>
                    {fri4}
                  </tr>
                  <tr>
                    <th scope="row">4:25 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:35 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Closing Ceremony and Farewell Bash
                    </td>
                  </tr>
                </tbody>
                </Table>
                <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Saturday, February 8th, 2020</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">8:30 - 4:00</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                        Learn to Do: Deep- and Reinforcement-learning tutorials and expository machine-learning talks. 
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
