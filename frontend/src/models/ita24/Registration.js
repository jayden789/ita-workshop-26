/**
 * Returns the first element of `targets` present among the elements of
 * `among`, or null if none are present. The elements of `targets` and `among`
 * must not be undefined.
 */
const findFirst = (targets, among) => {
  const first = targets.find(target => among.includes(target));
  return first === undefined ? null : first;
};

/**
 * Inverse of `Object.entries`.
 */
const objectFromEntries = entries =>
  entries.reduce((obj, [k, v]) => ({ ...obj, k: v }));

/**
 * Inverts keys and values, returning a new object.
 */
const invertObject = obj =>
  objectFromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

/**
 * Removes undefined values, returning a new object.
 */
const withoutUndefinedValues = obj =>
  objectFromEntries(Object.entries(obj).filter(([k, v]) => v !== undefined));

const FROM_RAW_SUNDAY_RECEPTION = {
  ita25_sundayReception_notAttending: 'NOT_ATTENDING',
  ita25_sundayReception_selfOnly: 'SELF_ONLY',
  ita25_sundayReception_selfPlus1: 'SELF_PLUS_1',
  ita25_sundayReception_selfPlus2: 'SELF_PLUS_2',
};
const TO_RAW_SUNDAY_RECEPTION = invertObject(FROM_RAW_SUNDAY_RECEPTION);

const FROM_RAW_BANQUET_SELF = {
  ita25_banquetSelf_notAttending: 'NOT_ATTENDING',
  ita25_banquetSelf_selfOnly: 'SELF_ONLY',
  ita25_banquetSelf_selfPlus1: 'SELF_PLUS_1',
  ita25_banquetSelf_selfPlus2: 'SELF_PLUS_2',
};
const TO_RAW_BANQUET_SELF = invertObject(FROM_RAW_BANQUET_SELF);

const FROM_RAW_VALENTINES_EVENT = {
  ita25_valentinesEvent_notAttending: 'NOT_ATTENDING',
  ita25_valentinesEvent_selfOnly: 'SELF_ONLY',
  ita25_valentinesEvent_selfPlus1: 'SELF_PLUS_1',
  ita25_valentinesEvent_selfPlus2: 'SELF_PLUS_2',
};
const TO_RAW_VALENTINES_EVENT = invertObject(FROM_RAW_VALENTINES_EVENT);

const FROM_RAW_MONDAY_LUNCH = {
  ita25_mondayLunch_notAttending: 'NOT_ATTENDING',
  ita25_mondayLunch_attending: 'ATTENDING',
};
const TO_RAW_MONDAY_LUNCH = invertObject(FROM_RAW_MONDAY_LUNCH);

const optionSlugsToObj = optionSlugs => {
  const sundayReceptionRaw = findFirst(
    Object.keys(FROM_RAW_SUNDAY_RECEPTION),
    optionSlugs
  );
  const banquetSelfRaw = findFirst(
    Object.keys(FROM_RAW_BANQUET_SELF),
    optionSlugs
  );
  const valentinesEventRaw = findFirst(
    Object.keys(FROM_RAW_VALENTINES_EVENT),
    optionSlugs
  );
  const mondayLunchRaw = findFirst(
    Object.keys(FROM_RAW_MONDAY_LUNCH),
    optionSlugs
  );

  const sundayReception = FROM_RAW_SUNDAY_RECEPTION[sundayReceptionRaw];
  const banquetSelf = FROM_RAW_BANQUET_SELF[banquetSelfRaw];
  const valentinesEvent = FROM_RAW_VALENTINES_EVENT[valentinesEventRaw];
  const mondayLunch = FROM_RAW_MONDAY_LUNCH[mondayLunchRaw];

  const options = {};
  if (sundayReception !== undefined) {
    options.sundayReception = sundayReception;
  }
  if (banquetSelf !== undefined) {
    options.banquetSelf = banquetSelf;
  }
  if (valentinesEvent !== undefined) {
    options.valentinesEvent = valentinesEvent;
  }
  if (mondayLunch !== undefined) {
    options.mondayLunch = mondayLunch;
  }
  return options;
};

