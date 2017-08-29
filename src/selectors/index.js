// From APP Reducer
export const getAccountId = state => state.app.get('accountId');
export const getTimelineId = state => state.app.get('timelineId');
export const getTimezone = state => state.app.get('timezone');
export const getEnvironment = state => state.app.get('environment');
export const getMediaModalVisibility = state => state.app.get('isMediaModalVisible');

// From EVENTS Reducer
export const getSocialEvents = state => state.events.get('socialEvents');
export const getLoading = state => state.events.get('loading');
