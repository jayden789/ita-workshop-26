import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const HeaderSection = ({ title, name }) => {
  const titleText = title ? (
    <span>
      {title} &mdash; {name}
    </span>
  ) : (
    <span>{name}</span>
  );
  return <span style={{ fontSize: 24 }}>{titleText}</span>;
};

const AbstractSection = ({ abstract }) => {
  return abstract ? (
    <React.Fragment>
      <h4>Abstract</h4>
      <p dangerouslySetInnerHTML={{__html: abstract}}></p>
    </React.Fragment>
  ) : (
    <p>Check back soon for details.</p>
  );
};

const BioSection = ({ bio }) => {
  return bio ? (
    <React.Fragment>
      <h4>Biography</h4>
      <p dangerouslySetInnerHTML={{__html: bio}}></p>
    </React.Fragment>
  ) : null;
};

const LinksSection = ({ websiteUrl }) => {
  const linksContent = [['Website', websiteUrl]].filter(([_, url]) => !!url);
  const links = linksContent.map(([title, url], linkIndex) => (
    <li key={linkIndex}>
      <a href={url} title={title} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </li>
  ));

  return links.length ? (
    <React.Fragment>
      <h4>Links</h4>
      <ul>{links}</ul>
    </React.Fragment>
  ) : null;
};

const ModeratorTalkSection = ({ title, abstract }) => {
  if (!title || !abstract) {
    return null;
  }
  return (
    <React.Fragment>
      <h4>{title}</h4>
      <p>{abstract}</p>
    </React.Fragment>
  );
};

export class PlenaryPresenterDetailModal extends React.Component {
  render() {
    const { talk, isOpen, onToggleModal } = this.props;
    const { presenter, title, abstract } = talk || {};
    const { name, websiteUrl, bio } = presenter || {};
    const closeBtn = (
      <button className="close" onClick={onToggleModal}>
        &times;
      </button>
    );

    return (
      <Modal isOpen={isOpen} toggle={onToggleModal} size="lg">
        <ModalHeader close={closeBtn}>
          <HeaderSection name={name} title={title} />
        </ModalHeader>
        <ModalBody>
          <AbstractSection abstract={abstract} />
          <BioSection bio={bio} />
          <LinksSection websiteUrl={websiteUrl} />
        </ModalBody>
      </Modal>
    );
  }
}

export class PlenaryModeratorDetailModal extends React.Component {
  render() {
    const { moderator, moderatorTalk, isOpen, onToggleModal } = this.props;
    const { name, websiteUrl, bio } = moderator || {};
    const { title, abstract } = moderatorTalk || {};
    const closeBtn = (
      <button className="close" onClick={onToggleModal}>
        &times;
      </button>
    );
    return (
      <Modal isOpen={isOpen} toggle={onToggleModal} size="lg">
        <ModalHeader close={closeBtn}>
          <HeaderSection name={name} />
        </ModalHeader>
        <ModalBody>
          <ModeratorTalkSection title={title} abstract={abstract} />
          <BioSection bio={bio} />
          <LinksSection websiteUrl={websiteUrl} />
        </ModalBody>
      </Modal>
    );
  }
}
