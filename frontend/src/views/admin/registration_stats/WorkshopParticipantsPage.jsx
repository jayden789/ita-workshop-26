import React from 'react';
import { Container, Card } from 'reactstrap';

import AggregateStats from './AggregateStats';

import { api } from '../../../helpers';

export default class WorkshopParticipantsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingAggregateStats: true,
      aggregateStats: {},
    };
  }
  componentDidMount() {
    this.setState({ loadingAggregateStats: true });
    api('api/v0/registration_aggregate_stats/ita26/').then((data) => {
      this.setState({ aggregateStats: data, loadingAggregateStats: false });
    });
  }
  render = () => {
    return (
      <Card body>
        {this.props.navbar}
        <Container fluid={true}>
          <AggregateStats
            loading={this.state.loadingAggregateStats}
            stats={this.state.aggregateStats}
          />
        </Container>
      </Card>
    );
  };
}
