import {
  fetchEvents,
  fetchEventsDone,
  fetchEventsFailed,
  fetchZappPipes,
  fetchZappPipesDone,
  fetchZappPipesFailed,
  fetchFavoriteTweetsDone,
  fetchFavoriteTweetsFailed,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,
  toggleModal,
  setEventIdForActiveAudio,
  setActiveEventId,
  setMetadata,
  updateFavoriteTweets,

  FETCH_EVENTS_START,
  FETCH_EVENTS_DONE,
  FETCH_EVENTS_FAILED,
  FETCH_ZAPP_PIPES_START,
  FETCH_ZAPP_PIPES_DONE,
  FETCH_ZAPP_PIPES_FAILED,
  FETCH_FAVORITE_TWEETS_DONE,
  FETCH_FAVORITE_TWEETS_FAILED,
  UPDATE_FAVORITE_TWEETS,
  SET_ACCOUNT_ID,
  SET_TIMELINE_ID,
  SET_TIMEZONE,
  SET_ENVIRONMENT,
  TOGGLE_MODAL,
  SET_ACTIVE_EVENT_ID,
  SET_EVENT_ID_FOR_ACTIVE_AUDIO,
  SET_METADATA,
} from '../../src/actions';

describe('actions', () => {
  describe('action creators', () => {
    describe('fetchEvents', () => {
      it('should have correct action type', () => {
        const action = fetchEvents();

        expect(action.type).to.equal(FETCH_EVENTS_START);
      });
    });

    describe('fetchEventsDone', () => {
      it('should have correct action type', () => {
        const action = fetchEventsDone();

        expect(action.type).to.equal(FETCH_EVENTS_DONE);
      });

      it('should pass events to payload', () => {
        const action = fetchEventsDone({ data: [1, 2], meta: {}, links: {} });

        expect(action.payload.data).to.exist;
        expect(action.payload.data).to.deep.equal([1, 2]);
      });
    });

    describe('fetchEventsFailed', () => {
      it('should have correct action type', () => {
        const action = fetchEventsFailed(Error('blah'));

        expect(action.type).to.equal(FETCH_EVENTS_FAILED);
      });

      it('should pass error to payload', () => {
        const action = fetchEventsFailed(Error('blah'));

        expect(action.payload.error).to.exist;
        expect(action.payload.error.message).to.deep.equal('blah');
      });
    });

    describe('fetchZappPipes', () => {
      it('should have correct action type', () => {
        const action = fetchZappPipes();

        expect(action.type).to.equal(FETCH_ZAPP_PIPES_START);
      });
    });

    describe('fetchZappPipesDone', () => {
      it('should have correct action type', () => {
        const action = fetchZappPipesDone();

        expect(action.type).to.equal(FETCH_ZAPP_PIPES_DONE);
      });

      it('should pass pipes to payload', () => {
        const action = fetchZappPipesDone({ pipes: { foo: 'bar' } });

        expect(action.payload.pipes).to.exist;
        expect(action.payload.pipes).to.deep.equal({ foo: 'bar' });
      });
    });

    describe('fetchEventsFailed', () => {
      it('should have correct action type', () => {
        const action = fetchEventsFailed(Error('blah'));

        expect(action.type).to.equal(FETCH_EVENTS_FAILED);
      });

      it('should pass error to payload', () => {
        const action = fetchEventsFailed(Error('blah'));

        expect(action.payload.error).to.exist;
        expect(action.payload.error.message).to.deep.equal('blah');
      });
    });

    describe('fetchFavoriteTweetsDone', () => {
      it('should have correct action type', () => {
        const action = fetchFavoriteTweetsDone();

        expect(action.type).to.equal(FETCH_FAVORITE_TWEETS_DONE);
      });

      it('should pass events to payload', () => {
        const action = fetchFavoriteTweetsDone([1, 2]);

        expect(action.payload).to.exist;
        expect(action.payload).to.deep.equal([1, 2]);
      });
    });

    describe('fetchFavoriteTweetsFailed', () => {
      it('should have correct action type', () => {
        const action = fetchFavoriteTweetsFailed(Error('blah'));

        expect(action.type).to.equal(FETCH_FAVORITE_TWEETS_FAILED);
      });

      it('should pass error to payload', () => {
        const action = fetchFavoriteTweetsFailed(Error('blah'));

        expect(action.payload.error).to.exist;
        expect(action.payload.error.message).to.deep.equal('blah');
      });
    });

    describe('updateFavoriteTweets', () => {
      it('should have correct action type', () => {
        const action = updateFavoriteTweets();

        expect(action.type).to.equal(UPDATE_FAVORITE_TWEETS);
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

    describe('setEventIdForActiveAudio', () => {
      it('should have correct action type', () => {
        const action = setEventIdForActiveAudio();

        expect(action.type).to.equal(SET_EVENT_ID_FOR_ACTIVE_AUDIO);
      });
    });

    describe('setActiveEventId', () => {
      it('should have correct action type', () => {
        const action = setActiveEventId();

        expect(action.type).to.equal(SET_ACTIVE_EVENT_ID);
      });

      it('should pass params', () => {
        const action = setActiveEventId('foo');

        expect(action.payload).to.deep.equal({ eventId: 'foo' });
      });
    });

    describe('setMetadata', () => {
      it('should have correct action type', () => {
        const action = setMetadata({});

        expect(action.type).to.equal(SET_METADATA);
      });

      it('should pass params', () => {
        const action = setMetadata({ foo: 'bar' });

        expect(action.payload).to.deep.equal({ foo: 'bar' });
      });
    });
  });
});
