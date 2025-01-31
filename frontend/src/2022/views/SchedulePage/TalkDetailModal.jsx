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
      <p>{abstract}</p>
    </React.Fragment>
  ) : (
    <p>No abstract provided.</p>
  );
};

const AuthorSection = ({ authors_comment }) => {
  return authors_comment ? (
    <React.Fragment>
      <h4>Authors</h4>
      <p>{authors_comment}</p>
    </React.Fragment>
  ) : null;
};


export class TalkDetailModal extends React.Component {
  render() {
    const { talk, isOpen, onToggleModal } = this.props;
    const { title, abstract, author, authors_comment } = talk || {};
    
    return (
      <Modal isOpen={isOpen} toggle={onToggleModal} size="lg">
        <ModalHeader>
          <HeaderSection name={author} title={title} />
        </ModalHeader>
        <ModalBody>
          <AuthorSection authors_comment={authors_comment} />
          <AbstractSection abstract={abstract} />
          
        </ModalBody>
      </Modal>
    );
  }
}
