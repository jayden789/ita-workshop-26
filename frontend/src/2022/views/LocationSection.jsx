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
              The Catamaran kindly gave us similar rates to last year's: Rooms: $153, Studio: $163 and Suites: $178. In past years we ran out of rooms, so please {' '}
                <a
                  href="https://be.synxis.com/?adult=1&arrive=2022-05-20&chain=17551&child=0&clearcache=all&config=Group&currency=USD&depart=2022-05-27&group=IEEE22&hotel=64071&level=hotel&locale=en-US&rooms=1&theme=Group"
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
