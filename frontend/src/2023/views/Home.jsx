import React, { Suspense } from 'react';
import TrackVisibility from 'react-on-screen';

import NavBar from './NavBar';
import HeroSection from './HeroSection';
import GeneralInfoSection from './GeneralInfoSection';
import LocationSection from './LocationSection';
import CodeOfConductSection from './CodeOfConductSection';
import RegistrationSection from './RegistrationSection';
import PlenariesSection from './plenaries/PlenariesSection';
import ScheduleSection from './ScheduleSection';
import DailyScheduleSection from './DailyScheduleSection';
import EataSection from './EataSection';
import SpecialEventsSection from './SpecialEventsSection';
import InvitedSessionsSection from './InvitedSessionsSection';
import TutorialSection from './TutorialSection';
import SponsorsSection from './SponsorsSection';
import { Container } from 'react-floating-action-button';

import { faRegistered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TurkeyEarhquakeSection from './TurkeyEarthquakeSection';

const ParticipantsSection = React.lazy(() => import('./ParticipantsSection'));

export default class Home2023 extends React.Component {
  render() {
    return (
      <div>
        <NavBar {...this.props.navbarProps} />
        <HeroSection />
        <GeneralInfoSection />
        {/* <TurkeyEarhquakeSection /> */}
        {/* <RegistrationSection
          registrationFees={this.props.registrationFees}
          loadFees={this.props.loadFees}
        /> */}
        <PlenariesSection />
        <InvitedSessionsSection />
        <ScheduleSection
          schedule={this.props.schedule}
          loadSchedule={this.props.loadSchedule}
        />
        <DailyScheduleSection
          schedule={this.props.schedule}
          loadSchedule={this.props.loadSchedule}
        />
        <LocationSection />
        <SpecialEventsSection />
        <TutorialSection />
        <EataSection />
        <TrackVisibility once>
          {({ isVisible }) =>
            isVisible && (
              <Suspense
                fallback={
                  <p className="text-center m-1">Loading Participants...</p>
                }
              >
                <ParticipantsSection
                  participantsUrl23={this.props.participantsUrl23}
                />
              </Suspense>
            )
          }
        </TrackVisibility>
        <SponsorsSection />
        <CodeOfConductSection />
        {/* <Container>
          <FontAwesomeIcon icon={faRegistered} size="4x"
            onClick={() => window.location = 'register'}
            style={{ cursor: 'pointer' }}
            color="navy"
            alt="Click to Register!" />
        </Container> */}
      </div>
    );
  }
}
