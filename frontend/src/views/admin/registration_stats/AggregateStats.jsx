import React from 'react';
import { Card } from 'reactstrap';

export default class AggregateStats extends React.Component {
  renderParticipationSection = () => {
    const { participating, participating_and_paid, participating_and_unpaid } =
      this.props.stats.participation_counts;
    const { total_amount_paid } = this.props.stats;

    return (
      <React.Fragment>
        <li>
          Participating: {participating} ({participating_and_paid} paid,{' '}
          {participating_and_unpaid} unpaid)
        </li>
        <li>Total amount paid: ${total_amount_paid}</li>
      </React.Fragment>
    );
  };

  renderAttendingDatesSection = () => {
    const {
      '2025-02-09': sun,
      '2025-02-10': mon,
      '2025-02-11': tue,
      '2025-02-12': wed,
      '2025-02-13': thu,
      '2025-02-14': fri,
    } = this.props.stats.attending_date_counts;

    return (
      <li>
        Attending dates
        <ul>
          <li>
            Sun: {sun?.participating} ({sun?.paid} paid)
          </li>
          <li>
            Mon: {mon?.participating} ({mon?.paid} paid)
          </li>
          <li>
            Tue: {tue?.participating} ({tue?.paid} paid)
          </li>
          <li>
            Wed: {wed?.participating} ({wed?.paid} paid)
          </li>
          <li>
            Thu: {thu?.participating} ({thu?.paid} paid)
          </li>
          <li>
            Fri: {fri?.participating} ({fri?.paid} paid)
          </li>
        </ul>
      </li>
    );
  };

  renderSundayReceptionList = () => {
    const { notAttending, selfOnly, selfPlus1, selfPlus2, total } =
      this.props.stats.sunday_reception_counts;

    return (
      <li>
        Sunday reception: {total.participating} ({total.paid} paid)
        <ul>
          <li>
            Not attending: {notAttending.participating} ({notAttending.paid}{' '}
            paid)
          </li>
          <li>
            Self: {selfOnly.participating} ({selfOnly.paid} paid)
          </li>
          <li>
            Self+1: {selfPlus1.participating} ({selfPlus1.paid} paid)
          </li>
          <li>
            Self+2: {selfPlus2.participating} ({selfPlus2.paid} paid)
          </li>
        </ul>
      </li>
    );
  };

  renderMondayLunchList = () => {
    const { notAttending, attending } = this.props.stats.monday_lunch_counts;

    return (
      <li>
        Monday lunch: {attending.participating} ({attending.paid} paid)
        <ul>
          <li>
            Not attending: {notAttending.participating} ({notAttending.paid}{' '}
            paid)
          </li>
        </ul>
      </li>
    );
  };

  renderWednesdayBanquetList = () => {
    const { notAttending, selfOnly, selfPlus1, selfPlus2, total } =
      this.props.stats.wednesday_banquet_counts;

    return (
      <li>
        Wednesday banquet: {total.participating} ({total.paid} paid)
        <ul>
          <li>
            Not attending: {notAttending.participating} ({notAttending.paid}{' '}
            paid)
          </li>
          <li>
            Self: {selfOnly.participating} ({selfOnly.paid} paid)
          </li>
          <li>
            Self+1: {selfPlus1.participating} ({selfPlus1.paid} paid)
          </li>
          <li>
            Self+2: {selfPlus2.participating} ({selfPlus2.paid} paid)
          </li>
        </ul>
      </li>
    );
  };

  renderItaltList = () => {
    const { notAttending, attending } = this.props.stats.italt_counts;

    return (
      <li>
        ITALT: {attending.participating} ({attending.paid} paid)
        <ul>
          <li>
            Attending: {attending.participating} ({attending.paid} paid)
          </li>
          <li>
            Not attending: {notAttending.participating} ({notAttending.paid}{' '}
            paid)
          </li>
        </ul>
      </li>
    );
  };

  renderBanquetOptions = () => {
    const { Vegetarian, Chicken, Fish } = this.props.stats.banquet_options;

    return (
      <li>
        Banquet Options
        <ul>
          <li>Vegetarian: {Vegetarian}</li>
          <li>Chicken: {Chicken}</li>
          <li>Fish: {Fish}</li>
        </ul>
      </li>
    );
  };

  /* renderValentinesEventList = () => {
    const {
      notAttending,
      selfOnly,
      selfPlus1,
      selfPlus2,
      total
    } = this.props.stats.valentines_event_counts;

    return (
      <li>
        Valentine's event: {total.participating} ({total.paid} paid)
        <ul>
          <li>
            Not attending: {notAttending.participating} ({notAttending.paid}{' '}
            paid)
          </li>
          <li>
            Self: {selfOnly.participating} ({selfOnly.paid} paid)
          </li>
          <li>
            Self+1: {selfPlus1.participating} ({selfPlus1.paid} paid)
          </li>
          <li>
            Self+2: {selfPlus2.participating} ({selfPlus2.paid} paid)
          </li>
        </ul>
      </li>
    );
  };
 */
  render() {
    if (this.props.loading) {
      return <p>Loading aggregate statistics...</p>;
    }

    return (
      <Card body className="mt-3">
        <ul>
          {this.renderParticipationSection()}
          {this.renderAttendingDatesSection()}
          {this.renderSundayReceptionList()}
          {this.renderMondayLunchList()}
          {this.renderWednesdayBanquetList()}
          {/* {this.renderItaltList()} */}
          {this.renderBanquetOptions()}

          {/* {this.renderValentinesEventList()} */}
        </ul>
      </Card>
    );
  }
}
