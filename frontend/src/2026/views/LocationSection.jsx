import React from 'react';
import { Jumbotron, Button, UncontrolledCarousel } from 'reactstrap';

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
import bahiaMap25 from './img2025/Bahia Resort - 2025.png';

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
          <div className="text-center">
            <p className="display-4">Location Location Location</p>
            <h3>Bahia Resort Hotel, San Diego</h3>
            <p className="p">
              This year too we return to the spectacular Bahia Resort Hotel. 
              Consistently rated as one of TripAdvisor's top San Diego resorts, 
              the recently-remodeled Bahia  stretches along a pristine beach 
              on a fourteen-acre private peninsula lushly landscaped with tropical
              gardens, tranquil ponds, curious fish, and resident waterbirds. 
              The hotel features beachfront restaurants, a pool, hot tub, tennis 
              courts, and fitness center. It is also steps away from the Pacific Ocean, 
              its lively boardwalk and memorable sunsets, Mission and Pacific Beach vibrant 
              restaurants, bay and ocean water sports, historic Belmont Park, SeaWorld, 
              and a short ride from San Diego Airport. 
            </p>
            <h1 className="display-4 mb-4 mt-5"> Rates and Reservations</h1>
            <p className="p">
              We negotiated substantially discounted, nearly pre-pandemic, 
              room rates of just $174 for standard rooms and $219 for studios. 

              To ensure availability, <a href="https://be.synxis.com/?adult=1&arrive=2026-02-06&chain=17551&child=0&clearcache=all&config=GP2024&currency=USD&depart=2026-02-15&group=ITA26&hotel=64070&level=hotel&locale=en-US&productcurrency=USD&rooms=1&theme=Group2" target="_blank" rel="noopener noreferrer">please reserve soon.</a>
            </p>
            <Button
              href="https://be.synxis.com/?adult=1&arrive=2026-02-06&chain=17551&child=0&clearcache=all&config=GP2024&currency=USD&depart=2026-02-15&group=ITA26&hotel=64070&level=hotel&locale=en-US&productcurrency=USD&rooms=1&theme=Group2"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              style={{ marginTop: '32px', marginBottom: '32px' }}
            >
              Book Here
            </Button>
            {/* <img
              src={bahiaMap25}
              alt="Map of the rooms in Bahia"
              className="mt-4 mb-4"
            /> */}
            <UncontrolledCarousel items={items} className={styles.carousel} />
          </div>
          <div className="text-center" style={{ marginTop: '72px' }}>
            <h3>Nearby Attractions</h3>
            <UncontrolledCarousel
              items={attraction_items}
              className={styles.carousel}
            />
          </div>
        </Jumbotron>
      </div>
    );
  }
}
