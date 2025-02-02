import queryString from 'query-string';

export const getAttendingDates = (start, end, nonConsecutiveDays, days) => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dateStrings = [
    '2025-02-09',
    '2025-02-10',
    '2025-02-11',
    '2025-02-12',
    '2025-02-13',
  ];

  let attendingDates = [];

  if (nonConsecutiveDays) {
    days.forEach((day, i) => {
      if (day) attendingDates.push(dateStrings[i]);
    });
  } else {
    const startIndex = weekdays.indexOf(start);
    const endIndex = weekdays.indexOf(end);
    attendingDates = dateStrings.slice(startIndex, endIndex + 1);
  }
  return attendingDates;
};

export const reverseAttendingDates = (dayArray) => {
  const dateStrings = [
    '2025-02-10',
    '2025-02-11',
    '2025-02-12',
    '2025-02-13',
    '2025-02-14',
  ];

  let attendingDays = [false, false, false, false, false];

  for (let i = 0; i < dateStrings.length; i++) {
    if (dayArray.includes(dateStrings[i])) {
      attendingDays[i] = true;
    }
  }
  return attendingDays;
};

export const findConsec = (dayArray) => {
  // 0 consecutive days
  if (!dayArray.includes(true)) {
    return true;
  }

  const firstTrue = dayArray.indexOf(true);
  const lastTrue = dayArray.lastIndexOf(true);
  return dayArray.slice(firstTrue, lastTrue + 1).every((val) => val);
};

export const findFirstDay = (dayArray) => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  for (let i = 0; i < dayArray.length; i++) {
    if (dayArray[i] === true) {
      return weekdays[i];
    }
  }
  return '';
};

export const findLastDay = (dayArray) => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  for (let i = dayArray.length - 1; i >= 0; i--) {
    if (dayArray[i] === true) {
      return weekdays[i];
    }
  }
  return '';
};

// eslint-disable-next-line no-useless-escape
const regexEscapeRegex = /[-\/\\^$*+?.()|[\]{}]/g;
const regexEscape = (str) => str.replace(regexEscapeRegex, '\\$&');

const backendRoot = process.env.REACT_APP_API_ROOT;
const backendRootRegex = new RegExp(`^${regexEscape(backendRoot)}`, 'i');

const normalizeApiEndpoint = (endpoint) => {
  if (backendRootRegex.test(endpoint)) {
    return endpoint;
  }
  return `${backendRoot}${endpoint}`;
};

export const apiConfig = (method, body, includeApiKey) => {
  const config = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  if (includeApiKey) {
    const apiKey = retrieveApiKey();
    if (apiKey) {
      config.headers.Authorization = `Token ${apiKey}`;
    }
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  return config;
};

export const apiRaw = (
  endpoint,
  method = 'GET',
  body = null,
  includeApiKey = true
) => {
  const normalizedEndpoint = normalizeApiEndpoint(endpoint);
  const config = apiConfig(method, body, includeApiKey);
  return fetch(normalizedEndpoint, config).then((response) => {
    if (response.status === 401) {
      clearApiKey();
    }
    return response;
  });
};

const INVALID_API_KEY_ERROR_MESSAGE = 'Invalid API key.';

export const isInvalidApiKeyError = (error) => {
  return (
    error instanceof Error && error.message === INVALID_API_KEY_ERROR_MESSAGE
  );
};

export const api = (endpoint, method = 'GET', body) => {
  return apiRaw(endpoint, method, body).then((response) => {
    if (response.status === 401) {
      throw new Error(INVALID_API_KEY_ERROR_MESSAGE);
    }
    return response.json();
  });
};

const API_KEY_STORAGE_KEY = 'apiKey';

/**
 * Returns true if the API key is a non-empty string, i.e. it might be a valid
 * token. To verify whether the API key is valid for authentication, make an
 * API call to "rest-auth/user/" to check whether an invalid token error is
 * thrown; if not, the API key is valid.
 */
const apiKeyHasValidFormat = (key) => {
  return typeof key === 'string' && key.length > 0;
};

const retrieveApiKey = () => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

const storeApiKey = (key) => {
  if (typeof key === 'string' && key.length > 0) {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
};

export const clearApiKey = () => {
  storeApiKey(null);
};

export const login = (email, password) => {
  const body = { email, password };
  return apiRaw('rest-auth/login/', 'POST', body, false)
    .then((response) => Promise.all([response.ok, response.json()]))
    .then(([loginSuccess, data]) => {
      // No other modules should need access to the API key
      const { key, ...others } = data;
      if (loginSuccess) {
        storeApiKey(key);
      }
      return { ...others, loginSuccess };
    });
};

export const createAccount = (
  firstName,
  lastName,
  email,
  password1,
  password2
) => {
  const body = {
    first_name: firstName,
    last_name: lastName,
    email,
    password1,
    password2,
  };
  return apiRaw('rest-auth/registration/', 'POST', body, false)
    .then((response) => Promise.all([response.ok, response.json()]))
    .then(([success, data]) => ({ success, data }));
};

/**
 * Kind of hacky; only checks if the API key has a valid format, rather than
 * whether the API will actually accept the key. This avoids async logic, but
 * can be inaccurate.
 */
export const isLoggedIn = () => {
  return apiKeyHasValidFormat(retrieveApiKey());
};

/**
 * Resolves to the current user, or null if not logged in.
 */
export const fetchCurrentUser = () => {
  if (!isLoggedIn()) {
    return Promise.resolve(null);
  }

  return api('rest-auth/user/');
};

export const generateRegnOptionConversions = (regnOptions) => {
  const slugToUrlMap = new Map(regnOptions.map((opt) => [opt.slug, opt.url]));
  const urlToSlugMap = new Map(regnOptions.map((opt) => [opt.url, opt.slug]));
  return { slugToUrlMap, urlToSlugMap };
};

export const fetchRegnOptions = () => {
  return api('api/v0/registration_options/?workshop_slug=ita24');
};

export const fetchPaginatedRegistrations = (
  page,
  pageSize,
  probablyParticipating = true
) => {
  const queryParams = {
    workshop_slug: 'ita25',
    page,
    page_size: pageSize,
    probably_participating: probablyParticipating,
  };
  const queryStr = queryString.stringify(queryParams);
  const endpoint = `api/v0/registrations/?${queryStr}`;
  return api(endpoint);
};
