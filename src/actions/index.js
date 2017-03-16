import { actionCreator } from './actionHelpers';

/* CONSTANTS */
export const FETCH_EVENTS_START = 'FETCH_EVENTS_START';
export const FETCH_EVENTS_DONE = 'FETCH_EVENTS_DONE';
export const FETCH_EVENTS_FAILED = 'FETCH_EVENTS_FAILED';

export const FETCH_EVENT_SOURCES_START = 'FETCH_EVENT_SOURCES_START';
export const FETCH_EVENT_SOURCES_DONE = 'FETCH_EVENT_SOURCES_DONE';
export const FETCH_EVENT_SOURCES_FAILED = 'FETCH_EVENT_SOURCES_FAILED';

export const INIT_STARS_SERVICES = 'INIT_STARS_SERVICES';
export const STARS_SERVICES_LOADED = 'STARS_SERVICES_LOADED';
export const STARS_SERVICES_FAILED = 'STARS_SERVICES_FAILED';

export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID';
export const SET_TIMELINE_ID = 'SET_TIMELINE_ID';
export const SET_TIMEZONE = 'SET_TIMEZONE';
export const ERROR = 'ERROR';

/* ACTIONS */
export const errorOccured = (error) => actionCreator(ERROR, { error });
export const setAccountId = (accountId) => actionCreator(SET_ACCOUNT_ID, { accountId });
export const setTimelineId = (timelineId) => actionCreator(SET_TIMELINE_ID, { timelineId });
export const setTimezone = (timezone) => actionCreator(SET_TIMEZONE, { timezone });

export const initStarsServices = () => actionCreator(INIT_STARS_SERVICES);
export const starsServicesLoaded = () => actionCreator(STARS_SERVICES_LOADED);

export const fetchEvents = () => actionCreator(FETCH_EVENTS_START);
export const fetchEventsDone = (events) => actionCreator(FETCH_EVENTS_DONE, { events });
export const fetchEventsFailed = (error) => actionCreator(FETCH_EVENTS_FAILED, { error });

export const fetchEventSources = () => actionCreator(FETCH_EVENT_SOURCES_START);
export const fetchEventSourcesDone = (events) => actionCreator(FETCH_EVENT_SOURCES_DONE, { events });
export const fetchEventSourcesFailed = (error) => actionCreator(FETCH_EVENT_SOURCES_FAILED, { error });