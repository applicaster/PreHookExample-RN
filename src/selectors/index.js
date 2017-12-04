import { createSelector } from 'reselect';

// From APP Reducer
export const getAccountId = state => state.app.get('accountId');
export const getTimelineId = state => state.app.get('timelineId');
export const getTimezone = state => state.app.get('timezone');
export const getEnvironment = state => state.app.get('environment');
export const getMediaModalVisibility = state => state.app.get('isMediaModalVisible');
export const getWritePostModalVisibility = state => state.app.get('isWritePostModalVisible');
export const getActiveEventId = state => state.app.get('activeEventId');
export const getEventIdForActiveAudio = state => state.app.get('eventIdForActiveAudio');

// From EVENTS Reducer
export const getSocialEvents = state => state.events.get('socialEvents');
export const getLoading = state => state.events.get('loading');

export const getActiveEvent = createSelector(
  getActiveEventId,
  getSocialEvents,
  (activeEventId, socialEvents) => socialEvents.find(event => event.id === activeEventId)
);
