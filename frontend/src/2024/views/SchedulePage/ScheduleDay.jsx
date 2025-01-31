import React from 'react';
import { Table } from 'reactstrap';
import * as dateFns from 'date-fns';
import classNames from 'classnames';

import * as constants from './constants';
import styles from './ScheduleDay.module.css';

const normalizeTalkTitle = (title) => {
  // Strip off case-insensitive prefixes of the form "[GD_label]" with any
  // number of following spaces, for labels "poster" and "talk".
  const gradDayPrefix = /^\[gd_(poster|talk)\] */gi;
  return title.replace(gradDayPrefix, '');
};

/** Formats a Date object as just the time, like 3:00 PM or 10:00 AM. */
const formatTime = (date) =>
  date === null ? '' : dateFns.format(date, 'h:mm A');

const authorBool = (talk) => {
  if (talk.hasOwnProperty('authors_comment') === false) {
    return false;
  } else {
    let match = talk['authors_comment'].match(/\*/g);
    return talk['authors_comment'] === '' || match === null || match.length > 1;
  }
};
export default class ScheduleDay extends React.Component {
  render() {
    // TODO: Change hard-coded values
    let sessionChair = {
      'Wireless Communication I': 'Nicolo Michelusi',
    };
    let talkList = this.props.talkList;
    let sessionList = this.props.sessionList;
    let trackList = this.props.trackList;
    const rowTimeLabels = this.props.rowTimeValues.map(formatTime);
    let dayTable = this.props.scheduleday['talks'].map((day, index) => {
      if (
        day['type'] === constants.EVENT_TYPE ||
        day['type'] === constants.PLENARY_TYPE
      ) {
        return (
          <tr key={index}>
            {/* <td>{day['time']}</td> */}
            <td>{rowTimeLabels[index]}</td>
            <td colSpan={constants.MAX_TRACKS}>{day['event'][0]}</td>
          </tr>
        );
      } else if (day['type'] === constants.HARDCODED_EVENT) {
        return (
          <tr key={index}>
            {/* <td>{day['time']}</td> */}
            {/* <td>{rowTimeLabels[index]}</td>
            <td colSpan={constants.MAX_TRACKS}>{day['event']}</td> */}
          </tr>
        );
      } else if (day['type'] === constants.TALK_TYPE) {
        return (
          <tr className={classNames(styles.grey)} key={index}>
            {/* <td>{day['time']}</td> */}
            <td className="col-sm-1 ">{rowTimeLabels[index]}</td>
            {day['event'].map((talk, index) => {
              if (talkList[talk]) {
                console.log(talkList[talk]);
                return (
                  <td
                    key={index}
                    onClick={this.props.onClickTitleForTalk(talkList[talk])}
                    className={styles.talkTableCell}
                  >
                    <strong className={classNames(styles.blue)}>
                      {talkList[talk]['title'] === 'nan'
                        ? ''
                        : normalizeTalkTitle(talkList[talk]['title'])}
                    </strong>
                    <p className={classNames(styles.grey)}>
                      {talkList[talk]['author'] == 'nan'
                        ? ''
                        : authorBool(talkList[talk])
                        ? talkList[talk]['author']
                        : talkList[talk]['authors_comment']}
                    </p>
                  </td>
                );
              } else {
                return (
                  <td key={index}>
                    <strong className={classNames(styles.blue)}>
                      {talk != 'undefined' ? talk : ''}
                    </strong>
                  </td>
                );
              }
            })}
          </tr>
        );
      } else if (day['type'] === constants.SESSION_TYPE) {
        const sessionTitleCells = day['event'].map((talk, index) => {
          if (sessionList[talk]) {
            // TODO get titles corrected
            const sessionTitle = sessionList[talk]['title'];
            return (
              <td className="col-md-auto" key={index}>
                <strong className={classNames(styles.yellow)}>
                  {sessionTitle === 'title' ? '' : sessionTitle}
                </strong>
                <p>
                  <strong style={{ color: 'white', fontSize: '15px' }}>
                    {/* {sessionChair[sessionTitle] ? 'Chair: '+sessionChair[sessionTitle]:''} */}
                    {sessionList[talk]['chair'] &&
                    sessionTitle !== 'Graduation Day Posters' &&
                    sessionTitle !== 'Student Posters'
                      ? 'Chair: ' + sessionList[talk]['chair']
                      : sessionTitle === 'Graduation Day Posters' ||
                        sessionTitle === 'Student Posters'
                      ? 'Location: Mac (outdoor terrace between towers 1 and 3)'
                      : ''}
                  </strong>
                  <br></br>
                  {sessionList[talk]['room'] &&
                  sessionTitle !== 'Graduation Day Posters' &&
                  sessionTitle !== 'Student Posters'
                    ? 'Room: ' + sessionList[talk]['room']
                    : ''}
                </p>
              </td>
            );
          } else {
            return (
              <td key={index}>
                <strong className={classNames(styles.yellow)}>
                  {talk != 'undefined' ? talk : ''}
                </strong>
              </td>
            );
          }
        });
        const gradDayHeaderCells = (
          <td
            colSpan={constants.MAX_TRACKS}
            className={styles.yellow}
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Graduation Day Lunch and Posters
          </td>
        );

        // This is pretty bad, but we don't have an indicator for this in the
        // schedule data format, so...
        const isGradDayRow = this.props.isWednesday && [10, 16].includes(index);

        return (
          <tr className={classNames(styles.grey)} key={index}>
            {/* <td>{day['time']}</td> */}
            <td className="col-md-auto">{rowTimeLabels[index]}</td>
            {sessionTitleCells}
          </tr>
        );
      } else if (day['type'] === constants.TRACK_TYPE) {
        return (
          <tr className={classNames(styles.grey)} key={index}>
            {/* <td>{day['time']}</td> */}
            <td>{rowTimeLabels[index]}</td>
            {day['event'].map((talk, index) => {
              if (trackList[talk]) {
                return <td key={index}>{trackList[talk]['title']}</td>;
              } else {
                return <td key={index}>{talk}</td>;
              }
            })}
          </tr>
        );
      } else if (day['type'] === constants.ROOM_TYPE) {
        return (
          <tr className={classNames(styles.light_blue)} key={index}>
            {/* <td>{day['time']}</td> */}
            <td>{rowTimeLabels[index]}</td>
            {day['event'].map((talk, index) => {
              if (trackList[talk]) {
                return <td key={index}>{trackList[talk]['title']}</td>;
              } else {
                return (
                  <td key={index}>
                    <strong>{talk}</strong>
                  </td>
                );
              }
            })}
          </tr>
        );
      } else {
        return (
          <tr className={classNames(styles.grey)} key={index}>
            <td>{day['time']}</td>
            {/* <td>{day['time']}</td> */}
            <td>{rowTimeLabels[index]}</td>
            {day['event'].map((talk, index) => {
              return <td key={index}>{talk}</td>;
            })}
          </tr>
        );
      }
    });

    return (
      <React.Fragment>
        <h2 className="ml-2" id={this.props.scheduleday.id}>
          {this.props.scheduleday.title}
        </h2>
        <Table dark className={styles.dayTable}>
          <tbody>{dayTable}</tbody>
        </Table>
      </React.Fragment>
    );
  }
}
