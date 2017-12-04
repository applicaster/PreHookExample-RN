import { actionCreator } from './actionHelpers';

/* CONSTANTS */
export const FETCH_SOCIAL_EVENTS_START = 'FETCH_SOCIAL_EVENTS_START';
export const FETCH_SOCIAL_EVENTS_DONE = 'FETCH_SOCIAL_EVENTS_DONE';
export const FETCH_SOCIAL_EVENTS_FAILED = 'FETCH_SOCIAL_EVENTS_FAILED';

export const SET_SOCIAL_METADATA = 'SET_SOCIAL_METADATA';
export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID';
export const SET_TIMELINE_ID = 'SET_TIMELINE_ID';
export const SET_TIMEZONE = 'SET_TIMEZONE';
export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SET_EVENT_ID_FOR_ACTIVE_AUDIO = 'SET_EVENT_ID_FOR_ACTIVE_AUDIO';
export const SET_ACTIVE_EVENT_ID = 'SET_ACTIVE_EVENT_ID';

/* ACTIONS */
export const fetchSocialEvents = () => actionCreator(FETCH_SOCIAL_EVENTS_START);
export const fetchSocialEventsDone = events => actionCreator(FETCH_SOCIAL_EVENTS_DONE, events);
export const fetchSocialEventsFailed = error => actionCreator(FETCH_SOCIAL_EVENTS_FAILED, { error });

export const setSocialMetadata = metadata => actionCreator(SET_SOCIAL_METADATA, metadata);
export const setAccountId = accountId => actionCreator(SET_ACCOUNT_ID, { accountId });
export const setTimelineId = timelineId => actionCreator(SET_TIMELINE_ID, { timelineId });
export const setTimezone = timezone => actionCreator(SET_TIMEZONE, { timezone });
export const setEnvironment = environment => actionCreator(SET_ENVIRONMENT, { environment });

export const toggleModal = modalParams => actionCreator(TOGGLE_MODAL, modalParams);

export const setEventIdForActiveAudio = eventId => actionCreator(SET_EVENT_ID_FOR_ACTIVE_AUDIO, { eventId });
export const setActiveEventId = eventId => actionCreator(SET_ACTIVE_EVENT_ID, { eventId });
