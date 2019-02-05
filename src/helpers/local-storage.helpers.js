import uuid from 'uuid/v1';

const DISTINCT_ID_KEY = 'tinkersynth-user-id';
const NUM_OF_VISITS_KEY = 'tinkersynth-num-of-visits';

export const getDistinctId = () => {
  let distinctId = localStorage.getItem(DISTINCT_ID_KEY);

  if (distinctId === undefined || distinctId === null) {
    distinctId = uuid();
    localStorage.setItem(DISTINCT_ID_KEY, distinctId);
  }

  return distinctId;
};

export const getNumberOfVisits = distinctId => {
  distinctId = distinctId || getDistinctId();

  let numOfVisits = localStorage.getItem(NUM_OF_VISITS_KEY);

  if (numOfVisits === undefined || numOfVisits === null) {
    numOfVisits = 0;
  }

  return numOfVisits;
};
