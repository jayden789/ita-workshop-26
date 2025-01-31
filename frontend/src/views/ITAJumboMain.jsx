import React from 'react';
import { Jumbotron } from 'reactstrap';
import classNames from 'classnames';

import styles from './ITAJumboMain.module.css';

export default class ITAJumboMain extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron
          fluid
          className={classNames(styles.titleJumbo, 'mt-0', 'mb-0')}
        >
          <div
            className={classNames('text-center', 'mt-4', styles.titleSection)}
          >
            <h1 className={classNames('display-4', styles.titleText)}>
              2019 Information Theory and Applications
              <span className={styles.breakSpaceWhenSmall} />
              Workshop
            </h1>
            <h1 className={styles.dateText}>
              Sunday&ndash;Friday, February 10&ndash;15
            </h1>
            <h1 className={styles.locationText}>
              Catamaran Resort, Pacific Beach, San Diego
            </h1>
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
