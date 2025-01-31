import React from 'react';
import { Card, CardImg } from 'reactstrap';

export default class ITAMapReplacement extends React.Component {
  render() {
    return (
      <div>
        <Card inverse>
          <CardImg
            src="https://ita.ucsd.edu/workshop/19/images/Catamaran_Resort.jpg"
            alt="Card image cap"
          />
        </Card>
      </div>
    );
  }
}
