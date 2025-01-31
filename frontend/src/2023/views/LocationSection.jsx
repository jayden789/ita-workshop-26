import React from 'react';
import { Jumbotron, Container, UncontrolledCarousel } from 'reactstrap';

import styles from './LocationSection.module.css';
import entranceImage from './img2023/wyndham-background.jpeg';
import eveningImage from './img2023/wyndham-entrance.jpg'
import skyviewImage from './img2023/wyndham-skyview.jpg';
import bayviewRoomImage from './img2023/wyndham-bayviewroom.jpeg';
import bayviewImage from './img2023/wyndham-bayview.jpeg';
import bayviewEveningImage from './img2023/wyndham-bayview-evening.jpeg';
import skylineViewImage from './img2023/wyndham-skylineview.jpeg';
import standardRoomImage from './img2023/wyndham-standardroom-view.jpeg';
import gymImage from './img2023/wyndham-gym.jpeg';

import portsidepierImage from './img2023/attraction-portsidepier.jpeg';
import topsailImage from './img2023/attraction-topsail.jpeg';
import maritimeImage from './img2023/attraction-maritime-museum.jpeg';
import waterfrontParkImage from './img2023/attraction-waterfront-park.jpeg';
import santafeImage from './img2023/attraction-santafe-depot.jpeg';
import littleItalyImage from './img2023/attraction-little-italy.jpeg';
import gaslampImage from './img2023/attraction-gaslamp.jpeg';
import midwayImage from './img2023/attraction-midway-museum.jpeg';
import seaportImage from './img2023/attraction-seaport-village.jpeg';
import coronadoImage from './img2023/attraction-coronado-island.jpeg';
import hotelCoronadoImage from './img2023/attraction-hotel-del-coronado.jpeg';

const images = [
  {
    url: entranceImage,
    title: 'Windham Resort',
  },
  {
    url: eveningImage,
    title: 'Evening view',
  },
  {
    url:bayviewRoomImage,
    title: 'Bay view Room and balcony',
  },
  {
    url: bayviewImage,
    title: 'View from the bayview room',
  },
  {
    url: bayviewEveningImage,
    title: 'Bay view room in the evening',
  },
  {
    url: skyviewImage,
    title: 'Skyline view Room',
  },
  {
    url: skylineViewImage,
    title: 'Skyline views',
  },
  {
    url: standardRoomImage,
    title: 'Standard room',
  },
  {
    url: gymImage,
    title: 'One of two hotel gyms',
  }
];

const attractions = [
  {
    url: portsidepierImage,
    title: 'Portside Pier, brand new overwater coffeeshop and restaurants, across the street',
  },
  {
    url: topsailImage,
    title: 'Topsail, fire pits, small plates, across the street ',
  },
  {
    url:maritimeImage,
    title: 'Maritime museum, nine historic ships, across the street',
  },
  {
    url: waterfrontParkImage,
    title: 'Waterfront Park, across the street',
  },
  {
    url: santafeImage,
    title: 'Santa Fe Depot, 13 daily trains to LA, a block away',
  },
  {
    url: littleItalyImage,
    title: 'Little Italy, San Diego’s happening evening spot, starts three blocks away',
  },
  {
    url: gaslampImage,
    title: 'Gaslamp Quarter, San Diego’s historic and nightlife epicenter',
  },
  {
    url: midwayImage,
    title: 'Midway aircraft carrier museum, a few blocks along the waterfront',
  },
  {
    url: seaportImage,
    title: 'Seaport Village, a few blocks along the waterfront',
  },
  {
    url: coronadoImage,
    title: 'Coronado Island Ferry, bikes rentable at hotel welcome, a block away',
  },
  {
    url: hotelCoronadoImage,
    title: 'Hotel Del Coronado, US second largest wooden structure, short bike ride from ferry',
  }
];

export default class ITAJumboLocation extends React.Component {
  render() {
    const items = images.map(({ url, title }) => ({
      src: url,
      altText: title,
      caption: '',
      header: title,
    }));

    const attraction_items = attractions.map(({ url, title }) => ({
      src: url,
      altText: title,
      caption: '',
      header: title,
    }));

    return (
      <div>
        <Jumbotron fluid id="location" className={styles.location}>
          <Container>
            <div className="text-center">
              <p className="display-4">Location Location Location</p>
              <h3>Wyndham Bayside, San Diego</h3>
              <p className="p">
              The Wyndham is exquisitely located on San Diego’s thriving waterfront with spectacular views, a stone throw away from many of San Diego’s 
              best known attractions and restaurants. All rooms are similarly sized and with balconies, they differ mainly in the view. 
              Standard rooms face a courtyard or pool $155, Skyline view rooms face a modern high-rise neighborhood $170, 
              Bay view rooms have spectacular views of the SD Bay, marina, airport, and Coronado Island $185.&nbsp;
                <a
                  href="https://book.passkey.com/event/50385779/owner/55596/home"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <del>Please book soon</del>
                </a>
                <span style={{color: 'red'}}> Block rates no longer available. Please <a href="mailto:ita@ucsd.edu">email us</a> for further information.</span>
                , especially if you would like to stay over Presidents’ weekend, reservations cancellable up to three days prior to arrival.
              </p>
              <UncontrolledCarousel items={items} className={styles.carousel} />
            </div>
            <div className="text-center" style={{marginTop:'20px'}}>
            <h3>Nearby Attractions</h3>
              <UncontrolledCarousel items={attraction_items} className={styles.carousel} />
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
