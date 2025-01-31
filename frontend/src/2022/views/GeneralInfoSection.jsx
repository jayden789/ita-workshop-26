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
of timely topics. Students present at poster sessions with catered lunch by the beach, and outstanding graduating students and
postdocs selected by their home institutions present at Graduation Day, with awards for the best received talks. ITA strives to
innovate, with two tracks typically held on a boat, catered breakfasts and 2-3 lunches, and multiple social and networking events. 
              </p>
              <p>
              If you are interested in participation in ITA 2022, presenting a talk, organizing a session, or organizing a social event, please write to us at {' '}
                <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>.
              </p>
              <h3>In Memoriam</h3>
              <img height='300px' src='https://i1.rgstatic.net/ii/profile.image/272487720157245-1441977543951_Q512/Alexander-Vardy.jpg'></img>
              <p style={{'paddingTop':'2em'}}>
                <b>Prof Alexander Vardy</b>, a pioneering coding theorist, prominent UCSD faculty, beloved member of the ITA community, and a dear friend to many of us,
                passed away on March 11, 2022 at the age of 58. Prof. Vardy’s fundamental contributions to coding and communication theory include the Koetter-
                Vardy decoding algorithm, the Parvaresh-Vardy Codes, and the introduction of list decoding to Polar code that is now part of the 5G standard.
                On Sunday 5/22 between 2 and 6 pm we will <a href="https://sites.google.com/eng.ucsd.edu/vardymemorialsymposium/home">gather at the Catamaran</a> with Prof. Vardy’s colleagues, collaborators, students, and friends to commemorate his life and accomplishments, 
                and several sessions related to his work will be held throughout the workshop. If you are interested in participating, please write to us at <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>.
              </p>

            </Container>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
