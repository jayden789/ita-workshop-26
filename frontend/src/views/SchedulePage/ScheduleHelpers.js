/* Input: json file from api call of schedule
Output: well formatted data
daylist
oarams scheduleList, , trackList, sessionList
*/
import * as constants from './constants';

function transpose(a) {
  return (
    (a &&
      a.length &&
      a[0].map &&
      a[0].map(function(_, c) {
        return a.map(function(r) {
          return r[c];
        });
      })) ||
    []
  );
}

function checkEmpty(a) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== 0 && a[i] !== '' && a[i] !== '0') {
      return false;
    }
  }
  return true;
}

export const formatData = (schedule, days, tracks, sessions) => {
  //iterate through every day
  let formattedList = {};

  //make all session lengths the same
  let max = 0;
  for (let i in sessions) {
    if (max < sessions[i]['talks'].length) {
      max = sessions[i]['talks'].length;
    }
  }

  for (let i in sessions) {
    while (sessions[i]['talks'].length < max) {
      sessions[i]['talks'].push('');
    }
  }

  for (let i = 0; i < schedule.length; i++) {
    let id = schedule[i];
    let title = days[id]['title'];
    let talks = [];
    // populate talks with talks - create 2d array for every track then transpose
    // iterate through every track
    for (let j = 0; j < constants.MAX_TRACKS; j++) {
      let track = tracks[days[id]['tracks'][j].toString()];
      let sessionlist = track['sessions'];
      let day = [];
      for (let k = 0; k < sessionlist.length; k++) {
        day.push(sessionlist[k]);
        day = day.concat(sessions[sessionlist[k]]['talks']);
      }
      talks.push(day);
    }

    talks = transpose(talks);

    let formattedTalks = [];
    // create an array of objects holding talks
    // TODO @alex add times
    for (let i = 0; i < talks.length; i++) {
      if (!talks[i].map(String).every(checkEmpty)) {
        // TODO make more comprehensive check for session vs talk
        let type = constants.TALK_TYPE;
        if (talks[i][0].toString().charAt(0) === 's') {
          type = constants.SESSION_TYPE;
        }

        // Time is disabled until we have times
        formattedTalks.push({
          type: type,
          // time: 'TODO',
          time: '',
          event: talks[i].map(String),
        });
      }
    }

    // more bad habits
    if (days[id]["id"] === 'd_1') {
      formattedTalks.unshift({
        type: constants.ROOM_TYPE,
        time: '',
        event: ['ITA TIME', 'COMFORT CLASS', 'MODEL Z', 'GEN X', 'NEW WORLD', ''],
      });
    } else {
      formattedTalks.unshift({
        type: constants.ROOM_TYPE,
        time: '',
        event: ['ITA TIME', 'COMFORT CLASS', 'MODEL Z', 'GEN X', 'NEW WORLD', 'FAKE NEWS'],
      });
    }

    formattedList[id] = {
      id: id,
      title: title,
      talks: formattedTalks,
    };
  }

  return formattedList;
};
