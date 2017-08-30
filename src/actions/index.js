import { actionCreator } from './actionHelpers';

/* CONSTANTS */
export const FETCH_SOCIAL_EVENTS_START = 'FETCH_SOCIAL_EVENTS_START';
export const FETCH_SOCIAL_EVENTS_DONE = 'FETCH_SOCIAL_EVENTS_DONE';
export const FETCH_SOCIAL_EVENTS_FAILED = 'FETCH_SOCIAL_EVENTS_FAILED';

export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID';
export const SET_TIMELINE_ID = 'SET_TIMELINE_ID';
export const SET_TIMEZONE = 'SET_TIMEZONE';
export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';

/* ACTIONS */
export const fetchSocialEvents = () => actionCreator(FETCH_SOCIAL_EVENTS_START);
export const fetchSocialEventsDone = events => actionCreator(FETCH_SOCIAL_EVENTS_DONE, events);
export const fetchSocialEventsFailed = error => actionCreator(FETCH_SOCIAL_EVENTS_FAILED, { error });

export const setAccountId = accountId => actionCreator(SET_ACCOUNT_ID, { accountId });
export const setTimelineId = timelineId => actionCreator(SET_TIMELINE_ID, { timelineId });
export const setTimezone = timezone => actionCreator(SET_TIMEZONE, { timezone });
export const setEnvironment = environment => actionCreator(SET_ENVIRONMENT, { environment });

export const toggleModal = modalParams => actionCreator(TOGGLE_MODAL, modalParams);
