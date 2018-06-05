import { createSelector } from 'reselect';

// From APP Reducer
export const getAccountId = state => state.app.get('accountId');
export const getTimelineId = state => state.app.get('timelineId');
export const getTimezone = state => state.app.get('timezone');
export const getEnvironment = state => state.app.get('environment');
export const getPlatform = state => state.app.get('platform');
export const getActiveEventId = state => state.app.get('activeEventId');
export const getEventIdForActiveAudio = state => state.app.get('eventIdForActiveAudio');
export const getFacebookPageId = state => state.app.get('facebookPageId');
export const getTwitterScreenName = state => state.app.get('twitterScreenName');
export const getActiveModalName = state => state.app.get('activeModalName');
export const getModalVisibility = state => state.app.get('isModalVisible');
export const getPublicPageUrl = state => state.app.get('publicPageUrl');
export const getViewableItems = state => state.app.get('viewableItems');
export const getPresentationStyle = state => state.app.get('navigationStyle');
export const isSocialPostingEnabled = state => state.app.get('isSocialPostingEnabled');
export const isTwitterAvailable = createSelector(getTwitterScreenName, (twitterScreenName) => !!twitterScreenName);
export const isFacebookAvailable = createSelector(getFacebookPageId, (facebookPageId) => !!facebookPageId);

// From EVENTS Reducer
export const getEvents = state => state.events.get('events');
export const getEventsLoading = state => state.events.get('loading');
export const getFavoriteTweets = state => state.events.get('favoriteTweets');

// From ZappPipes Reducer
export const getDataSourceProviderUrl = state => state.zappPipes.get('dataSourceProviderUrl');
export const getEntries = state => state.zappPipes.get('entries');
export const getZappPipesLoading = state => state.zappPipes.get('loading');

// From Translations Reducer
export const getTranslations = state => state.translations;

// Composed Selectors
export const getActiveEvent = createSelector(
  getActiveEventId,
  getEvents,
  (activeEventId, events) => events[activeEventId]
);

export const getActiveEventOriginUrl = createSelector(
  getActiveEvent,
  (activeEvent) => activeEvent.originUrl
);

export const isLoading = createSelector(
  getEventsLoading,
  getZappPipesLoading,
  (eventsLoading, zappPipesLoading) => eventsLoading || zappPipesLoading
);

export const getCards = createSelector(
  getEvents,
  getEntries,
  (events, entries) => Object.assign(events, entries)
);

export const getSortedCardsByDate = createSelector(
  getCards,
  isLoading,
  (cards, loadingState) => {
    const cardsList = Object.values(cards);
    return (loadingState) ? [] : cardsList.sort((a, b) => b.createdAt - a.createdAt);
  }
);