const optionsObjToSlugs = optionsObj => {
  const {
    sundayReception,
    banquetSelf,
    valentinesEvent,
    mondayLunch,
  } = optionsObj;
  const sundayReceptionRaw = TO_RAW_SUNDAY_RECEPTION[sundayReception];
  const banquetSelfRaw = TO_RAW_BANQUET_SELF[banquetSelf];
  const valentinesEventRaw = TO_RAW_VALENTINES_EVENT[valentinesEvent];
  const mondayLunchRaw = TO_RAW_MONDAY_LUNCH[mondayLunch];
  return [
    sundayReceptionRaw,
    banquetSelfRaw,
    valentinesEventRaw,
    mondayLunchRaw,
  ].filter(raw => raw !== undefined);
};

const talkFromRaw = raw => {
  const { url, registration: registrationUrl, title, abstract: abstract_clean, comment: comment_clean, scheduling_comment: scheduling_comment_clean, topic_comment: topic_comment_clean } = raw;
  const abstract = abstract_clean ? abstract_clean.replace(/(\r\n|\n|\r)/gm, " ") : abstract_clean;
  const scheduling_comment = scheduling_comment_clean ? scheduling_comment_clean.replace(/(\r\n|\n|\r)/gm, " ") : scheduling_comment_clean;
  const topic_comment = topic_comment_clean ? topic_comment_clean.replace(/(\r\n|\n|\r)/gm, " ") : topic_comment_clean;
  const comment = comment_clean ? comment_clean.replace(/(\r\n|\n|\r)/gm, " ") : comment_clean;
  return { url, registrationUrl, title, abstract, comment, topic_comment, scheduling_comment};
};

export const fromApiFormat = (apiRegn, urlToSlugMap) => {
  const {
    url,
    workshop: workshopUrl,
    user: userUrl,
    user_profile: userProfile,
    attending_dates: attendingDates,
    participation_status: participationStatus,
    options: optionUrls,
    fee_type: feeTypeOverride,
    total_fee_amount: totalFeeAmount,
    approved_payments_total_amount: approvedPaymentsTotalAmount,
    has_approved_payment: hasApprovedPayment,
    initiate_payment_url: initiatePaymentUrl,
    presenting,
    talks: rawTalks,
    registrant_type: registrantType,
    inviter_url: inviterUrl,
    registrant_number: registrantNumber,
  } = apiRegn;

  const optionSlugs = optionUrls.map(url => urlToSlugMap.get(url));
  const options = optionSlugsToObj(optionSlugs);

  return {
    url,
    workshopUrl,
    userUrl,
    userProfile,
    attendingDates,
    participationStatus,
    options,
    feeTypeOverride,
    totalFeeAmount,
    approvedPaymentsTotalAmount,
    hasApprovedPayment,
    initiatePaymentUrl,
    presenting,
    talk: rawTalks.map(talkFromRaw)[0],
    registrantType,
    inviterUrl,
    registrantNumber,
  };
};

export const toApiFormat = (regn, slugToUrlMap) => {
  const {
    attendingDates,
    participationStatus,
    options,
    feeTypeOverride,
    presenting,
    registrantType,
    inviterUrl,
  } = regn;

  const optionSlugs = optionsObjToSlugs(options);
  const optionUrls = optionSlugs.map(slug => slugToUrlMap.get(slug));

  const apiRegn = {
    attending_dates: attendingDates,
    participation_status: participationStatus,
    options: optionUrls,
    fee_type: feeTypeOverride,
    presenting,
    registrant_type: registrantType,
    inviter_url: inviterUrl,
  };
  return withoutUndefinedValues(apiRegn);
};
