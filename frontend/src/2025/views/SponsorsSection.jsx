import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import styles from './SponsorsSection.module.css';

export default class SponsorsSection extends React.Component {
  render() {
    return (
      <Jumbotron
        fluid
        style={{
          backgroundColor: 'white',
          marginBottom: '0px',
          height: '25%',
          alignItems: 'center',
        }}
      >
        <div className="text-center">
          <Container
            fluid
            style={{
              marginLeft: '0px',
              marginRight: '0px',
              paddingLeft: '0px',
              paddingRight: '0px',
            }}
          >
            <h1 className="display-8 mb-2">Sponsors</h1>
            <img
              src={require('./img2020/qualcomm.jpg')}
              className={styles.qualcommimg}
              alt="Qualcomm"
            />
            <img
              src={require('./img2020/qualcomminstitute.jpg')}
              className={styles.img}
              alt="Qualcomm Institute"
            />
            <img
              src={require('./img2023/samsunglogo.jpeg')}
              className={styles.img}
              alt="Samsung"
            />
            <img
              src={require('./img2020/hdsi.jpg')}
              className={styles.img}
              alt="UCSD HDSI"
            />
            <img
              src={
                'https://ita.ucsd.edu/workshop/23/images/SpecialEvents_IEEE_ITS_2_23.jpg'
              }
              className={styles.img}
              alt="UCSD HDSI"
            />
          </Container>
        </div>
      </Jumbotron>
    );
  }
}
