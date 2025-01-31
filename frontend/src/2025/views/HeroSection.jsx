import React from 'react';
import { Jumbotron } from 'reactstrap';
import classNames from 'classnames';

import styles from './HeroSection.module.css';

export default class ITAJumboMain extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron
          fluid
          className={classNames(styles.titleJumbo, 'mt-0', 'mb-0')}
        >
          <video
            loop
            muted
            playsInline
            autoPlay
            poster="/img2025/bahia-background.jpg"
            preload="auto"
            className={styles.video}
          >
            <source
              src="https://www.bahiahotel.com/sites/default/files/2021-10/Bah%20Loop%202021_0.mp4"
              type="video/mp4"
            />
          </video>
          <div className={styles.overlay} />
          <div
            className={classNames('text-center', 'mt-4', styles.titleSection)}
          >
            <h1 className={classNames('display-4', styles.titleText)}>
              2025 Information Theory and Applications
              <span className={styles.breakSpaceWhenSmall} />
              Workshop
            </h1>
            <h1 className={styles.dateText}>
              Sunday&ndash;Friday, February 9&ndash;14
            </h1>
            <h1 className={styles.locationText}>Bahia Resort, San Diego</h1>
            <h3 className={styles.taglineText}>
              A casual gathering of researchers applying theory to diverse areas
              in science and engineering
            </h3>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
