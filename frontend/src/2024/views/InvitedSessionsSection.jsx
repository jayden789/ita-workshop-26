import React from 'react';
import {
  Jumbotron,
  Card,
  CardBody,
  CardFooter,
  CardSubtitle,
  CardText,
  CardTitle,
  Row,
  Col,
  CardDeck,
  Alert,
} from 'reactstrap';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './InvitedSessionsSection.module.css';

export default class InvitedSessionsSection extends React.Component {
  render() {
    const invitedSessions = [
      //  { 	"title":"Fairness and robustness in machine learning", 	"day":"Thursday anytime except 2-4pm", 	"chair":"Ahmad Beirami", 	"speakers": ["Ludwig Schmidt","Hamed Hasani","Yao Qin","Pariskhit Gopalan"] },
      //  { 	"title":"Differential privacy", 	"day":"Thursday", 	"chair":"Ananda Theertha Suresh", 	"speakers": ["Vitaly Feldman","Badih Ghazi","Borja Balle","Janardhan Kulkarni"] },
      //  { 	"title":"Differential privacy", 	"day":"Friday Morning/ Early Afternoon", 	"chair":"TBD", 	"speakers": ["Meisam Razaviyayn","Audra Mcmillan","Ananda Theertha Suresh","Abhradeep Thakurtha"] },
      //  { 	"title":"Fairness and Robustness in Machine Learning", 	"day":"Thursday afternoon / Friday morning", 	"chair":"TBD", 	"speakers": ["Flavio Calmon","Vatsal Sharan","Ahmad Beirami","Jaroslaw Blasiok"] },

      {
        title: 'Lloyd Welch: In Memoriam',
        chair: 'Al Hales',
        day: 'Monday',
        speakers: ['Vijay Kumar', 'Stephen Wicker', 'Al Hales'],
      },
      {
        title: 'Machine Learning and Logic',
        chair: 'Wojtek Szpankowski',
        day: 'Monday',
        speakers: [
          'Alexander Gray',
          'Luis Lastras',
          'Abram Magner',
          'Changlong Wu',
        ],
      },
      {
        title: 'Graph Signal Processing',
        chair: 'Antonio Marques',
        day: 'Monday',
        speakers: ['Yanning Shen', 'Geert Leus', 'Antonio Marques', 'Florian Meyer'],
      },
      {
        title: 'Array Sensing',
        chair: 'Christoph Mecklenbrauker',
        day: 'Monday',
        speakers: ['Peter Gerstoft', 'Martin Hardt', 'Ralf Muller', 'Piya Pal'],
      },
      {
        title: 'Machine Learning Approaches to Information Theory',
        chair: 'Haim Permuter',
        day: 'Monday',
        speakers: ['Shirin Bidokhti', 'Hesam Mahdavifar', 'Krishna Narayanan', 'Haim Permuter'],
      },
      {
        title: 'Coding and Security',
        chair: 'Muriel Medard',
        day: 'Monday',
        speakers: ['Muriel Medard', 'Rafael Oliveira'],
      },
      {
        title: 'ML Based Compression',
        chair: 'Krishna Narayanan',
        day: 'Monday',
        speakers: ['Ashish Khisti', 'Jun Chen'],
      },
      {
        title: 'Statistical learning for analysis and design of control systems',
        chair: 'Stephen Tu',
        day: 'Monday',
        speakers: ['Ingvar Ziemann', 'Sylvia Herbert', 'Sicun Gao', 'Lin Yang'],
      },
      {
        title: 'Adaptive and stochastic optimization',
        chair: 'Mladen Kolar',
        day: 'Monday',
        speakers: ['Mladen Kolar', 'Michael Mahoney', 'Krishnakumar Balasubramanian', 'Chaoyue Liu'],
      },
      {
        title: 'Individualized Decision-Making',
        chair: 'Ben Recht',
        day: 'Monday',
        speakers: ['Kyra Gan', 'Yongyi Guo', 'Benjamin Recht', 'Berk Ustun'],
      },
      {
        title: 'Reed-Muller and Polar Codes',
        chair: 'Henry Pfister',
        day: 'Monday',
        speakers: ['Navin Kashyap', 'Namyoon Lee', 'Hsin-Po Wang', 'Henry Pfister'],
      },
      {
        title: 'Distributed and federated learning',
        chair: 'Hamid Jafarkhani',
        day: 'Monday',
        speakers: ['Nicolo Michelusi', 'Erdem Koyuncu', 'Hamid Jafarkhani'],
      },
      {
        title: 'Optimization, Sampling, and Games from Classical Mechanics',
        chair: 'Jun-Kun Wang',
        day: 'Monday',
        speakers: ['Andre Wibisono','Jun-Kun Wang', ' Qijia Jiang', 'Ashia Wilson'],
      },
      {
        title: 'Private Optimization with Correlated Noise',
        chair: 'Christopher Choquette',
        day: 'Monday',
        speakers: ['Abhradeep Thakurta','Krishnamurthy Dvijotham', 'Arun Ganesh', 'Zheng Xu'],
      },
      {
        title: 'Large language models',
        chair: 'Ziteng Sun',
        day: 'Monday',
        speakers: ['Ahmad Beirami','Yu-Xiang Wang', 'Samet Oymak', 'Ziteng Sun'],
      },
      {
        title: 'Quantum LDPC Codes for Fault-Tolerant Computation',
        chair: 'Nithin Raveendran',
        day: 'Monday',
        speakers: ['Nithin Raveendran','Hanwen Yao', 'Siyi Yang', 'Narayanan Rengaswamy'],
      },
      {
        title: 'Learning/Optimization/Control in Smart Grids',
        chair: 'Yuanyuan Shi',
        day: 'Monday',
        speakers: ['Yuanyuan Shi','Deepjyoti Deka'],
      },
      {
        title: 'Topics and advances in sequential decision making',
        chair: 'Yian Ma',
        day: 'Tuesday',
        speakers: ['Aldo Pacchiano', 'Stephen Tu' , 'Quanquan Gu', 'Nikki Kuang'],
      },
      {
        title: 'People-Centric ITA',
        chair: 'Nihar Shah',
        day: 'Monday',
        speakers: ['Jingyan Wang', 'Irene Lo' , 'Madeleine Udell', 'Praveen Venkatesh'],
      },
    ];
    // Sort the sessions by the first letter of the title
    invitedSessions.sort((a, b) => a.title.localeCompare(b.title));

    // Sort the speakers within each session by the first letter of their name
    invitedSessions.forEach(session => {
      let chairSpeaker = session.speakers.filter(speaker => speaker === session.chair);
      let otherSpeakers = session.speakers.filter(speaker => speaker !== session.chair);
    
      otherSpeakers.sort((a, b) => {
        let lastNameA = a.split(" ").pop(); 
        let lastNameB = b.split(" ").pop(); 
        return lastNameA.localeCompare(lastNameB); 
      });
    
      if (chairSpeaker.length > 0) {
        otherSpeakers.push(chairSpeaker[0]);
      }
    
      session.speakers = otherSpeakers;
    });

    
    return (
      <div>
        <Jumbotron
          id="invited"
          style={{ marginBottom: '0px' }}
          className={styles.titleJumbo}
          fluid
        >
          <div className="text-center scroll">
            <h1 className="display-4" style={{ color: 'white' }}>
              Invited Sessions
            </h1>
            <p style={{ color: 'white' }}>Scroll or Swipe to view all</p>
            <div className={styles.scroll}>
              <Row style={{ flexWrap: 'inherit' }}>
                {invitedSessions.map((session) => {
                  return (
                    <Col>
                      <Card className={styles.card}>
                        <CardBody className={styles.cardBody}>
                          <CardTitle className={styles.cardHeader}>
                            {session.title}
                            <CardSubtitle className={styles.cardSub}>
                              {session.chair}
                            </CardSubtitle>
                          </CardTitle>
                          <CardText className={styles.cardText}>
                            {session.speakers.map((speaker) => {
                              return <p>{speaker}</p>;
                            })}
                          </CardText>
                        </CardBody>
                        {/* <CardFooter
                          className="mt-auto"
                          style={{ fontSize: '12px' }}
                        >
                          {session.day}
                        </CardFooter> */}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <FontAwesomeIcon icon={faArrowsAltH} color="white" size="2x" />
          </div>
        </Jumbotron>
        <Alert color="info" className="text-center">
          If you would like to propose an invited session, please send a title,
          short rationale, and 3-4 speakers, potentially including yourself, to{' '}
          <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>.
        </Alert>
      </div>
    );
  }
}
