import React from 'react';
import { Container, Jumbotron } from 'reactstrap';

export default class GeneralInfoSection extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron fluid style={{ backgroundColor: 'white' }}>
          <div className="text-center">
            <h1 className="display-4 mb-4">Presenting at ITA</h1>
            <Container>
              <p>
                ITA presentations are by invitation only. If you have not been to ITA, or you are listed as not-presenting and would like to give a talk, please email us a short description of your proposed
                  presentation. If you are a student and would like to present a
                  poster, please also include your advisor’s name and email. If you are
                  a graduating student or a postdoc and would like to participate in
                  Graduation Day, please ask your advisor to nominate you.
              </p>
              <p>
                This year’s workshop will also feature special invited sessions,
                consisting of 3&ndash;4 speakers. If you would like to organize
                such a session, please email us the proposed topic and potential
                speakers.
              </p>
              <p>
                Please send all emails to{' '}
                <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>.
              </p>
            </Container>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
