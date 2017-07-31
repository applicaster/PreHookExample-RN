export const getAccountId = state => state.app.get('accountId');
export const getTimelineId = state => state.app.get('timelineId');
export const getTimezone = state => state.app.get('timezone');
export const getEnvironment = state => state.app.get('environment');
export const getSocialPosts = state => state.events.get('socialPosts');
export const getLoading = state => state.events.get('loading');
