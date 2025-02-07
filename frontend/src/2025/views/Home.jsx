import React, { Suspense } from 'react';

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
import AwardSessions from './AwardSessions';

const ParticipantsSection = React.lazy(() => import('./ParticipantsSection'));

export default class Home2025 extends React.Component {
  render() {
    return (
      <div>
        <NavBar {...this.props.navbarProps} />
        <HeroSection />
        <GeneralInfoSection />
        <RegistrationSection
          registrationFees={this.props.registrationFees}
          loadFees={this.props.loadFees}
        />
        <PlenariesSection />
        {/* <AwardSessions /> */}
        {/*<InvitedSessionsSection />*/}
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
        {/*<TutorialSection />*/}
        <EataSection />
        <Suspense
          fallback={<p className="text-center m-1">Loading Participants...</p>}
        >
          <ParticipantsSection
            participantsUrl25={this.props.participantsUrl25}
          />
        </Suspense>
        <SponsorsSection />
        <CodeOfConductSection />
      </div>
    );
  }
}
