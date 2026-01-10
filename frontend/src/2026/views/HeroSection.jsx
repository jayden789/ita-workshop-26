import React from 'react';
import {
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import classNames from 'classnames';
import { HashLink as Link } from 'react-router-hash-link';
import styles from './HeroSection.module.css';

export default class ITAJumboMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGuideModal: false,
    };
    this.toggleGuideModal = this.toggleGuideModal.bind(this);
  }

  toggleGuideModal() {
    this.setState({
      showGuideModal: !this.state.showGuideModal,
    });
  }

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
              2026 Information Theory and Applications
              <span className={styles.breakSpaceWhenSmall} />
              Workshop
            </h1>
            <h1 className={styles.dateText}>
              Sunday&ndash;Friday, February 8&ndash;13
            </h1>
            <h1 className={styles.locationText}>Bahia Resort Hotel, San Diego</h1>
            <h3 className={styles.taglineText}>
              A casual gathering of researchers applying theory to diverse areas
              in science and engineering
            </h3>
            {/* <Button
              onClick={this.toggleGuideModal}
              color="primary"
              className={styles.registerButton}
            >
              ITA SURVIVAL GUIDE
            </Button> */}
            <div style={{ flex: 1 }}></div>
            <Modal
              isOpen={this.state.showGuideModal}
              toggle={this.toggleGuideModal}
              centered
              size="lg"
            >
              <ModalHeader toggle={this.toggleGuideModal}>
                ITA SURVIVAL GUIDE
              </ModalHeader>
              <ModalBody>
                Thank you for coming to ITA! We apologize for the
                suspense-building invitations, and will do our best to make up
                for it with a jam-packed week of information, action, and
                well-under-control chaos. But not to worry, this guide will help
                you survive.
                <br></br>
                <br></br>
                <b>Sunday</b>
                <br></br>
                Super Bowl LIX kicks off at 3:30. Football enthusiasts,
                commercial connoisseurs, and snack opportunists are invited to
                the Cabrillo Suite (next to the Pacific Room, across from the
                lobby) for light refreshments. Space is limited, so we may play
                yet another game - musical chairs.
                <br></br>
                At 7:00 PM, we’ll mosey on over to the Oscar Eatatorium (5th
                floor) for registration, reception, light alimentation, and
                smooth conversation
                <br></br>
                <br></br>
                <b>
                  Starting Monday, the workshop will unfold in two main arenas:
                </b>
                <br></br>
                The Oscar Eatatorium, aka Plenary Central
                <br></br>
                Breakfasts: 8:00 - 9:00
                <br></br>
                Plenaries: 9:00 - 10:15
                <br></br>
                Lunch: 12:00 - 2:00, there being no free lunch, you'll get to
                enjoy some sermons
                <br></br>
                <br></br>
                <b>Seaside Sessions</b>
                <br></br>
                10:40 - 12:00, 2:00 - 3:20, 3:40 - 5:00, four concurrent
                sessions at:
                <br></br>
                Marie & Pierre Rooms aboard the WD Evans Sternwheeler, our
                trademark boat sessions
                <br></br>
                Nikola & Pigeon Room, dockside, thanks to renovations we’ll
                sneak in via an adventurous back alley
                <br></br>
                Breaks include light refreshments, and room names nod to Cupid
                Friday.
                <br></br>
                <br></br>
                <b>Graduation Wednesday</b>
                <br></br>
                When we celebrate our graduating students and aspiring postdocs
                presenting talks in the morning and parlaying posters over lunch
                at the beachside sunburn session.
                <br></br>
                In the evening, we'll reconvene at the Oscar Eatatorium for a
                banquet with Graduation Day Sea, Sand, and Sun Awards.
                <br></br>
                <br></br>
                <b>Additional evening events to keep you out of mischief</b>
                <br></br>
                Monday – Panel on how to thrive (or at least survive) as a
                researcher
                <br></br>
                Tuesday – Taco Tuesday, San Diego's culinary claim to fame
                <br></br>
                Thursday – Game night at the Cabrillo Suite
                <br></br>
                Friday – Farewell bash and teary eyes
                <br></br>
                <br></br>
                <b>ITA needs you!</b>
                <br></br>
                We desperately seek selfless individuals to:
                <br></br>
                Lead Tuesday & Thursday morning runs, to counteract Taco Tuesday
                <br></br>
                Partake in entertainment sessions - all talents welcome, your
                friend's talent too
                <br></br>
                Co-chair sessions and ensure A/V runs smoothly
                <br></br>
                <br></br>
                <b>Your reward for reading thus far:</b>
                <br></br>
                Network: ITA_WORKSHOP
                <br></br>
                Password: ucsd*ITA2025
                <br></br>
                <br></br>
                Looking forward to a week of fun and fundamentals,
                <br></br>
                ITA
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleGuideModal}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
            <div className={styles.registerSection}>
              {/*<Button
                href="https://forms.gle/SiefKRum2kFYJmHd9"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                className={styles.registerButton}
              >
                Register Now
              </Button>*/}
              {/* <a
                href="https://ita-workshop-app.web.app/"
                className="text-xl mb-4 hover:underline text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Workshop Web App (please open on your phone)
              </a> */}
              {/* <Button
                tag={Link}
                to="/register"
                color="primary"
                className={styles.registerButton}
              >
                Register
              </Button> */}
              <div className={styles.registerGuidance}>
                We are still accepting new registrations and presentations. If
                you like to join the workshop please{' '}
                <a href="mailto:ita@ucsd.edu">write us</a>.
              </div>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
