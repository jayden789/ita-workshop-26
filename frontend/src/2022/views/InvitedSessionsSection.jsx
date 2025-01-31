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
    const invitedSessions = [{ 	"title":"Timely Transmissions", 	"day":"Monday", 	"chair":"Richard Wesel", 	"speakers": ["Ahmed Arafa","Mai Vu","Ori Shantal",""] }, { 	"title":"Deep Generative Models", 	"day":"Monday", 	"chair":"Soheil Feizi", 	"speakers": ["Alex Dimakis","Sewoong Oh","Paul Hand",""] }, { 	"title":"Robotics and Control I", 	"day":"Monday", 	"chair":"Nikolay Atanasov", 	"speakers": ["Houssam Abbas","Ali Agha","Nikolay Atanasov",""] }, { 	"title":"Information Theory to Practical Learning", 	"day":"Monday", 	"chair":"Gil Shamir", 	"speakers": ["Alex Alemi","Gil Shamir","Rohan Anil","Julian Grady"] }, { 	"title":"Robotics and Control II", 	"day":"Monday", 	"chair":"Yasser Shoukry", 	"speakers": ["Hamid Jafarkhani","Yasser Shoukry","Ankur Mehta",""] }, { 	"title":"Tensor Methods", 	"day":"Monday", 	"chair":"Anna Ma", 	"speakers": ["Jamie Haddock","Vagelis Papalexakis","Longxiu Huang","Alona Kryshchenko"] }, { 	"title":"Control and Game Theory", 	"day":"Tuesday", 	"chair":"Behrouz Touri", 	"speakers": ["Jorge Poveda","Xudong Chen","Jason Marden","Ben Recht"] }, { 	"title":"Physics and Machine Learning", 	"day":"Tuesday", 	"chair":"Lenka Zdeborova", 	"speakers": ["Surya Ganguli","Lenka Zdeborova","Giulio Biroli","Marylou Gabrie,"] }, { 	"title":"People, AI, and Fairness", 	"day":"Tuesday", 	"chair":"Nihar Shah", 	"speakers": ["Ashia Wilson","Lillian Ratliff","Nihar Shah",""] }, { 	"title":"DNA Storage", 	"day":"Tuesday", 	"chair":"Ryan Gabrys", 	"speakers": ["Farzad Farnoud","Mahdi Cheraghchi","Ilan Shomorony","Zhiying Wang"] }, { 	"title":"Robotics and Control III", 	"day":"Tuesday", 	"chair":"Konstantinos Karydis", 	"speakers": ["Vikas Dhiman","Konstantinos Karydis","",""] }, { 	"title":"Optimal Transport", 	"day":"Wednesday", 	"chair":"Ayfer Ozgur", 	"speakers": ["Ziv Goldfeld","Xianfeng Gu","Xiugang Wu",""] }, { 	"title":"Theory of Deep Learning", 	"day":"Thursday", 	"chair":"Marco Mondelli", 	"speakers": ["Marco Mondelli","Matus Telgarsky","Quanquan Gu","Nathan Srebro"] }, { 	"title":"Differentially Private Statistics", 	"day":"Thursday", 	"chair":"Gautam Kamath", 	"speakers": ["Rachel Cummings","Gautam Kamath","Clement Canonne","Ameya Velingker"] }, { 	"title":"Low-Rank Approximation", 	"day":"Thursday", 	"chair":"David Woodruff", 	"speakers": ["David Woodruff","Cameron Musco","Samson Zhou","Aditya Bhaskara"] }, { 	"title":"High Dimensional Statistics", 	"day":"Thursday", 	"chair":"Gautam Dasarathy", 	"speakers": ["Pradeep Ravikumar","Anshumali Shrivastava","Gautam Dasarathy","Giulia Pedrielli"] }, { 	"title":"Graph Signal Processing I", 	"day":"Thursday", 	"chair":"Santiago Segarra", 	"speakers": ["Basak Guler","Antonio Marques","Solmaz Kia",""] }, { 	"title":"Graph Signal Processing II", 	"day":"Thursday", 	"chair":"Florian Meyer", 	"speakers": ["Yanning Shen","Santiago Segarra","Farshad Lahouti","Geert Leus"] }, { 	"title":"Federated Learning: Compression & Privacy", 	"day":"Thursday", 	"chair":"Peter Kairouz", 	"speakers": ["Badih Ghazi","Abhradeep Thakurta","Ayfer Ozgur",""] }, { 	"title":"Distributed Learning,Estimation,and Testing", 	"day":"Thursday", 	"chair":"Hamed Hassani", 	"speakers": ["Jayadev Acharya","Gauri Joshi","Hamed Hassani","Salman Avestimehr"] }, { 	"title":"Coded computing and learning", 	"day":"Thursday", 	"chair":"Salman Avestimehr", 	"speakers": ["Rashmi Vinayak","Viveck Cadambe","Saeid Sahraei",""] }, { 	"title":"Privacy-preserving ML", 	"day":"Thursday", 	"chair":"Vitaly Feldman", 	"speakers": ["Adam Smith","Audra McMillan","Vitaly Feldman","Shahab Asoodeh"] }, { 	"title":"Bioinformatics", 	"day":"Thursday", 	"chair":"Siavash Mirarab", 	"speakers": ["Adam MacLean","Siavash Mirarab","Sriram Sankararaman","Yana Safonova"] }, { 	"title":"Topics in machine learning theory", 	"day":"Friday", 	"chair":"Siva Theja", 	"speakers": ["Guannan Qu","Abhishek Gupta","Christina Lee Yu","R. Srikant"] }, { 	"title":"Federated Learning: Theory and Practice", 	"day":"Friday", 	"chair":"Ananda Suresh", 	"speakers": ["Mehryar Mohri","Peter Kairouz","Ananda Theertha Suresh",""] }, { 	"title":"Optimization algorithms for federated learning", 	"day":"Friday", 	"chair":"Arya Mazumdar", 	"speakers": ["Arya Mazumdar","Himanshu Tyagi","Satyen Kale","Aryan Mokhtari"] }, { 	"title":"Block chains:", 	"day":"Friday", 	"chair":"Sreeram Kannan", 	"speakers": ["Swanand Kadhe","David Tse","Aniket Kate","Dahlia Malhki"] }, { 	"title":"Privacy and Fairness in ML", 	"day":"Friday", 	"chair":"Flavio Calmon", 	"speakers": ["Swati Gupta","Nadia Fawaz","Flavio Calmon","Steven Wu"] }, { 	"title":"Robust Learning", 	"day":"Friday", 	"chair":"Lalitha Sankar", 	"speakers": ["Jiantao Jiao","Ludwig Schmidt","Lalitha Sankar","Cyrus Rashtchian"] }, { 	"title":"Statistics and Mathematics", 	"day":"Friday", 	"chair":"Peter Grunwald", 	"speakers": ["Peter Grunwald","Aaditya Ramdas","Urbashi Mitra","Amit Sahai"] }, { 	"title":"Optimization and Deep Learning", 	"day":"Friday", 	"chair":"Meisam Razaviyayn", 	"speakers": ["Ioannis Mitliagkas","Chi Jin","Mahdi Soltanolkotabi","Meisam Razaviyayn"] }, { 	"title":"Coding for Networks", 	"day":"Friday", 	"chair":"Hessam Mahdavifar", 	"speakers": ["Jung Hyun Bae","Krishna Narayanan","Lele Wang","Soheil Mohajer"] }]
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
