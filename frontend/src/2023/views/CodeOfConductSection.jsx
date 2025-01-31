import React from 'react';
import { Container, Jumbotron } from 'reactstrap';

const Link = ({ url, title = '', children }) => (
  <a href={url} title={title} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const ieeeCocLink = (
  <Link url="https://www.ieee.org/content/dam/ieee-org/ieee/web/org/conferences/Event%20Conduct%20and%20Safety%20Statement.pdf">
    IEEE
  </Link>
);

const acmCocLink = (
  <Link url="https://www.acm.org/special-interest-groups/volunteer-resources/officers-manual/policy-against-discrimination-and-harassment">
    ACM
  </Link>
);

const itaCocLink = (
  <Link url="https://www.itsoc.org/about/conduct-and-ethics">
    Information Theory Society
  </Link>
);

const emailLink = <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>;

export default class CodeOfConductSection extends React.Component {
  render() {
    return (
      <Jumbotron fluid style={{ backgroundColor: '#ccc', marginBottom: '0px' }}>
        <div className="text-center">
          <h1 className="display-4 mb-2">Code of Conduct</h1>
          <Container>
            <p>
              The ITA workshop and community are built upon the core values of
              collegiality, support, and dignity for all, and we endorse the
              conference codes of conduct adopted by the {acmCocLink}, {ieeeCocLink}, and the{' '}
              {itaCocLink}. Disrespectful, offensive, and
              inappropriate behavior is not welcome at our events. If you
              observe such behavior, please inform one of our staff or email us
              at {emailLink}.
            </p>
          </Container>
        </div>
      </Jumbotron>
    );
  }
}
