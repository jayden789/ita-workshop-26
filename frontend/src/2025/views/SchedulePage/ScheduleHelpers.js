/* Input: json file from api call of schedule
Output: well formatted data
daylist
oarams scheduleList, , trackList, sessionList
*/
import * as constants from './constants';
import data from './schedule-2025.json';

function transpose(a) {
  return (
    (a &&
      a.length &&
      a[0].map &&
      a[0].map(function (_, c) {
        return a.map(function (r) {
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
      let track = tracks?.[days[id]['tracks'][j]?.toString()];
      if (!track) break;
      let sessionlist = track['sessions'];
      let day = [];
      for (let k = 0; k < sessionlist.length; k++) {
        if (sessionlist[k] === null) continue;
        day.push(sessionlist[k]);
        day = day.concat(sessions[sessionlist[k]]['talks']);
      }
      talks.push(day);
    }

    let tmp = [];
    talks = transpose(talks);
    talks.forEach((arr) => {
      let set = new Set(arr);
      if (
        !(
          set.size === 2 &&
          [...set].every((x) => new Set(['', undefined]).has(x))
        )
      ) {
        tmp.push(arr);
      }
    });
    talks = tmp;

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
        if (talks[i][0].toString().charAt(0) === 'e') {
          type = constants.HARDCODED_EVENT;
        }
        if (talks[i][0].toString().charAt(0) === 'p') {
          type = constants.HARDCODED_EVENT;
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
    formattedTalks.unshift({
      type: constants.ROOM_TYPE,
      time: '',
      event: ['George', 'Abe', 'Jack', 'Eva', 'Cory'],
    });

    formattedList[id] = {
      id: id,
      title: title,
      talks: formattedTalks,
    };
  }

  return formattedList;
};

const insertSessionIntoTracks = (session, tracks, trackId, sessionNo) => {
  if (tracks[trackId].sessions[sessionNo - 1] === null) {
    tracks[trackId].sessions[sessionNo - 1] = session;
  }
};

export function convertJSONToFormat() {
  const tracks = {};
  const sessions = {};
  const talks = {};

  data.forEach((talk, idx) => {
    talks[(idx + 1).toString()] = {
      id: idx + 1,
      title: talk.paperTitle,
      abstract: talk.abstract,
      topic_comment: talk.topicComments,
      scheduling_comment: talk.schedulingComments,
      author: talk.firstName + ' ' + talk.lastName,
      authors_comment: talk.topicComments,
    };
  });

  for (let i = 1; i <= 25; ++i) {
    const trackId = `tr_${i}`;
    tracks[trackId] = {
      id: trackId,
      sessions: [null, null, null],
    };
  }

  for (let i = 1; i <= 100; ++i) {
    const sessionId = `s_${i}`;
    sessions[sessionId] = {
      id: sessionId,
      title: '',
      talks: [],
    };
  }

  data.forEach((talk, idx) => {
    const metadata = talk.metadata;
    if (metadata.length == 0) return;
    const flags = metadata.split('-');
    if (flags.length < 3) return;
    const day = flags[0];

    const track = Number(flags[1]);
    const trackNumber = 5 * (constants.dayToNumber[day] - 1) + track;
    const trackId = `tr_${trackNumber}`;
    // tracks[trackId]

    const session = Number(flags[2]);
    const sessionNumber =
      20 * (constants.dayToNumber[day] - 1) + 5 * (session - 1) + track;
    const sessionId = `s_${sessionNumber}`;
    const talkNumber = flags[3];

    sessions[sessionId].talks.push(idx + 1);
    sessions[sessionId].title = talk.scheduled;

    insertSessionIntoTracks(sessionId, tracks, trackId, session);
  });

  const unusedSessions = Object.keys(sessions).filter(
    (key) => sessions[key].title.length === 0
  );

  let idx = 0;
  for (let i = 1; i <= 25; ++i) {
    const trackId = `tr_${i}`;
    for (let j = 0; j < tracks[trackId].sessions.length; ++j) {
      if (!tracks[trackId].sessions[j]) {
        tracks[trackId].sessions[j] = unusedSessions[idx++];
      }
    }
  }

  let listday = formatData(
    constants.scheduleList,
    constants.dayList,
    tracks,
    sessions
  );

  return {
    listday,
    tracks,
    sessions,
    dayList: constants.dayList,
    scheduleList: constants.scheduleList,
    talks,
  };
}
