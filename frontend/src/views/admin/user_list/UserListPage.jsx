import { debounce } from 'debounce';
import React from 'react';
import { Container, Card } from 'reactstrap';
import queryString from 'query-string';

import { api } from '../../../helpers';
import UserTable from './UserTable';

const intDivRoundUp = (a, b) => {
  const quotient = Math.floor(a / b);
  const remainder = a % b;
  return quotient + (remainder === 0 ? 0 : 1);
};

const formatFilters = filtered => {
  const apiFilters = {};
  filtered.forEach(filter => {
    switch (filter.id) {
      case 'inviter':
        apiFilters.inviter = filter.value;
        break;
      case 'firstName':
        apiFilters.first_name = filter.value;
        break;
      case 'lastName':
        apiFilters.last_name = filter.value;
        break;
      case 'email':
        apiFilters.email = filter.value;
        break;
      default:
        console.warn(`Unknown filter ID ${filter.id}`);
        break;
    }
  });
  return apiFilters;
};

export default class UserListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingUserData: true,
      loadingInviters: true,
      numTotalPages: 0,
      userData: [],
      inviterUrlToObjectMap: new Map()
    };
    this.fetchRegnData = debounce(this.fetchRegnData.bind(this), 1000);
  }

  componentDidMount() {
    api('api/v0/inviters/').then(inviters => {
      const urlToObjectMap = new Map(
        inviters.map(inviter => [inviter.url, inviter])
      );
      this.setState({
        inviterUrlToObjectMap: urlToObjectMap,
        loadingInviters: false
      });
    });
  }

  fetchRegnData = (state, instance) => {
    const { page, pageSize, filtered } = state;
    console.log("filkteres:",filtered)
    var year = window.location.pathname.split('ws/').pop().split('/')[0];
    if (isNaN(year)) {
      year = "20";
    }
    const queryStr = queryString.stringify({
      workshop_slug: 'ita' + year,
      page: page + 1,
      page_size: pageSize,
      ...formatFilters(filtered)
    });

    new Promise(resolve => this.setState({ loadingUserData: true }, resolve))
      // need to add 1 to page, since API is 1-indexed and react-table is
      // 0-indexed
      .then(() => api(`api/v0/users_with_registration_data/?${queryStr}`))
      .then(({ results: userData, count: numTotalResults }) => {
        const numTotalPages = intDivRoundUp(numTotalResults, pageSize);
        this.setState({
          userData,
          numTotalPages,
          loadingUserData: false
        });
      });
  };

  getInviterByUrl = url => this.state.inviterUrlToObjectMap.get(url);

  render = () => {
    return (
      <Card body>
      <div>
        <Container fluid={true}>
          {this.state.loadingInviters ? (
            <p>Loading...</p>
          ) : (
            <UserTable
              allUserData={this.state.userData}
              numTotalPages={this.state.numTotalPages}
              loadingUserData={this.state.loadingUserData}
              onFetchData={this.fetchRegnData}
              getInviterByUrl={this.getInviterByUrl}
            />
          )}
        </Container>
      </div>
      </Card>
    );
  };
}
