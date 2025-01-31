import React from 'react';
import { Card, CardImg, Container, Jumbotron } from 'reactstrap';

import styles from './WorldRecord.module.css';

export default class WorldRecord extends React.Component {
  render() {
    return (
      <div>
        {this.props.navbar}
        <Container className="mt-4">
          <Jumbotron>
            <h1 className="display-5 text-center">
              Scientific Workshop Breaks World Record
            </h1>
            <Card className={styles.certificateCard}>
              <CardImg
                width="100%"
                src="https://ita.ucsd.edu/workshop/certificate.png"
              />
            </Card>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}
