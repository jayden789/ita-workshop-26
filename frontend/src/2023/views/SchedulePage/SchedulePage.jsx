import React from 'react';

import { TabContent,  } from 'reactstrap';
import * as dateFns from 'date-fns';

import ScheduleDay from './ScheduleDay';
import { formatData } from './ScheduleHelpers';
import { scheduleData } from './schedule-23';
import { api } from '../../../../src/helpers'
import * as constants from './constants';


import {
  TalkDetailModal,
} from './TalkDetailModal';

const talkData = scheduleData['talks'];
const sessionData = scheduleData['sessions'];
const scheduleDayIds = scheduleData['schedule_list'];
const trackData = scheduleData['tracks'];
const dayData = {
  1: {
    id: '1',
    title: 'Monday',
    tracks: ['tr_1','tr_2'],
  },
  2: {
    id: '2',
    title: 'Tuesday',
    tracks: ['tr_3','tr_4'],
  },
  3:{
    id: '3',
    title: 'Wednesday',
    tracks: ['tr_5','tr_6'],
  },
  4: {
    id: '4',
    title: 'Thursday',
    tracks: ['tr_7','tr_8'],
  },
  5: {
    id: '5',
    title: 'Friday',
    tracks: ['tr_9','tr_10'],
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
  // null,
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
    // null,
    // Grad day
    null,
    ...talksTimeSequence(timeToDate(9, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    null,
    ...talksTimeSequence(timeToDate(15, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(16, 30), 3),
  ], // Monday
  [
    // Room names
    // null,
    // Grad day
    null,
    ...talksTimeSequence(timeToDate(9, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    null,
    ...talksTimeSequence(timeToDate(15, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(16, 40), 3),
  ],// Tuesday
  [
    // Room names
    // null,
    // Grad day
    null,
    ...talksTimeSequence(timeToDate(9, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    ...talksTimeSequence(timeToDate(12, 0), 1),
    // ...talksTimeSequence(timeToDate(15, 0), 4),
    // null,
    // ...talksTimeSequence(timeToDate(16, 40), 4),
  ],// Wednesday
  [
    // Room names
    //null,
    // Grad day
    null,
    ...talksTimeSequence(timeToDate(9, 0), 4),
    null,
    ...talksTimeSequence(timeToDate(10, 40), 3),
    null,
    ...talksTimeSequence(timeToDate(15, 10), 4),
    null,
    ...talksTimeSequence(timeToDate(16, 50), 4),
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
    ...talksTimeSequence(timeToDate(9, 0), 4),
    // 4 talks at 10:40
    null,
    ...talksTimeSequence(timeToDate(10, 40), 4),
    // 3 talks at 15:10
    null,
    ...talksTimeSequence(timeToDate(15, 30), 4),
    // 3 talks at 16:30
    ...talksTimeSequence(timeToDate(12, 0), 1),
    // ...talksTimeSequence(timeToDate(16, 10), 3),
  ], // Thursday
  // Friday
  [
    // Room names
   // null,
    null,
    // 4 talks at 10:40
    // Student posters at 12:00
    ...talksTimeSequence(timeToDate(10, 30), 4),
    // 3 talks at 13:40
    null,
    ...talksTimeSequence(timeToDate(13, 30), 4),
    // 3 talks at 15:00
  ],
];

export default class SchedulePage2023 extends React.Component {
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

  parseData=()=>{
    console.log('as');
    console.log(this.props.schedule);
    console.log(this.props.loadSchedule);

    let events = this.props.schedule.events ;
    return null;
  }


  componentDidMount() {
    // TODO @ALEX make the api call
    let alexData = {};
    alexData['talks'] = {};
    alexData['sessions'] = {};
    alexData['tracks'] = {};
    alexData['days'] = {};
    let daysHC = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ]
    
    // {/*
    api('api/v0/mobile/schedule').then(schedule =>{
      let talk_index = 0;
      schedule.events.forEach((dayData,di)=>{
        let dayObj = {}
        dayObj.tracks = []
        dayObj.id = `${di}`
        dayObj.title = daysHC[di];
        dayData.forEach((roomData,ri)=>{
          let trackObj = {}
          trackObj.id = `${di}_${ri}`
          trackObj.sessions = []
          roomData.forEach((sessionData,si)=>{
            let sessionObj = {}
            sessionObj.title = sessionData.title;
            sessionObj.chair = sessionData.chair;
            sessionObj.room = schedule.rooms[ri];
            sessionObj.talks = [];
            // console.log(JSON.stringify(sessionData))
            if(sessionData.talks!==undefined){
              try{
                sessionData['talks'].forEach((talkData,ti)=>{
                  let alexTalkFormat = {
                    "id": talk_index,
                    "title": talkData.title,
                    "abstract": talkData.abstract,
                    "topic_comment": "Game Theory",
                    "scheduling_comment": talkData.time,
                    "author": talkData.authors,
                    "authors_comment": talkData.authors,
                    "room_name": schedule.rooms[ri],              
                  }
                  alexData['talks'][talk_index] = alexTalkFormat;
                  sessionObj.talks.push(talk_index);
                  talk_index+=1
                });
              }catch(e){
                console.log(sessionData['talks'])
              }
            }
            let sessionIdentifier = 's'
            if(sessionData.lunch){
               sessionIdentifier = 'e';
            }
            else if(sessionData.plenary){
              sessionIdentifier = 'p';
            }
            if(sessionData['talks'].length>0 && sessionIdentifier==='s'){
            alexData['sessions'][`${sessionIdentifier}_${di}_${ri}_${si}`] = sessionObj;
            trackObj.sessions.push(`${sessionIdentifier}_${di}_${ri}_${si}`)
            }
          })
          alexData.tracks[`tr_${di}_${ri}`] = trackObj
          dayObj.tracks.push(`tr_${di}_${ri}`);
        })
        alexData.days[`${di}`] =  dayObj;
      });
      alexData.tracks.tr_4_0.sessions = [ "s_4_0_1", "s_4_0_3","s_4_0_9", "s_4_0_8" ]
      let listday = formatData([
        "0",
        "1",
        "2",
        "3",
        "4"
      ], alexData.days, alexData.tracks, alexData.sessions);

      // listday[0].talks.splice(listday[0].talks.lenth-(4*5),0,{"type":constants.HARDCODED_EVENT,"event":"Breakfast (8:00 - 9:00)"})
        

      this.setState({
        formattedList: listday,
        talkList: alexData.talks,
        sessionList: alexData.sessions,
        scheduleList: [
          "0",
          "1",
          "2",
          "3",
          "4"
        ],
        trackList: alexData.tracks,
        dayList: alexData.days,
        // scheduleAPI: schedule
      });
      console.log('Alex Data',alexData)
  
    });
    // console.log(this.props.schedule.days)

  // */}

{/*
    let listday = formatData(scheduleDayIds, dayData, trackData, sessionData);
    this.setState({
      formattedList: listday,
      talkList: talkData,
      sessionList: sessionData,
      scheduleList: scheduleDayIds,
      trackList: trackData,
      dayList: dayData,
    });
  */}
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
        console.log(scheduleday)
        
        return (
          <div>
          {/* <this.parseData/> */}
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
          </div>
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
