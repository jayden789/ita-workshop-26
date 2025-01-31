import React from 'react';
import { CardBody, CardImg, CardTitle, CardSubtitle } from 'reactstrap';

import styles from './PlenariesSection.module.css';

export default class PlenaryTalkCardContent extends React.Component {
  render() {
    // Spacer
    if (this.props.talk === null) {
      return (
        <React.Fragment>
          <CardImg
            src="https://ita.ucsd.edu/workshop/ita_rebuild_files/ita19_plenary_pics/placeholder_white.jpg"
            width="100%"
            height="320px"
          />
          <CardBody>
            <CardTitle>&nbsp;</CardTitle>
            <CardSubtitle className={styles.speakerLabel}>&nbsp;</CardSubtitle>
          </CardBody>
        </React.Fragment>
      );
    }

    const { onClickPresenterName, talk } = this.props;
    const { presenter } = talk || {};

    const onClickPresenterNameWrapper = event => {
      event.preventDefault();
      onClickPresenterName();
    };

    return (
      <React.Fragment>
        <CardImg src={presenter.picUrl} width="100%" height={presenter.picUrl?"320px":"320px"}/>
        <CardBody className="text-center">
          <CardTitle style={{fontSize:1+'rem'}}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            { ((talk.title === '' || !talk.title) && !presenter.bio) ?
            (<span>{presenter.name}</span>):
            (<a href="#" onClick={onClickPresenterNameWrapper}>
              {presenter.name}
            </a>)
            } 
          </CardTitle>
          <CardSubtitle className={styles.speakerLabel}>{presenter.affiliation}</CardSubtitle>
        </CardBody>
      </React.Fragment>
    );
  }
}
