import React from 'react';
import { Container, Jumbotron } from 'reactstrap';

export default class TurkeyEarhquakeSection extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron fluid style={{ backgroundColor: 'beige', 
        backgroundImage: 'url(https://ita.ucsd.edu/workshop/23/images/TurkeyBackground.jpg)',
        color: 'white'

        }}>
          <div className="text-center">
            <h1 className="display-4 mb-4"> Together with our Colleagues</h1>
            <Container>
              
              <p>
              In this week of love, our 💜 goes out to our community members whose families, friends, colleagues, and fellow country-men, women, and children, were affected by the tragic Kahramanmaras Earthquake. We hope for speedy recovery and reconstruction and that the region’s glorious past will soon reflect its future.
            </p><p>
            Please <a href='https://www.groupgreeting.com/sign/764fe67466250a9' target="_blank" rel="noopener noreferrer" style={{color:'orange'}}>join us in wishing the best</a> to current and former ITA attendees whose families hail from the affected region, and help us remind them of calmer times spent together. 
            </p><p>
            We also encourage you to consider donating to the recovery effort in Turkey <a href='https://gofund.me/55ce70b7' target="_blank" rel="noopener noreferrer" style={{color:'orange'}}> here</a>, where you will be able to see the total contribution by ITA attendees.
            </p><p>
            Thank you very much, and let calm reign on earth. 

            ITA

              </p>

            </Container>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
