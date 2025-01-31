import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const ProfileCard = React.memo(({ name, website, affiliation, image }) => (
  <Card className="profileCard">
    {image ? (
      <CardImg
        top
        width="100%"
        // height="208px"
        src={image}
        alt={'Profile picture of ' + name}
        className="profileCardImg"
      />
    ) : (
      undefined
    )}
    <CardBody className="text-center">
      {website === '' ? (
        <CardTitle>{name}</CardTitle>
      ) : (
        <CardTitle>
          <a href={website} target="_blank" rel="noopener noreferrer">{name}</a>
        </CardTitle>
      )}
      <CardSubtitle>{affiliation}</CardSubtitle>
    </CardBody>
  </Card>
));

export default ProfileCard;
