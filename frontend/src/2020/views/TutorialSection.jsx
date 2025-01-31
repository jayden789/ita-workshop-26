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
              <h1 className="display-4 mb-2">
                Learn To Do
              </h1>
              <h5 className="mb-2">
                Tutorials and expository talks on Machine Learning
              </h5>
              <p>
                Saturday 2/8, 8:30 - 4:00, at the Catamaran. <a href="/register">Registration required.</a>
              </p>
            </div>
            <Row className="mb-2">
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle1}>
                  <CardImg
                    top
                    src={deepLearningImg}
                    alt="Deep learning" style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal1}
                    toggle={this.toggle1}
                    centered
                  >
                    <ModalHeader toggle={this.toggle1}>
                      Deep Learning - Ruslan Salakhutdinov, CMU
                    </ModalHeader>
                    <ModalBody>
                    The goal of the tutorial is to introduce mathematical basics of many recent deep learning methods. The core focus will be placed on algorithms that can learn multi-layer hierarchies of representations.
<br></br>
The tutorial will be split into two parts. The first part will focus on supervised (discriminative) learning algorithms that can learn multi-layer representations via non-convex optimization. Topics will include: multi-layer neural networks, convolutional networks, back-propagation algorithm, stochastic gradient descend (SGD), dropout training, batch-normalization, and recent second-order optimization methods. The second part of the tutorial will introduce mathematical basics of many popular unsupervised models, including Variational Autoencoders (VAE), Generative Adversarial Networks (GANs), and more recently introduced Capsule Networks. I will also discuss recent trends in modelling sequential data using Recurrent Neural Networks (RNNs), Sequence-to-Sequence models, and Transformer Architectures.
<br></br>
Throughout this tutorial I will highlight various application areas, including visual object recognition and video analysis, language understanding, including reading comprehension and question-answering models, and time series analysis.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle1}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle1} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Deep Learning
                    </span>
                  </CardTitle>
                  <CardBody><a href="https://www.cs.cmu.edu/~rsalakhu/">Ruslan Salakhutdinov</a>, CMU</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}>8:30-10:30</CardFooter>
                </Card>
              </Col>

              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle2}>
                  <CardImg
                    top
                    width="100%"
                    height="auto"
                    src={reinforcementlearningImg}
                    alt="Reinforcement learning" style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal2}
                    toggle={this.toggle2}
                    centered
                  >
                    <ModalHeader toggle={this.toggle2}>
                      Reinforcement Learning
                    </ModalHeader>
                    <ModalBody>
                    Robert Kleinberg, Cornell, and Alex Slivkins, Microsoft
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle2}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle2} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Reinforcement Learning
                    </span>
                  </CardTitle>
                  <CardBody><a href="https://www.cs.cornell.edu/~rdk/">Robert Kleinberg</a>, Cornell, 
                    and <a href="https://www.microsoft.com/en-us/research/people/slivkins/">Alex Slivkins</a>, Microsoft
                  </CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}></CardFooter>
                </Card>
              </Col>

              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }} onClick={this.toggle3}>
                  <CardImg
                    top
                    width="100%"
                    height="auto"
                    src={safetyAndLuckinessImg}
                    alt="Safety and Luckiness" style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal3}
                    toggle={this.toggle3}
                    centered
                  >
                    <ModalHeader toggle={this.toggle3}>
                      Safety and Luckiness
                    </ModalHeader>
                    <ModalBody>
                    Peter Grunwald, CWI
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle3}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle3} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Safety and Luckiness
                    </span>
                  </CardTitle>
                  <CardBody> <a href="https://www.cwi.nl/people/peter-gruenwald">Peter Grunwald</a>, CWI</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px', minHeight: '25px' }}></CardFooter>
                </Card>
              </Col>
              <Col>
                <Card className="text-center" style={{ height: '100%', cursor: 'pointer' }}
                  onClick={this.toggle4}>
                  <CardImg
                    top
                    width="100%"
                    height="auto"
                    src={machineLearningImg}
                    alt="Machine Learning" style={{ borderBottom: '1px solid lightgray' }}
                  />
                  <Modal
                    isOpen={this.state.modal4}
                    toggle={this.toggle4}
                    centered
                  >
                    <ModalHeader toggle={this.toggle4}>
                      Machine Learning
                    </ModalHeader>
                    <ModalBody>
                    Cosma Shalizi, CMU
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle4}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <CardTitle className="mt-4">
                    <span onClick={this.toggle4} style={{ cursor: 'pointer', fontSize: '17px' }}>
                      Machine Learning
                    </span>
                  </CardTitle>
                  <CardBody> <a href="https://www.cwi.nl/people/peter-gruenwald">Peter Grunwald</a>, CWI</CardBody>
                  <CardFooter className="mt-auto" style={{ fontSize: '12px' }}></CardFooter>
                </Card>
              </Col>
            </Row>
          </Jumbotron>
        </Container >
      </div >
    );
  }
}
