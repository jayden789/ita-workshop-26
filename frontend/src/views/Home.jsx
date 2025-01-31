import React, { Suspense } from 'react';
import TrackVisibility from 'react-on-screen';

import ITARegisterButton from './ITARegisterButton';
import ITAJumboMain from './ITAJumboMain';
import ITAJumboLocation from './ITAJumboLocation';
import ITAJumboRegistration from './ITAJumboRegistration';
import PlenariesSection from './plenaries/PlenariesSection';
import ITAJumboEATA from './ITAJumboEATA';
import ITAJumboSpecialEvents from './ITAJumboSpecialEvents';
import ITADailyScheduleComingSoon from './ITADailyScheduleComingSoon';
import CodeOfConductSection from './CodeOfConductSection';
import ITAScheduleOutline from './ITAScheduleOutline';
const ITAJumboProfiles = React.lazy(() => import('./ITAJumboProfiles'));

export default class Home extends React.Component {
  render() {
    return (
      <div>
        {this.props.navbar}
        <ITAJumboMain />
        <PlenariesSection />
        <ITARegisterButton id="fixedbutton" />
        {/* <ITAJumboRegistration
          registrationFees={this.props.registrationFees}
          loadFees={this.props.loadFees}
        /> */}
        <ITAScheduleOutline />
        <ITADailyScheduleComingSoon />
        <ITAJumboLocation />
        <ITAJumboEATA />
        <ITAJumboSpecialEvents />
        <div id="participants" />
        <TrackVisibility once>
          {({ isVisible }) =>
            isVisible && (
              <Suspense fallback={<p className="text-center m-1">Loading Participants...</p>}>
                <ITAJumboProfiles
                  participantsUrl19={this.props.participantsUrl19}
                />
              </Suspense>
            )
          }
        </TrackVisibility>
        <CodeOfConductSection />
      </div>
    );
  }
}
