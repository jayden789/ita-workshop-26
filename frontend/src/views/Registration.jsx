import React from 'react';
import queryString from 'query-string';

import ITARegisterTabs from './ITARegisterTabs';

export default class Registration extends React.Component {
  getEffectiveUserUrl = () => {
    const { location, loggedInUser } = this.props;
    if (location === undefined) {
      console.warn(
        "Component has no location prop; query string can't be read."
      );
    }

    const { userUrl: queryUserUrl } = queryString.parse(location.search || '');
    if (queryUserUrl !== undefined) {
      return queryUserUrl;
    }
    return loggedInUser.url === undefined ? null : loggedInUser.url;
  };

  render() {
    const effectiveUserUrl = this.getEffectiveUserUrl();
    if (effectiveUserUrl === null) {
      return null;
    }

    return (
      <div>
        {this.props.navbar}
        {this.props.loading ? null : (
          <ITARegisterTabs
            workshopUrl={this.props.workshop.url}
            userUrl={effectiveUserUrl}
            registrationFees={this.props.registrationFees}
            loggedInUser={this.props.loggedInUser}
            loggedInAsAdmin={this.props.loggedInUser.admin}
          />
        )}
      </div>
    );
  }
}
