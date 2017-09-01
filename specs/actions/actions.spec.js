import {
  fetchSocialEvents,
  fetchSocialEventsDone,
  fetchSocialEventsFailed,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,

  toggleModal,

  FETCH_SOCIAL_EVENTS_START,
  FETCH_SOCIAL_EVENTS_DONE,
  FETCH_SOCIAL_EVENTS_FAILED,

  SET_ACCOUNT_ID,
  SET_TIMELINE_ID,
  SET_TIMEZONE,
  SET_ENVIRONMENT,

  TOGGLE_MODAL,
} from '../../src/actions';

describe('actions', () => {
  describe('action creators', () => {
    describe('fetchSocialEvents', () => {
      it('should have correct action type', () => {
        const action = fetchSocialEvents();

        expect(action.type).to.equal(FETCH_SOCIAL_EVENTS_START);
      });
    });

    describe('fetchSocialEventsDone', () => {
      it('should have correct action type', () => {
        const action = fetchSocialEventsDone();

        expect(action.type).to.equal(FETCH_SOCIAL_EVENTS_DONE);
      });

      it('should pass events to payload', () => {
        const action = fetchSocialEventsDone({ data: [1,2], meta: {}, links: {} });

        expect(action.payload.data).to.exist;
        expect(action.payload.data).to.deep.equal([1,2]);
      });
    });

    describe('fetchSocialEventsFailed', () => {
      it('should have correct action type', () => {
        const action = fetchSocialEventsFailed(Error('blah'));

        expect(action.type).to.equal(FETCH_SOCIAL_EVENTS_FAILED);
      });

      it('should pass error to payload', () => {
        const action = fetchSocialEventsFailed(Error('blah'));

        expect(action.payload.error).to.exist;
        expect(action.payload.error.message).to.deep.equal('blah');
      });
    });

    describe('setAccountId', () => {
      it('should have correct action type', () => {
        const action = setAccountId('someAccountId');

        expect(action.type).to.equal(SET_ACCOUNT_ID);
      });

      it('should pass id to payload', () => {
        const action = setAccountId('someAccountId');

        expect(action.payload.accountId).to.exist;
        expect(action.payload.accountId).to.equal('someAccountId');
      });
    });

    describe('setTimelineId', () => {
      it('should have correct action type', () => {
        const action = setTimelineId('someTimelineId');

        expect(action.type).to.equal(SET_TIMELINE_ID);
      });

      it('should pass id to payload', () => {
        const action = setTimelineId('someTimelineId');

        expect(action.payload.timelineId).to.exist;
        expect(action.payload.timelineId).to.equal('someTimelineId');
      });
    });

    describe('setTimezone', () => {
      it('should have correct action type', () => {
        const action = setTimezone('timezone');

        expect(action.type).to.equal(SET_TIMEZONE);
      });

      it('should pass timezone to payload', () => {
        const action = setTimezone('timezone');

        expect(action.payload.timezone).to.exist;
        expect(action.payload.timezone).to.equal('timezone');
      });
    });

    describe('setEnvironment', () => {
      it('should have correct action type', () => {
        const action = setEnvironment('production');

        expect(action.type).to.equal(SET_ENVIRONMENT);
      });

      it('should pass environment to payload', () => {
        const action = setEnvironment('production');

        expect(action.payload.environment).to.exist;
        expect(action.payload.environment).to.equal('production');
      });
    });

    describe('toggleModal', () => {
      it('should have correct action type', () => {
        const action = toggleModal();

        expect(action.type).to.equal(TOGGLE_MODAL);
      });

      it('should pass params', () => {
        const action = toggleModal({ bar: 'foo' });

        expect(action.payload).to.deep.equal({ bar: 'foo' });
      });
    });
  });
});
