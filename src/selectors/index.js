import { createSelector } from 'reselect';

// From APP Reducer
export const getAccountId = state => state.app.get('accountId');
export const getTimelineId = state => state.app.get('timelineId');
export const getTimezone = state => state.app.get('timezone');
export const getEnvironment = state => state.app.get('environment');
export const getActiveEventId = state => state.app.get('activeEventId');
export const getEventIdForActiveAudio = state => state.app.get('eventIdForActiveAudio');
export const getFacebookPageId = state => state.app.get('facebookPageId');
export const getTwitterScreenName = state => state.app.get('twitterScreenName');
export const getActiveModalName = state => state.app.get('activeModalName');
export const getModalVisibility = state => state.app.get('isModalVisible');
export const getPublicPageUrl = state => state.app.get('publicPageUrl');
export const isTwitterAvailable = createSelector(getTwitterScreenName, (twitterScreenName) => !!twitterScreenName);
export const isFacebookAvailable = createSelector(getFacebookPageId, (facebookPageId) => !!facebookPageId);

// From EVENTS Reducer
export const getEvents = state => state.events.get('events');
export const getLoading = state => state.events.get('loading');
export const getFavoriteTweets = state => state.events.get('favoriteTweets');

export const getActiveEvent = createSelector(
  getActiveEventId,
  getEvents,
  (activeEventId, events) => events.find(event => event.id === activeEventId)
);

export const getActiveEventOriginUrl = createSelector(
  getActiveEvent,
  (activeEvent) => activeEvent.originUrl
);

// From Translations Reducer
export const getTranslations = state => state.translations;
