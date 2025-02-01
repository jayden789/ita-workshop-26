import React from 'react';
import { Jumbotron, Container, UncontrolledCarousel } from 'reactstrap';

import styles from './LocationSection.module.css';
import entranceImage from './img2025/bahia-background.jpg';
import beachImage from './img2025/bahia-beach.jpg';
import bayviewRoomImage from './img2025/bahia-bayviewroom.jpg';
import gardenViewImage from './img2025/bahia-gardenviewroom.jpg';
import restaurantNightImage from './img2025/bahia-restaurantnight.jpg';
import portImage from './img2025/bahia-port.jpg';
import aerialImage from './img2025/bahia-aerial.jpg';
import poolImage from './img2025/bahia-pool.jpg';

import missionBayImage from './img2025/attraction-mission-bay.jpg';
import missionBeachImage from './img2025/attraction-mission-beach.jpg';
import belmontAerialImage from './img2025/attraction-belmont-aerial.jpg';
import belmontRideImage from './img2025/attraction-belmont-ride.jpg';
import pacificBeachImage from './img2025/attraction-pacific-beach.jpg';
import bahiaMap from './img2025/bahia-map.png';

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
                <a
                  href="https://be.synxis.com/?adult=1&arrive=2025-02-07&chain=17551&child=0&clearcache=all&config=GPNORF&currency=USD&depart=2025-02-17&group=ITA2025&hotel=64070&level=hotel&locale=en-US&productcurrency=USD&rooms=1&theme=Group2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book here
                </a>
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
