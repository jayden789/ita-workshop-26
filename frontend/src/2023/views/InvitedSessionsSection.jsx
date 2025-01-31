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
  CardDeck
} from 'reactstrap';
import { faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './InvitedSessionsSection.module.css';

export default class InvitedSessionsSection extends React.Component {
  render() {
    const invitedSessions = [
                            //  { 	"title":"Fairness and robustness in machine learning", 	"day":"Thursday anytime except 2-4pm", 	"chair":"Ahmad Beirami", 	"speakers": ["Ludwig Schmidt","Hamed Hasani","Yao Qin","Pariskhit Gopalan"] },
                            //  { 	"title":"Differential privacy", 	"day":"Thursday", 	"chair":"Ananda Theertha Suresh", 	"speakers": ["Vitaly Feldman","Badih Ghazi","Borja Balle","Janardhan Kulkarni"] },
                            //  { 	"title":"Differential privacy", 	"day":"Friday Morning/ Early Afternoon", 	"chair":"TBD", 	"speakers": ["Meisam Razaviyayn","Audra Mcmillan","Ananda Theertha Suresh","Abhradeep Thakurtha"] },
                            //  { 	"title":"Fairness and Robustness in Machine Learning", 	"day":"Thursday afternoon / Friday morning", 	"chair":"TBD", 	"speakers": ["Flavio Calmon","Vatsal Sharan","Ahmad Beirami","Jaroslaw Blasiok"] },
                             
                             {"title" : "Distributed Inference and Task-Oriented Communications", "chair":" Yuval Cassuto", "day":"Monday","speakers": ["Ivan Bajic","Yuval Cassuto","Yongjune Kim"]},
                             {"title" : "Federated Learning & Analytics", "chair":" Peter Kairouz", "day":"Monday","speakers": ["Salman Avestimehr","Kamalika Chaudhuri","Suhas Diggavi","Ayfer Ozgur"]},
                             {"title" : "Blockchains", "chair":" Sriram Vishwanath", "day":"Tuesday","speakers": ["Sriram Vishwanath","Tsung-Ting Kuo"]},
                             {"title" : "Robust Learning", "chair":" Lalitha Sankar", "day":"Thursday","speakers": ["Sanmi Koyejo","Pouria Saidi","Lalitha Sankar","Ramya Korlakai Vinayak"]},
                             {"title" : "Learning and Control-I", "chair":"  Jorge Poveda", "day":"Thursday","speakers": ["James	Anderson","Takashi	Tanaka","Kaiqing	Zhang","Mihailo Jovanovic"]},
                             {"title" : "Learning and Control-II", "chair":" Yang Zheng", "day":"Thursday","speakers": ["Jason Marden","Bahman Gharesifard","Dileep Kalathil"]},
                             {"title" : "Statistical Learning Theory for Control-II", "chair":" Nikolai Matni", "day":"Thursday","speakers": ["Samet Oymak","Stephen Tu","Yingying Li","Nikolai Matni"]},
                             {"title" : "Tools from AoI, Network Science and SIT to address online misinformation", "chair":" Melih Bastopcu", "day":"Thursday","speakers": ["Ahmed Arafa","Melih Bastopcu","Yin Sun"]},
                             {"title" : "Fairness and robustness in machine learning-I", "chair":" Ahmad Beirami", "day":"Thursday","speakers": ["Hamed Hasani","Pariskhit Gopalan","Yao Qin ","Ludwig Schmidt"]},
                             {"title" : "Differential privacy-I", "chair":" Ananda Theertha Suresh", "day":"Thursday","speakers": ["Vitaly Feldman","Badih Ghazi","Janardhan Kulkarni","Vahab Mirrokni"]},
                             ,{"title": "EnCORE Session on Distributed Learning & Decision Making I", "chair": "Arya Mazumdar", "day": "Thursday", "speakers" : ["Tianyi Chen","Mahdi Soltanolkotabi","César A Uribe"]}
                            ,{"title": "EnCORE Session on Distributed Learning & Decision Making II", "chair": "Aritra Mitra","day": "Thursday", "speakers" : ["Mahnoosh Alizadeh","Tamer Basar","Mohammad Ghavamzadeh"]}
                            ,{"title": "EnCORE Session on Distributed Learning & Decision Making III", "chair": "Abolfazl Hashemi", "day": "Friday", "speakers": ["Babak Hassibi","R. Srikant","Aryan Mokhtari","Ramtin Pedarsani"]}
                            ,{"title": "EnCORE Session on Distributed Learning & Decision-Making IV", "chair": "Aritra Mitra", "day" : "Friday", "speakers":["Thinh Doan","Aritra Mitra","Abolfazl Hashemi","Girish Nair"]},
                             {"title" : "Differential privacy-II", "chair":"Hilal Asi", "day":"Friday","speakers": ["Audra Mcmillan","Meisam Razaviyayn","Abhradeep Thakurtha","Ananda Theertha Suresh"]},
                             {"title" : "Fairness and robustness in machine learning-II", "chair":" Meisam Razaviyayn", "day":"Friday","speakers": ["Ahmad Beirami","Jaroslaw Blasiok","Flavio Calmon","Vatsal Sharan"]},
                             {"title" : "Privacy and Security in Machine Learning", "chair":" Kamalika Chaudhuri", "day":"Friday","speakers": ["Chuan Guo","Adel Javanmard","Oliver Koust","Ravi Tandon"]},
                             {"title" : "Information-Theoretic Tools for Trustworthy ML", "chair":" Flavio Calmon", "day":"Friday","speakers": ["Viveck Cadambe","Mario Diaz","Berk Ustun","Hilal Asi"]}
                                                         ]
    return (
      <div>
        <Jumbotron id="invited" style={{ marginBottom: '0px' }} className={styles.titleJumbo} fluid>
          <div className="text-center scroll">
            <h1 className="display-4" style={{ color: "white" }}>Invited Sessions</h1>
            <p style={{ color: "white" }}>Scroll or Swipe to view all</p>
            <div className={styles.scroll}>
            <Row style={{flexWrap: "inherit"}}>
              {invitedSessions.map((session) => {
                return <Col><Card className={styles.card}>
                <CardBody className={styles.cardBody}>
                  <CardTitle className={styles.cardHeader}>
                    {session.title}
                  <CardSubtitle className={styles.cardSub} >{session.chair}</CardSubtitle>
                  </CardTitle>
                  <CardText className={styles.cardText}>
                  {session.speakers.map((speaker) => {
                      return <p>{speaker}</p>
                  })}
                  </CardText>
                </CardBody>
                <CardFooter className="mt-auto" style={{ fontSize: '12px' }}>{session.day}</CardFooter>
              </Card></Col>
              })}
              </Row>
              </div>
              <FontAwesomeIcon icon={faArrowsAltH} color="white" size="2x" />
          </div>
        </Jumbotron>
      </div >
    );
  }
}
