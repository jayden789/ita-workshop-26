import React from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import styles from './SpecialPlenarySection.module.css';
import { specialPlenarySession } from './plenaries';

const SpecialPlenarySection = () => {
  const { dayName, topic, talks } = specialPlenarySession;

  // Format speaker names - join with commas if they share the same session
  const speakerNames = talks.map((talk) => {
    const name = talk.presenter.websiteUrl ? (
      <a key={talk.presenter.name} href={talk.presenter.websiteUrl} target="_blank" rel="noopener noreferrer">
        {talk.presenter.name}
      </a>
    ) : (
      <span key={talk.presenter.name}>{talk.presenter.name}</span>
    );
    return name;
  });

  // Join names with commas
  const formattedSpeakers = speakerNames.reduce((acc, name, index) => {
    if (index === 0) return [name];
    return [...acc, ', ', name];
  }, []);

  return (
    <div className={styles.section}>
      <div className="text-center">
        <h2 className={styles.sectionTitle}>Special Sessions</h2>
      </div>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className={styles.card}>
            <CardBody className="text-center">
              <CardTitle tag="h5" className={styles.cardHeader}>
                {dayName}
              </CardTitle>
              <div className={styles.topicHeader}>{topic}</div>
              <div className={styles.speakerNames}>
                {formattedSpeakers}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SpecialPlenarySection;
