export const EVENT_TYPE = 'event';
export const PLENARY_TYPE = 'plenary_talk';
export const SESSION_TYPE = 'session_header';
export const ROOM_TYPE = 'room_header';
export const TALK_TYPE = 'talks_row';
export const TRACK_TYPE = 'track_header';
export const MAX_TRACKS = 6;
export const MAX_EVENT = 2;
export const HARDCODED_EVENT = 'hardcoded';

export const dayList = {
  1: {
    id: '1',
    title: 'Monday',
    tracks: ['tr_1', 'tr_2', 'tr_3', 'tr_4', 'tr_5'],
  },
  2: {
    id: '2',
    title: 'Tuesday',
    tracks: ['tr_6', 'tr_7', 'tr_8', 'tr_9', 'tr_10'],
  },
  3: {
    id: '3',
    title: 'Wednesday',
    tracks: ['tr_11', 'tr_12', 'tr_13', 'tr_14', 'tr_15'],
  },
  4: {
    id: '4',
    title: 'Thursday',
    tracks: ['tr_16', 'tr_17', 'tr_18', 'tr_19', 'tr_20'],
  },
  5: {
    id: '5',
    title: 'Friday',
    tracks: ['tr_21', 'tr_22', 'tr_23', 'tr_24', 'tr_25'],
  },
};

export const scheduleList = ['1', '2', '3', '4', '5'];

export const tracksids = ['tr_1', 'tr_2', 'tr_3', 'tr_4', 'tr_5'];

export const dayToNumber = {
  M: 1,
  T: 2,
  W: 3,
  R: 4,
  F: 5,
};
