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
              The "Information: Theory and Applications" (ITA) workshop is a multidisciplinary meeting of academic and industrial researchers
applying theory to diverse scientific and technological disciplines. Unlike most conferences, ITA presentations are by invitation
only. Speakers are encouraged to present their best and most accessible work of the year, regardless of whether it appeared
elsewhere. Instead of plenary talks, ITA features plenary sessions, where prominent researchers present complimentary views
of timely topics. Students present at poster sessions with catered lunch, and outstanding graduating students and
postdocs selected by their home institutions present at Graduation Day, with awards for the best received talks. 
{/* The "Information: Theory and Applications" (ITA) workshop is a multidisciplinary meeting of academic and industrial researchers
applying theory to diverse scientific and technological disciplines. Unlike most conferences, ITA presentations are by invitation
only. Speakers are encouraged to present their best and most accessible work of the year, regardless of whether it appeared
elsewhere. Instead of plenary talks, ITA features plenary sessions, where prominent researchers present complimentary views
of timely topics. Students present at poster sessions with catered lunch by the beach, and outstanding graduating students and
postdocs selected by their home institutions present at Graduation Day, with awards for the best received talks. ITA strives to
innovate, with two tracks typically held on a boat, catered breakfasts and 2-3 lunches, and multiple social and networking events.  */}
              </p>
              <p>
              ITA strives to innovate, and aims to bring students, researchers, and faculty together via ice-breaking, networking, and social events. It keeps the participants sated via  catered breakfasts and 2-3 lunches, and morning, afternoon, and evening refreshments.
              </p>
              <p>
              If you are interested in participation in ITA 2023, presenting a talk, organizing a session, or organizing a social event, please write to us at {' '}
                <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>.
              </p>
              {/* <p>
                You can access the web-app               
                <a href='https://ita-workshop-app.web.app/'
              target="_blank" rel="noopener noreferrer"> here</a>

              </p> */}
              <div style={{display:'flex','justify-content': 'center'}}>
              <a href='https://play.google.com/store/apps/details?id=com.sritaw.itaw'
              target="_blank" rel="noopener noreferrer"><img src='https://ita.ucsd.edu/workshop/23/images/google-play-badge.png' height="100px" style={{aspectRatio: 1,'object-fit':'contain'}}></img></a>
              <a href='https://ita-workshop-app.web.app/'
              target="_blank" rel="noopener noreferrer"><img src='https://ita.ucsd.edu/workshop/23/images/webapp.png' height="80px" style={{aspectRatio: 1,marginTop:'6px','object-fit':'contain'}}></img></a>
              </div>
            </Container>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
