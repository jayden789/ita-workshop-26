import React from 'react';
import { Jumbotron, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

// constants from schedulepage
import { scheduleData } from './SchedulePage/schedule-23';

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
    tracks: ['tr_1','tr_2'],
  },
  d_2: {
    id: '2',
    title: 'Tuesday',
    tracks: ['tr_3','tr_4'],
  },
  d_3: {
    id: '2',
    title: 'Tuesday',
    tracks: ['tr_5', 'tr_6'],
  },
  d_4: {
    id: '4',
    title: 'Thursday',
    tracks: ['tr_7','tr_8'],
  },
  d_5: {
    id: '5',
    title: 'Friday',
    tracks: ['tr_9','tr_10'],
  },
};

export default class ScheduleSection extends React.Component {
  parseData=()=>{
    console.log('as');
    console.log(this.props.schedule);
    console.log(this.props.loadSchedule)
    return null;
  }

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
    const link = 'https://ita.ucsd.edu/schedule2023/';
    const eventStyle =  { 'backgroundColor': 'white' };
    return (
      <div>
        <this.parseData/>
        <Jumbotron
          fluid
          id="outline"
          className="mt-0 mb-0"
          style={{ 'backgroundColor': 'azure' }}
        >
          <Container>
            <div className="text-center">
              <h1 className="display-4">
                <strong>Schedule</strong>
              </h1>
              <h4>
              The schedule has been finalized. We will post the student and graduation day poster and talks by Thursday 2/9.<br></br>
               A few slots are still available, if you would like to speak, please 
                <a href="mailto:ita@ucsd.edu"> write us</a>.
              </h4>
              <a href="https://ita.ucsd.edu/workshop/23/images/ITA%20Schedule%202023.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' } }>
              <Button color="primary" size="lg" >
                Download Schedule</Button></a>



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
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Sunday, February 12th</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">6:30 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Reception, Harborside - just south of Tower 1 towards Tower 3
                    </td>
                  </tr>
                </tbody>
              </Table>


              
              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Monday, February 13th</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">8:00 AM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Breakfast, all daily breakfasts included with registraion
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">9:00 AM</th>
                      <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#0">Sessions: Bandit Algorithms ;   Information Theory 1 ;   Next Generation Wireless Communications: 6G ;   Federated Learning ;  Distributed Inference and Task-Oriented Communications  </Link>
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
                        <Link to="/schedule2023/#0" >Sessions: Approximate Message Passing, Graph Codes and Causality; Coding Theory 1; Machine Learning for Wireless Communication; Privacy: Information Retrieval and Computaion; Robust Machine Learning</Link>
                      </td>
                  </tr>
                  <tr>
                    <th scope="row">12:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      <strong>Know Thy Neighbour</strong>: Lighning Introductions, catered lunch 
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">1:30 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Plenary: <strong>Three Cheers for Information Theory</strong> , Matthieu Bloch, Andrew Barron, Lara Dolecek, Emina Soljanin
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">3:00 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                        <Link to="/schedule2023/#0" >Sessions: Reinforcement Learning 1; Channel Coding; Quantum Coding and Information Theory; Innovations in Federated Learning;	Federated Learning & Analytics  </Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:20 PM</th>
                    <td style={{ 'backgroundColor': 'white' }}>
                      Break, light refreshments
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">4:30 PM</th>
                    <td style={eventStyle}>
                      <strong>Alumni in Industry: Academia-Industry collaborations</strong>, Christina Fragouli ,
                      Tingfang Ji, Peter Kairouz, Sujay Sanghavi, Sreeram Kannan
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5:30 PM</th>
                    <td style={eventStyle}>
                      Reception, food 
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

              <Table className="text-left big">
                <thead style={{ 'backgroundColor': '#eee' }}>
                  <tr>
                    <th width="100px" />
                    <th>Tuesday, February 14th</th>
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
            



            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
