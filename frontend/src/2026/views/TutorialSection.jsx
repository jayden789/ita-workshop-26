import React from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardFooter,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';

import reinforcementlearningImg from './img2020/reinforcementlearning.png';
import safetyAndLuckinessImg from './img2020/safetyandluckiness.jpg';
import machineLearningImg from './img2020/machinelearning.jpg';
import deepLearningImg from './img2020/deeplearning.jpg';

export default class GeneralInfoSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      modal7: false,
      modal8: false,
      modal9: false,
      modal10: false,
      modal11: false,
    };

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.toggle4 = this.toggle4.bind(this);
  }

  toggle1() {
    this.setState({
      modal1: !this.state.modal1,
    });
  }

  toggle2() {
    this.setState({
      modal2: !this.state.modal2,
    });
  }

  toggle3() {
    this.setState({
      modal3: !this.state.modal3,
    });
  }

  toggle4() {
    this.setState({
      modal4: !this.state.modal4,
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Jumbotron fluid style={{ backgroundColor: 'white' }}>
            <div className="text-center">
              <h1 className="display-4 mb-2">ITA + ALT = ITALT</h1>
              <p>
                This year, the{' '}
                <a
                  href="http://algorithmiclearningtheory.org/alt2025/"
                  target="__blank"
                >
                  ALT Conference
                </a>{' '}
                returns to San Diego to be co-located with ITA. On Saturday
                February 24th we will hold the joint ITALT symposium featuring
                tutorials by Ankur Moitra and Yuanzhi LI, a professional
                development panel, and social/mentoring activities, bridge the
                learning theory and information theory communities. Organized by
                Vidya Muthukumar.
              </p>
            </div>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}
