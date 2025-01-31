import React from 'react';
import { Jumbotron, Container, UncontrolledCarousel } from 'reactstrap';

import styles from './LocationSection.module.css';

const images = [
  {
    url: 'https://ita.ucsd.edu/workshop/19/images/entrance_resized.jpg',
    title: 'Catamaran Resort',
  },
  {
    url: 'https://ita.ucsd.edu/workshop/18/images/Catamaran_Resort.jpg',
    title: 'Pool',
  },
  {
    url: 'https://ita.ucsd.edu/workshop/18/images/entrance.jpg',
    title: 'Entrance',
  },
  {
    url: 'https://ita.ucsd.edu/workshop/18/images/view.jpg',
    title: 'Bay view',
  },
  {
    url: 'https://ita.ucsd.edu/workshop/18/images/garden_room.jpg',
    title: 'Garden Room',
  },
  {
    url: 'https://ita.ucsd.edu/workshop/18/images/bay_front_room.jpg',
    title: 'Bay Front Room',
  },
  {
    url: 'https://ita.ucsd.edu/workshop/18/images/bay_front_suite.jpg',
    title: 'Bay Front Suite',
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

    return (
      <div>
        <Jumbotron fluid id="location" className={styles.location}>
          <Container>
            <div className="text-center">
              <p className="display-4">Location Location Location</p>
              <h3>Catamaran Resort, Pacific Beach, San Diego</h3>
              <p className="p">
                The Catamaran kindly gave us similar rates as last year: Garden
                view: $146, Studio: $159, Ocean/bay view suite:
                $174. Parking: $26/day. In past
                years we ran out of rooms, so please{' '}
                <a
                  href="https://www.catamaranresort.com/groups/ITA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  book soon
                </a>
                .
              </p>
              <UncontrolledCarousel items={items} className={styles.carousel} />
            </div>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
