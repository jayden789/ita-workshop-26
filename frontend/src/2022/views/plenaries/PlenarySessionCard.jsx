import React from 'react';
import { Card, CardHeader } from 'reactstrap';

import styles from './PlenariesSection.module.css';

export default class PlenarySessionCard extends React.Component {
  render() {
    const { dayName, topic, children } = this.props;

    return (
      <Card className={styles.plenarySessionCard}>
        <CardHeader className={styles.plenarySessionCardHeader, 'text-center'} style={{ height: '140px'}} >
          <h5>{dayName}</h5>
          <h4>{topic}</h4>
        </CardHeader>
        {children}
      </Card>
    );
  }
}
