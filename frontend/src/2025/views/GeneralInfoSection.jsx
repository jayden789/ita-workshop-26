import React from 'react';
import { Container, Jumbotron } from 'reactstrap';

export default class GeneralInfoSection extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron fluid style={{ backgroundColor: 'white' }}>
          <div className="text-center">
            <h1 className="display-4 mb-4"> A bit ab't ITA</h1>
            <Container>
              <p>
                The "Information: Theory and Applications" (ITA) workshop is a
                multidisciplinary meeting of academic and industrial researchers
                applying theory to diverse scientific and technological
                disciplines. Unlike most workshops and conferences, ITA
                presentations are by invitation only. Speakers are encouraged to
                present their most significant and accessible work of the year,
                regardless of whether it appeared elsewhere. Instead of plenary
                talks, ITA features plenary sessions, where prominent
                researchers present complementary views of timely topics.
                Students present at poster sessions with catered lunches, and
                outstanding graduating students and postdocs selected by their
                home institutions present at Graduation Day, with several
                jury-awarded “Sun, Sea, and Sand” Prizes for the most
                outstanding presentations.
              </p>
              <p>
                Beyond research promotion and dissemination, ITA strives to
                foster a cohesive and supportive research community that brings
                together students, postdocs, faculty, industrial researchers,
                and potential employers. It does so via multiple ice-breaking,
                networking, and social activities that initiate and stimulate
                discussions, interactions, and ongoing collaborations.
              </p>

              <p>
                Yet truth be told, a small few of ITA's participants join us for
                the ubiquitous EATA feasts, including breakfasts, lunches,
                refreshment breaks, and receptions, for the captivating sessions
                on the beach and sea, and above all, San Diego's summer in the
                winter weather.
              </p>

              <p>
                We cordially invite you to join ITA 2025. If you would like to
                present a talk or organize a technical session or social event,
                please write to us at{' '}
                <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>. A bientot!
              </p>
              {/* <p>
                You can access the web-app               
                <a href='https://ita-workshop-app.web.app/'
              target="_blank" rel="noopener noreferrer"> here</a>

              </p> */}
              {/* <div style={{ display: 'flex', 'justify-content': 'center' }}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.sritaw.itaw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://ita.ucsd.edu/workshop/23/images/google-play-badge.png"
                    height="100px"
                    style={{ aspectRatio: 1, 'object-fit': 'contain' }}
                  ></img>
                </a>
                <a
                  href="https://ita-workshop-app.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://ita.ucsd.edu/workshop/23/images/webapp.png"
                    height="80px"
                    style={{
                      aspectRatio: 1,
                      marginTop: '6px',
                      'object-fit': 'contain',
                    }}
                  ></img>
                </a>
              </div> */}
            </Container>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
