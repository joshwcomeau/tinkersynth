import uuid from 'uuid/v1';

const DISTINCT_ID_KEY = 'tinkersynth-user-id';
const NUM_OF_VISITS_KEY = 'tinkersynth-num-of-visits';
const SLOPES_STATE_KEY = 'tinkersynth-slopes-state';

export const getDistinctId = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  let distinctId = window.localStorage.getItem(DISTINCT_ID_KEY);

  if (distinctId === undefined || distinctId === null) {
    distinctId = uuid();
    window.localStorage.setItem(DISTINCT_ID_KEY, distinctId);
  }

  return distinctId;
};

export const getNumberOfVisits = distinctId => {
  if (typeof window === 'undefined') {
    return 0;
  }

  distinctId = distinctId || getDistinctId();

  let numOfVisits = window.localStorage.getItem(NUM_OF_VISITS_KEY);

  if (numOfVisits === undefined || numOfVisits === null) {
    numOfVisits = 0;
  }

  return Number(numOfVisits);
};

export const markNewVisit = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const numOfVisits = getNumberOfVisits();

  window.localStorage.setItem(NUM_OF_VISITS_KEY, numOfVisits + 1);
};

export const retrieveLastSessionSlopesParams = () => {
  if (typeof window === 'undefined') {
    return;
  }

  const persistedState = window.localStorage.getItem(SLOPES_STATE_KEY);

  if (!persistedState) {
    return null;
  }

  return JSON.parse(persistedState);
};

export const setSlopesParams = params => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(SLOPES_STATE_KEY, JSON.stringify(params));
};
