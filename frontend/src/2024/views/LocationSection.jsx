import React from 'react';
import { Jumbotron, Container, UncontrolledCarousel, Alert } from 'reactstrap';

import styles from './LocationSection.module.css';
import entranceImage from './img2024/bahia-background.jpg';
import beachImage from './img2024/bahia-beach.jpg';
import bayviewRoomImage from './img2024/bahia-bayviewroom.jpg';
import gardenViewImage from './img2024/bahia-gardenviewroom.jpg';
import restaurantNightImage from './img2024/bahia-restaurantnight.jpg';
import portImage from './img2024/bahia-port.jpg';
import aerialImage from './img2024/bahia-aerial.jpg';
import poolImage from './img2024/bahia-pool.jpg';

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

import missionBayImage from './img2024/attraction-mission-bay.jpg';
import missionBeachImage from './img2024/attraction-mission-beach.jpg';
import belmontAerialImage from './img2024/attraction-belmont-aerial.jpg';
import belmontRideImage from './img2024/attraction-belmont-ride.jpg';
import pacificBeachImage from './img2024/attraction-pacific-beach.jpg';
import bahiaMap from './img2024/bahia-map.png';

const images = [
  {
    url: entranceImage,
    title: 'Bahia Resort',
  },
  {
    url: aerialImage,
    title: 'Aerial view',
  },
  {
    url: beachImage,
    title: 'Beach view',
  },
  {
    url: poolImage,
    title: 'Pool view',
  },
  {
    url: bayviewRoomImage,
    title: 'Bay view room and patio',
  },
  {
    url: gardenViewImage,
    title: 'Garden view room and patio',
  },
  {
    url: restaurantNightImage,
    title: 'Restaurant at night',
  },
  {
    url: portImage,
    title: 'Port at Night',
  },
];

const attractions = [
  {
    url: missionBayImage,
    title:
      'Explore Mission Bay, a 4,600-acre aquatic playground, the largest of its kind in the world',
  },
  {
    url: missionBeachImage,
    title: 'Walk down Mission Beach, a 2-mile stretch of white-sand beach',
  },
  {
    url: belmontAerialImage,
    title: 'Visit Belmont Park',
  },
  {
    url: belmontRideImage,
    title: 'Belmont Park rides',
  },
  {
    url: pacificBeachImage,
    title: 'Stroll down Pacific Beach',
  },
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
              <h3>Bahia Resort, San Diego</h3>
              <p className="p">
                TripAdvisor's consistently favorite San Diego Hotel, the Bahia
                Resort is nestled on a serene private peninsula jutting into the
                San Diego Bay. It features an expansive private white-sand,
                cabana dotted, beachfront, a boat dock, lush tropical gardens,
                exotic waterfowls, tennis courts, swimming pool, and fitness
                center, all providing an idyllic setup for our meeting,
                collaboration, and recreation. The Pacific Ocean, oceanfront
                boardwalk, Belmont Amusement Park, and many restaurants are just
                a few minutes walk away, and the bustling neighborhoods of
                Mission- and Pacific-Beach a short distance beyond.
                <br />
                <br />
                The Bahia was recently renovated and boasts modern amply-sized
                rooms, many with balconies, patios, and striking water views.
                Our room rates are significantly discounted, with standard rooms
                featuring varying views at $165, larger studios at $199, and
                suites at $350, all inclusive of resort fees.
                <Alert color="primary" className="small p-2 mb-2 mt-4">
                  As of Friday 2/2 the hotel does not show availability for
                  standard and studio rooms. We are trying to add such rooms to
                  the block, and will update you when we get more information.
                </Alert>
                <a
                  href="https://be.synxis.com/?adult=1&arrive=2024-02-17&chain=17551&child=0&clearcache=all&config=GP2024&currency=USD&depart=2024-02-18&group=ITA2024&hotel=64070&level=hotel&linking=beach30&locale=en-US&rooms=1&theme=Group2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book here
                </a>
                {/* <span style={{color: 'red'}}> Block rates no longer available. Please <a href="mailto:ita@ucsd.edu">email us</a> for further information.</span>
                , especially if you would like to stay over Presidents’ weekend, reservations cancellable up to three days prior to arrival. */}
              </p>
              <img
                src={bahiaMap}
                alt="Map of the rooms in Bahia"
                className="mt-4 mb-4"
              />
              <UncontrolledCarousel items={items} className={styles.carousel} />
            </div>
            <div className="text-center" style={{ marginTop: '20px' }}>
              <h3>Nearby Attractions</h3>
              <UncontrolledCarousel
                items={attraction_items}
                className={styles.carousel}
              />
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
