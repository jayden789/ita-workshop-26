import React from 'react';

import { Alert, TabContent } from 'reactstrap';
import * as dateFns from 'date-fns';

import ScheduleDay from './ScheduleDay';
import { convertJSONToFormat, formatData } from './ScheduleHelpers';
import { api } from '../../../../src/helpers';

import { TalkDetailModal } from './TalkDetailModal';

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

/** Constructs a Date object with the given hour and minute. */
const timeToDate = (hour, minute) => new Date(1970, 0, 1, hour, minute, 0);

const rowTimeValues = [
  [
    // Room names
    // null,
    // Grad day
    null,
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    null,
    ...talksTimeSequence(timeToDate(14, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(15, 40), 4),
  ], // Monday
  [
    // Room names
    // null,
    // Grad day
    null,
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    null,
    ...talksTimeSequence(timeToDate(14, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(15, 40), 4),
  ], // Tuesday
  [
    // Room names
    // null,
    // Grad day
    null,
    null,
    ...talksTimeSequence(timeToDate(9, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),

    // ...talksTimeSequence(timeToDate(15, 0), 4),
    // null,
    // ...talksTimeSequence(timeToDate(16, 40), 4),
  ], // Wednesday
  [
    // Room names
    //null,
    // Grad day
    null,
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    null,
    ...talksTimeSequence(timeToDate(14, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(15, 40), 4),
    // // Grad day lunch and posters
    // timeToDate(12, 0),
    // ...Array(4).fill(null),
    // timeToDate(12, 0),
    // ...Array(3).fill(null),
  ],
  [
    // Room names
    // null,
    // 4 talks at 9:00
    null,
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    null,
    ...talksTimeSequence(timeToDate(14, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(15, 40), 4),
    // ...talksTimeSequence(timeToDate(16, 10), 3),
  ], // Thursday
  // Friday
  [
    // Room names
    // null,
    null,
    null,
    ...talksTimeSequence(timeToDate(10, 30), 4),
    null,
    ...talksTimeSequence(timeToDate(13, 20), 4),
    null,
    ...talksTimeSequence(timeToDate(15, 0), 3),
    // 3 talks at 15:00
  ],
];

export default class SchedulePage2026 extends React.Component {
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
      scheduleAPI: {},
    };
    this.isEmpty = this.isEmpty.bind(this);
    this.onToggleTalkModal = this.onToggleTalkModal.bind(this);
  }

  onToggleTalkModal = () => {
    this.setState((prevState) => ({
      talkModalOpen: !prevState.talkModalOpen,
    }));
  };

  onClickTitleForTalk = (talk) => () => {
    this.setState({
      talkModalOpen: true,
      talkModalTalk: talk,
    });
  };

  parseData = () => {
    let events = this.props.schedule.events;
    return null;
  };

  componentDidMount() {
    // TODO @ALEX make the api call
    let alexData = {};
    alexData['talks'] = {};
    alexData['sessions'] = {};
    alexData['tracks'] = {};
    alexData['days'] = {};
    let daysHC = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // {/*
    // api('api/v0/mobile/schedule').then(schedule =>{
    //   let talk_index = 0;
    //   schedule.events.forEach((dayData,di)=>{
    //     let dayObj = {}
    //     dayObj.tracks = []
    //     dayObj.id = `${di}`
    //     dayObj.title = daysHC[di];
    //     dayData.forEach((roomData,ri)=>{
    //       let trackObj = {}
    //       trackObj.id = `${di}_${ri}`
    //       trackObj.sessions = []
    //       roomData.forEach((sessionData,si)=>{
    //         let sessionObj = {}
    //         sessionObj.title = sessionData.title;
    //         sessionObj.chair = sessionData.chair;
    //         sessionObj.room = schedule.rooms[ri];
    //         sessionObj.talks = [];
    //         // console.log(JSON.stringify(sessionData))
    //         if(sessionData.talks!==undefined){
    //           try{
    //             sessionData['talks'].forEach((talkData,ti)=>{
    //               let alexTalkFormat = {
    //                 "id": talk_index,
    //                 "title": talkData.title,
    //                 "abstract": talkData.abstract,
    //                 "topic_comment": "Game Theory",
    //                 "scheduling_comment": talkData.time,
    //                 "author": talkData.authors,
    //                 "authors_comment": talkData.authors,
    //                 "room_name": schedule.rooms[ri],
    //               }
    //               alexData['talks'][talk_index] = alexTalkFormat;
    //               sessionObj.talks.push(talk_index);
    //               talk_index+=1
    //             });
    //           }catch(e){
    //             console.log(sessionData['talks'])
    //           }
    //         }
    //         let sessionIdentifier = 's'
    //         if(sessionData.lunch){
    //            sessionIdentifier = 'e';
    //         }
    //         else if(sessionData.plenary){
    //           sessionIdentifier = 'p';
    //         }
    //         if(sessionData['talks'].length>0 && sessionIdentifier==='s'){
    //         alexData['sessions'][`${sessionIdentifier}_${di}_${ri}_${si}`] = sessionObj;
    //         trackObj.sessions.push(`${sessionIdentifier}_${di}_${ri}_${si}`)
    //         }
    //       })
    //       alexData.tracks[`tr_${di}_${ri}`] = trackObj
    //       dayObj.tracks.push(`tr_${di}_${ri}`);
    //     })
    //     alexData.days[`${di}`] =  dayObj;
    //   });
    //   alexData.tracks.tr_4_0.sessions = [ "s_4_0_1", "s_4_0_3","s_4_0_9", "s_4_0_8" ]
    //   let listday = formatData([
    //     "0",
    //     "1",
    //     "2",
    //     "3",
    //     "4"
    //   ], alexData.days, alexData.tracks, alexData.sessions);

    //   // listday[0].talks.splice(listday[0].talks.lenth-(4*5),0,{"type":constants.HARDCODED_EVENT,"event":"Breakfast (8:00 - 9:00)"})

    //   this.setState({
    //     formattedList: listday,
    //     talkList: alexData.talks,
    //     sessionList: alexData.sessions,
    //     scheduleList: [
    //       "0",
    //       "1",
    //       "2",
    //       "3",
    //       "4"
    //     ],
    //     trackList: alexData.tracks,
    //     dayList: alexData.days,
    //     // scheduleAPI: schedule
    //   });
    //   console.log('Alex Data',alexData)

    // });
    // console.log(this.props.schedule.days)
    const { listday, dayList, scheduleList, sessions, tracks, talks } =
      convertJSONToFormat();
    this.setState({
      formattedList: listday,
      talkList: talks,
      sessionList: sessions,
      scheduleList: scheduleList,
      trackList: tracks,
      dayList,
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
          <div key={dayIndex}>
            {/* <this.parseData/> */}
            <ScheduleDay
              rowTimeValues={rowTimeValues[dayIndex]}
              scheduleday={scheduleday}
              talkList={this.state.talkList}
              sessionList={this.state.sessionList}
              trackList={this.state.trackList}
              dayList={this.state.dayList}
              isWednesday={dayIndex === 2}
              onClickTitleForTalk={this.onClickTitleForTalk}
            />
          </div>
        );
      } else {
        return <p key={dayIndex}>Loading...</p>;
      }
    });

    return (
      <div>
        COMING SOON
        {/* {this.props.navbar}
        {this.state.loading ? null : (
          <div>
            <Nav tabs>{daysTabs}</Nav>
            <TabContent activeTab={this.state.activeTab}>
              <div style={{ marginTop: '60px' }} />
              <div className="pl-4 pr-4 pt-2">
                <Alert color="primary">
                  Preliminary schedule. Your talk time may change within the
                  same day, but if we change the day, we'll contact you. If you
                  need a change, please email{' '}
                  <a href="mailto:ita@ucsd.edu">ita@ucsd.edu</a>. There are
                  still some available time slots, if you are interested in
                  speaking, please write us.
                </Alert>
              </div>
              {dayContents}
            </TabContent>
            <TalkDetailModal
              talk={this.state.talkModalTalk}
              isOpen={this.state.talkModalOpen}
              onToggleModal={this.onToggleTalkModal}
            />
          </div>
        )} */}
      </div>
    );
  }
}
