import React from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
const plenaries = [
  {
    id: 11,
    user_id: 1,
    title: 'Sub-Nyquist Sampling without Sparsity',
    abstract: 'Eldar plenary lorem ipsum dolor sit amet',
    day: 'Monday',
    time: '1:30 PM',
  },
  {
    id: 12,
    user_id: 2,
    title:
      'The Emergence Theory of Deep Learning: Perception, Information Theory and PAC Bayes',
    abstract: 'Soatto plenary lorem ipsum dolor sit amet',
    day: 'Wednesday',
    time: '2:00 PM',
  },
  {
    id: 13,
    user_id: 3,
    title:
      'From Optimization to Statistical Learning: Two Vignettes from the Interface',
    abstract: 'Wainwright plenary lorem ipsum dolor sit amet',
    day: 'Wednesday',
    time: '2:45 PM',
  },
];
export default class ITACarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === plenaries.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? plenaries.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = plenaries.map(plenary => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={plenary.id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <CarouselCaption
            captionText={plenary.abstract}
            captionHeader={plenary.title}
          />
        </CarouselItem>
      );
    });

    return (
      <div className="mt-0">
        <style>
          {`.custom-tag {
                max-width: 100%;
                height: 500px;
                background-image: url("https://ucsd.edu/_resources/vid/vid-poster.jpg")
              }`}
        </style>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={plenaries}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
      </div>
    );
  }
}
