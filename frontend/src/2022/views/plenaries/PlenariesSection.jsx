import classNames from 'classnames';
import React from 'react';
import {
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Container,
  Jumbotron,
} from 'reactstrap';

import PlenarySessionCard from './PlenarySessionCard.jsx';
import PlenaryTalkCardContent from './PlenaryTalkCardContent.jsx';
import {
  PlenaryPresenterDetailModal,
  PlenaryModeratorDetailModal,
} from './PlenaryPresenterDetailModal';
import { plenarySessions } from './plenaries';
import styles from './PlenariesSection.module.css';

export default class PlenariesSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      presenterDetailModalOpen: false,
      presenterDetailModalTalk: null,
      moderatorDetailModalOpen: false,
      moderatorDetailModalModerator: null,
      moderatorDetailModalTalk: null,
    };
  }

  onTogglePresenterDetailModal = () => {
    this.setState(prevState => ({
      presenterDetailModalOpen: !prevState.presenterDetailModalOpen,
    }));
  };

  onClickPresenterNameForTalk = talk => () => {
    this.setState({
      presenterDetailModalOpen: true,
      presenterDetailModalTalk: talk,
    });
  };

  onToggleModeratorDetailModal = () => {
    this.setState(prevState => ({
      moderatorDetailModalOpen: !prevState.moderatorDetailModalOpen,
    }));
  };

  onClickModeratorNameForModerator = (moderator, moderatorTalk) => event => {
    event.preventDefault();
    this.setState({
      moderatorDetailModalOpen: true,
      moderatorDetailModalModerator: moderator,
      moderatorDetailModalTalk: moderatorTalk,
    });
  };

  render() {
    const plenarySessionCards = plenarySessions.map(session => (
      <PlenarySessionCard
        dayName={session.dayName}
        topic={session.topic}
        className={styles.plenarySessionCard}
        key={session.dayName}
      >
        <CardImg src={session.moderator.picUrl} width="100%"/>
        <CardBody>
          <CardTitle style={{fontSize:1+'rem'}}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              onClick={this.onClickModeratorNameForModerator(
                session.moderator,
                session.moderatorTalk
              )}
            >
              {session.moderator.name} (Moderator)
            </a>
          </CardTitle>
          <CardSubtitle className={styles.moderatorLabel}>
          {session.moderator.affiliation}
          </CardSubtitle>
        </CardBody>
        {session.talks.map((talk, talkIndex) => (
          <PlenaryTalkCardContent
            talk={talk}
            onClickPresenterName={this.onClickPresenterNameForTalk(talk)}
            key={talkIndex}
          />
        ))}
      </PlenarySessionCard>
    ));

    return (
      <Jumbotron
        fluid
        id="plenaries"
        className={classNames('mt-0', 'mb-0', styles.plenaryJumbo)}
      >
        <div className="text-center">
          <h1 className="display-4">Plenary Sessions</h1>
          {/* <h5 className="dailywords">
            <strong>
              COMING SOON
              This year, plenary <em>talks</em> will be replaced by plenary{' '}
              <em>sessions</em>, each devoted to an important
              emerging&nbsp;topic.
            </strong>
          </h5> */}
        </div>
        <Container fluid>
          <div className={styles.cardsContainer}>{plenarySessionCards}</div>
        </Container>
        <PlenaryPresenterDetailModal
          talk={this.state.presenterDetailModalTalk}
          isOpen={this.state.presenterDetailModalOpen}
          onToggleModal={this.onTogglePresenterDetailModal}
        />
        <PlenaryModeratorDetailModal
          moderator={this.state.moderatorDetailModalModerator}
          moderatorTalk={this.state.moderatorDetailModalTalk}
          isOpen={this.state.moderatorDetailModalOpen}
          onToggleModal={this.onToggleModeratorDetailModal}
        />
      </Jumbotron>
    );
  }
}
