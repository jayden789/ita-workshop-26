import React from 'react';
import { Container, Jumbotron, Row } from 'reactstrap';
import styles from './SponsorsSection.module.css';

export default class SponsorsSection extends React.Component {
  render() {
    return (
      <Jumbotron fluid style={{ backgroundColor: 'white', marginBottom: '0px', height: '25%', alignItems: 'center' }}>
        <div className="text-center">
          <Container>
          <h1 className="display-8 mb-2">Sponsors</h1>
          <img src={require('./img2020/google.png')} className={styles.img} alt="Google"/>
          <img src={require('./img2020/qualcomm.jpg')} className={styles.img} alt="Qualcomm"/>
          <img src={require('./img2020/qualcomminstitute.jpg')} className={styles.img} alt="Qualcomm Institute"/>
          <img src={require('./img2020/hdsi.jpg')} className={styles.img} alt="UCSD HDSI"/>
          </Container>
        </div>
      </Jumbotron>
    );
  }
}
