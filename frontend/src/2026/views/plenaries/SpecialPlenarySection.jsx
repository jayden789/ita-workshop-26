import React from 'react';
import { Row, Col, Card, CardBody, CardImg, CardTitle, CardSubtitle } from 'reactstrap';
import styles from './SpecialPlenarySection.module.css';
import { specialPlenarySession } from './plenaries';
import { PlenaryPresenterDetailModal } from './PlenaryPresenterDetailModal';

export default class SpecialPlenarySection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      selectedTalk: null,
    };
  }

  handleCardClick = (talk) => {
    this.setState({
      selectedTalk: talk,
      modalOpen: true,
    });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  handleNameClick = (e, presenter) => {
    e.stopPropagation();
    if (presenter.websiteUrl) {
      window.open(presenter.websiteUrl, '_blank');
    }
  };

  render() {
    const { dayName, topic, talks, description, moderator } = specialPlenarySession;
    const { modalOpen, selectedTalk } = this.state;

    return (
      <div className={styles.section}>
        <div className="text-center">
          <h2 className={styles.sectionTitle}>Special Session</h2>
        </div>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={12} lg={10}>
            <Card className={styles.card}>
              <CardBody className="text-center">
                <div className={styles.topicHeader}>{topic}</div>
                <CardTitle tag="h5" className={styles.cardHeader}>
                  {dayName}
                </CardTitle>
                <div className={styles.description}>{description}</div>

                <div className={styles.speakerAndModeratorContainer}>
                  {/* Speakers on the left */}
                  <div className={styles.speakersGroup}>
                    {talks.map((talk, index) => (
                      <Card
                        key={index}
                        className={styles.speakerCard}
                        onClick={() => this.handleCardClick(talk)}
                      >
                        {talk.presenter.picUrl && (
                          <CardImg
                            top
                            src={talk.presenter.picUrl}
                            alt={talk.presenter.name}
                            className={styles.speakerImage}
                          />
                        )}
                        {!talk.presenter.picUrl && (
                          <div className={styles.speakerImagePlaceholder}>
                            <span>{talk.presenter.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                        )}
                        <CardBody className="text-center">
                          <CardTitle className={styles.speakerName}>
                            {talk.presenter.websiteUrl ? (
                              <a
                                href={talk.presenter.websiteUrl}
                                onClick={(e) => this.handleNameClick(e, talk.presenter)}
                              >
                                {talk.presenter.name}
                              </a>
                            ) : (
                              <span>{talk.presenter.name}</span>
                            )}
                          </CardTitle>
                          <CardSubtitle className={styles.speakerAffiliation}>
                            {talk.presenter.affiliation || '\u00A0'}
                          </CardSubtitle>
                        </CardBody>
                      </Card>
                    ))}
                  </div>

                  {/* Moderator on the right */}
                  {moderator && (
                    <div className={styles.moderatorGroup}>
                      <Card className={styles.moderatorCard}>
                        {moderator.picUrl && (
                          <CardImg
                            top
                            src={moderator.picUrl}
                            alt={moderator.name}
                            className={styles.speakerImage}
                          />
                        )}
                        {!moderator.picUrl && (
                          <div className={styles.speakerImagePlaceholder}>
                            <span>{moderator.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                        )}
                        <CardBody className="text-center">
                          <CardTitle className={styles.speakerName}>
                            {moderator.websiteUrl ? (
                              <a
                                href={moderator.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {moderator.name}
                              </a>
                            ) : (
                              <span>{moderator.name}</span>
                            )}
                          </CardTitle>
                          <CardSubtitle className={styles.speakerAffiliation}>
                            {moderator.affiliation || '\u00A0'}
                          </CardSubtitle>
                        </CardBody>
                      </Card>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <PlenaryPresenterDetailModal
          talk={selectedTalk}
          isOpen={modalOpen}
          onToggleModal={this.toggleModal}
        />
      </div>
    );
  }
}
