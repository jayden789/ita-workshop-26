import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import classNames from 'classnames';

import styles from './HeroSection.module.css';

export default class ITAJumboMain extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron fluid className={styles.titleJumbo}>
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
          <div className={classNames('text-center', styles.titleSection)}>
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
            <div style={{ flex: 1 }}></div>
            <div className={styles.registerSection}>
              <Button
                href="https://forms.gle/SiefKRum2kFYJmHd9"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                className={styles.registerButton}
              >
                Register Now
              </Button>
              <div className={styles.registerGuidance}>
                Please submit your attendance and presentation details to
                participate in the workshop.
              </div>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
