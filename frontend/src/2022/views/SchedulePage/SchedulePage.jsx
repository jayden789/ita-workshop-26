import React from 'react';

import { TabContent,  } from 'reactstrap';
import * as dateFns from 'date-fns';

import ScheduleDay from './ScheduleDay';
import { formatData } from './ScheduleHelpers';
import { scheduleData } from './schedule-14';

import {
  TalkDetailModal,
} from './TalkDetailModal';

const talkData = scheduleData['talks'];
const sessionData = scheduleData['sessions'];
const scheduleDayIds = scheduleData['schedule_list'];
const trackData = scheduleData['tracks'];
const dayData = {
  d_1: {
    id: 'd_1',
    title: 'Monday',
    tracks: ['tr_1', 'tr_2', 'tr_3', 'tr_4', 'tr_5', 'tr_6'],
  },
  d_2: {
    id: 'd_2',
    title: 'Tuesday',
    tracks: ['tr_7', 'tr_8', 'tr_9', 'tr_10', 'tr_11', 'tr_12'],
  },
  d_3: {
    id: 'd_3',
    title: 'Wednesday',
    tracks: ['tr_13', 'tr_14', 'tr_15', 'tr_16', 'tr_17', 'tr_18'],
  },
  d_4: {
    id: 'd_4',
    title: 'Thursday',
    tracks: ['tr_19', 'tr_20', 'tr_21', 'tr_22', 'tr_23', 'tr_24'],
  },
  d_5: {
    id: 'd_5',
    title: 'Friday',
    tracks: ['tr_25', 'tr_26', 'tr_27', 'tr_28', 'tr_29', 'tr_30'],
  },
};

/**
 * Returns an array of `numTalks`-many Date objects, the first of which is
 * `start`, and where each element is 20 minutes after the previous element.
 */
const talksTimeSequence = (start, numTalks) => {
  const sequence = [start];
  for (let i = 0; i < numTalks - 1; i++) {
    sequence.push(dateFns.addMinutes(sequence[i], 20));
  }
  return sequence;
};

const talksTimeSequenceGradTalks = (start, numTalks) => {
  const sequence = [start];
  for (let i = 0; i < numTalks - 1; i++) {
    sequence.push(dateFns.addMinutes(sequence[i], 10));
  }
  return sequence;
};

/** Constructs a Date object with the given hour and minute. */
const timeToDate = (hour, minute) => new Date(1970, 0, 1, hour, minute, 0);

// Row time values, which are the same for Mon/Tue/Thu
const rowTimeValuesMTTh = [
  // Room names
  null,
  // 4 talks at 9:00
  null,
  ...talksTimeSequence(timeToDate(9, 0), 4),
  // 4 talks at 10:40
  null,
  ...talksTimeSequence(timeToDate(10, 40), 4),
  // 3 talks at 15:10
  null,
  ...talksTimeSequence(timeToDate(15, 10), 3),
  // 3 talks at 16:30
  null,
  ...talksTimeSequence(timeToDate(16, 30), 3),
];

const rowTimeValues = [
  [
    // Room names
    null,
    // Grad day
    null,
    ...talksTimeSequence(timeToDate(10, 0), 3),
    null,
    ...talksTimeSequence(timeToDate(11, 20), 3),
    null,
    ...talksTimeSequence(timeToDate(14, 50), 4),
    null,
    ...talksTimeSequence(timeToDate(16, 30), 3),
  ], // Monday
  rowTimeValuesMTTh, // Tuesday
  // Wednesday
  [
    // Room names
    null,
    // Grad day
    null,
    ...talksTimeSequence(timeToDate(9, 0), 3),
    null,
    ...talksTimeSequenceGradTalks(timeToDate(10, 20), 4),
    null,
    ...talksTimeSequenceGradTalks(timeToDate(11, 20), 4),
    // // Grad day lunch and posters
    // timeToDate(12, 0),
    // ...Array(4).fill(null),
    // timeToDate(12, 0),
    // ...Array(3).fill(null),
  ],
  [
    // Room names
    null,
    // 4 talks at 9:00
    null,
    ...talksTimeSequence(timeToDate(9, 0), 4),
    // 4 talks at 10:40
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    // 3 talks at 15:10
    null,
    ...talksTimeSequence(timeToDate(15, 10), 3),
    // 3 talks at 16:30
    null,
    ...talksTimeSequence(timeToDate(16, 30), 4),
  ], // Thursday
  // Friday
  [
    // Room names
    null,
    null,
    // 4 talks at 10:40
    // Student posters at 12:00
    ...talksTimeSequence(timeToDate(9, 0), 4),
    // 3 talks at 13:40
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    // 3 talks at 15:00
    timeToDate(12, 0),
    null,null,null,null,null,null,null,
    ...talksTimeSequence(timeToDate(15, 5), 4),
  ],
];

export default class SchedulePage2020 extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      scheduleList: [],
      formattedList: {},
      talkList: {},
      sessionList: {},
      trackList: {},
      dayList: {},
      talkModalTalk: false,
      talkModalOpen: null,

    };
    this.isEmpty = this.isEmpty.bind(this);
    this.onToggleTalkModal = this.onToggleTalkModal.bind(this);
  }

  onToggleTalkModal = () => {
    this.setState(prevState => ({
      talkModalOpen: !prevState.talkModalOpen,
    }));
  };

  onClickTitleForTalk = talk => () => {
    this.setState({
      talkModalOpen: true,
      talkModalTalk: talk,
    });
  };

  componentDidMount() {
    // TODO @ALEX make the api call
    let listday = formatData(scheduleDayIds, dayData, trackData, sessionData);
    this.setState({
      formattedList: listday,
      talkList: talkData,
      sessionList: sessionData,
      scheduleList: scheduleDayIds,
      trackList: trackData,
      dayList: dayData,
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab['index'].toString(),
      });
    }
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  render() {
    let days = this.state.scheduleList;

    let dayContents = days.map((day, dayIndex) => {
      if (!this.isEmpty(this.state.formattedList)) {
        let scheduleday = this.state.formattedList[day];
        
        return (
          <ScheduleDay
            rowTimeValues={rowTimeValues[dayIndex]}
            scheduleday={scheduleday}
            talkList={this.state.talkList}
            sessionList={this.state.sessionList}
            trackList={this.state.trackList}
            dayList={this.state.dayList}
            key={dayIndex}
            isWednesday={dayIndex === 2}
            onClickTitleForTalk={this.onClickTitleForTalk}

          />
        );
      } else {
        return <p key={dayIndex}>Loading...</p>;
      }
    });

    return (
      <div>
        {this.props.navbar}
        {this.state.loading ? null : (
          <div>
            {/*
            <Nav tabs>{daysTabs}</Nav>
            */}
            <TabContent activeTab={this.state.activeTab}>
              <div style={{ 'marginTop': '60px' }} />
              {dayContents}
            </TabContent>
            <TalkDetailModal
              talk={this.state.talkModalTalk}
              isOpen={this.state.talkModalOpen}
              onToggleModal={this.onToggleTalkModal}
            />
          </div>
        )}
      </div>
    );
  }
}
