import React from 'react';
import { Jumbotron, Container, Row } from 'reactstrap';

import ProfileCard from '../../ProfileCard';
import { api } from '../../helpers';

export default class ParticipantsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      participants: [],
    };
  }

  componentDidMount() {
    if (this.props.participantsUrl22) {
      this.loadParticipants();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.participantsUrl22 !== this.props.participantsUrl22) {
      this.loadParticipants();
    }
  }

  loadParticipants = () => {
    this.setState({ loading: true });
    api(this.props.participantsUrl22).then(participants => {
      const nonEmptyParticipants = participants.filter(
        ({ full_name, affiliation_title }) =>
          full_name &&
          affiliation_title &&
          full_name.length > 0 &&
          affiliation_title.length > 0
      );
      this.setState({ participants: nonEmptyParticipants, loading: false });
    });
  };

  renderProfileCard = profile => {
    const imageProps = profile.profile_pic
      ? { image: profile.profile_pic }
      : {};
    return (
      <ProfileCard
        name={profile.full_name}
        website={profile.website}
        image={profile.profile_pic}
        affiliation={profile.affiliation_title}
        {...imageProps}
        key={profile.url}
      />
    );
  };

  renderProfileCardsSection = (title, profiles) => {
    return profiles.length ? (
      <Container>
        <div className="text-center">
          <h1 className="display-4">{title}</h1>
        </div>
        <Row className="mb-2">{profiles.map(this.renderProfileCard)}</Row>
      </Container>
    ) : null;
  };

  render = () => {
    // if (this.state.loading || this.state.participants.length === 0) {
    //   return null;
    // }

    const participantsWithPic = [];
    const participantsWithoutPic = [];
    const studentsWithPic = [];
    const studentsWithoutPic = [];

    this.state.participants.forEach(profile => {
      if (profile.is_student) {
        (profile.profile_pic ? studentsWithPic : studentsWithoutPic).push(
          profile
        );
      } else {
        (profile.profile_pic
          ? participantsWithPic
          : participantsWithoutPic
        ).push(profile);
      }
    });

    const cardsParticipantsWithPic = this.renderProfileCardsSection(
      'Participants',
      participantsWithPic
    );
    const cardsParticipantsWithoutPic = this.renderProfileCardsSection(
      'Participants without pictures',
      participantsWithoutPic
    );
    const cardsStudentsWithPic = this.renderProfileCardsSection(
      'Students',
      studentsWithPic
    );
    const cardsStudentsWithoutPic = this.renderProfileCardsSection(
      'Students without pictures',
      studentsWithoutPic
    );

    return (
      <div>
        <Jumbotron id="participants" fluid className="mt-0 mb-0 ParticipantsBackground">
          {/* <Container>
            <div className="text-center">
              <h1 className="display-4 mb-2" style={{ color: 'white' }}>
                Participants
              </h1>
            </div>
          </Container> */}
          {cardsParticipantsWithPic}
          {cardsParticipantsWithoutPic}
          {cardsStudentsWithPic}
          {cardsStudentsWithoutPic}
        </Jumbotron>
      </div>
    );
  };
}
