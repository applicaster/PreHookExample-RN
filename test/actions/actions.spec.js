import {
  fetchSocialEvents,
  fetchSocialEventsDone,
  fetchSocialEventsFailed,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,

  FETCH_SOCIAL_EVENTS_START,
  FETCH_SOCIAL_EVENTS_DONE,
  FETCH_SOCIAL_EVENTS_FAILED,

  SET_ACCOUNT_ID,
  SET_TIMELINE_ID,
  SET_TIMEZONE,
  SET_ENVIRONMENT,
} from '../../src/actions';

describe('actions', () => {
  describe('action creators', () => {
    describe('fetchSocialEvents', () => {
      it('should have correct action type', () => {
        const action = fetchSocialEvents();

        expect(action.type).to.equal('FETCH_SOCIAL_EVENTS_START');
      });
    });
  });
});
