import React from 'react';
import { Container, Card } from 'reactstrap';
import CsvDownloader from 'react-csv-downloader';

import {
  api,
  fetchPaginatedRegistrations,
  fetchRegnOptions,
  generateRegnOptionConversions,
} from '../../../helpers';
import * as ita24Regn from '../../../models/ita24/Registration';
import RegistrationTable from './RegistrationTable';

const intDivRoundUp = (a, b) => {
  const quotient = Math.floor(a / b);
  const remainder = a % b;
  return quotient + (remainder === 0 ? 0 : 1);
};

function flatten(data) {
  var result = {};
  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop + '[' + i + ']');
      if (l == 0) result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], p);
      }
      if (isEmpty && prop) result[prop] = {};
    }
  }
  recurse(data, '');
  return result;
}

const dayToCompact = day =>
  ({
    '2025-02-09': 'S',
    '2025-02-10': 'M',
    '2025-02-11': 'T',
    '2025-02-12': 'W',
    '2025-02-13': 'R',
    '2025-02-14': 'F',
  }[day]);
  
const compactDaysAttending = days =>
  days
    .slice()
    .sort()
    .map(dayToCompact)
    .join('');

function flatten1(reg) {
  var temp_reg = {... reg}
  temp_reg.attendingDates = compactDaysAttending(temp_reg.attendingDates);
  var temp = flatten(temp_reg);
  if (!temp instanceof Array) {
    console.log('Inside temp');
    var temp_array = [];
    temp_array.push(temp);
    console.log('temp:' + JSON.stringify(temp_array));
    return temp_array;
  }
  return temp;
}

export default class PresentersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingRegnOptions: true,
      loadingRegns: true,
      loadingInviters: true,
      numTotalPages: 0,
      registrations: [],
      regnOptionUrlToSlugMap: new Map(),
      inviterUrlToObjectMap: new Map(),
    };
  }

  componentDidMount() {
    fetchRegnOptions().then((regnOptions) => {
      const { urlToSlugMap } = generateRegnOptionConversions(regnOptions);
      this.setState({
        regnOptionUrlToSlugMap: urlToSlugMap,
        loadingRegnOptions: false,
      });
    });

    api('api/v0/inviters/').then((inviters) => {
      const urlToObjectMap = new Map(
        inviters.map((inviter) => [inviter.url, inviter])
      );
      this.setState({
        inviterUrlToObjectMap: urlToObjectMap,
        loadingInviters: false,
      });
    });
  }

  fetchRegnData = (state, instance) => {
    const { page, pageSize } = state;
    new Promise((resolve) => this.setState({ loadingRegns: true }, resolve))
      // need to add 1 to page, since API is 1-indexed and react-table is
      // 0-indexed
      .then(() => fetchPaginatedRegistrations(page + 1, pageSize))
      .then(({ results, count: numTotalResults }) => {
        const registrations = results.map((result) =>
          ita24Regn.fromApiFormat(result, this.state.regnOptionUrlToSlugMap)
        );
        const presenters = [];
        for (var registration of registrations) {
          if (registration.presenting) {
            presenters.push(registration);
          }
        }
        var csvoutput = [];
        for (var registration of registrations) {
          if (registration.presenting) {
            csvoutput.push(flatten1(registration));
          }
        }
        console.log('presenters:' + presenters);
        const numTotalPages = intDivRoundUp(numTotalResults, pageSize);
        this.setState({
          csvoutput,
          presenters,
          numTotalPages,
          loadingRegns: false,
        });
      });
  };

  getInviterByUrl = (url) => this.state.inviterUrlToObjectMap.get(url);

  render = () => {
    const loadingAuxiliaryData =
      this.state.loadingRegnOptions || this.state.loadingInviters;
    const headers = [
      { displayName: 'Last name', id: 'last_name' },
      { displayName: 'First name', id: 'first_name' },
      { displayName: 'Title', id: 'honorific' },
      { displayName: 'Student?', id: 'is_student' },
      { displayName: 'Affiliation', id: 'affiliation' },
      { displayName: 'Email', id: 'email' },
      { displayName: 'Inviter', id: 'inviter' },
      { displayName: 'Invited?', id: 'registrantType' },
      { displayName: 'Status', id: 'participationStatus' },
      { displayName: 'Regn. #', id: 'registrantNumber' },
      { displayName: 'Days', id: 'attendingDates' },
      { displayName: 'Sunday reception', id: 'sundayReception' },
      { displayName: 'Monday lunch', id: 'mondayLunch' },
      { displayName: 'Banquet', id: 'banquetSelf' },
      { displayName: 'PTY', id: 'presenting' },
      { displayName: 'PBD', id: 'presenting_default' },
      { displayName: 'Title', id: 'title' },
      { displayName: 'Abstract', id: 'abstract' },
      { displayName: 'Scheduling comments', id: 'scheduling_comment' },
      { displayName: 'Topic comments', id: 'topic_comment' },
      { displayName: 'Fee type override', id: 'feeTypeOverride' },
      { displayName: 'Paid?', id: 'hasApprovedPayment' },
      { displayName: 'Paid amount', id: 'approvedPaymentsTotalAmount' },
    ];
    return (
      <Card body>
        <Container fluid={true}>
          {loadingAuxiliaryData ? (
            <p>Loading table...</p>
          ) : (
            <div>
              {this.state.loadingRegns ? (
                <p style={{ float: 'right', padding: 5 + 'px' }}>
                  Loading data...
                </p>
              ) : (
                <div style={{ float: 'right', padding: 5 + 'px' }}>
                  <CsvDownloader
                    filename="Presenter statistics"
                    separator="*"
                    wrapColumnChar=""
                    columns={headers}
                    datas={this.state.csvoutput}
                    text="Download Data"
                  />
                </div>
              )}
              <RegistrationTable
                registrations={this.state.presenters}
                numTotalPages={this.state.numTotalPages}
                loadingRegns={this.state.loadingRegns}
                onFetchData={this.fetchRegnData}
                getInviterByUrl={this.getInviterByUrl}
              />
            </div>
          )}
        </Container>
      </Card>
    );
  };
}
