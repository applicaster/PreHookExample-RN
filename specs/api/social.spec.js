import axios from 'axios';
import { fetchEvents } from '../../src/api/events';

describe('api', () => {
  describe('events', () => {
    describe('fetchEvents', () => {
      beforeEach(() => {
        sinon.stub(axios, 'get').resolves({ foo: 'bar' });

        fetchEvents({
          environment: 'production',
          accountId: 'someAccountId',
          timelineId: 'someTimelineId',
        });
      });

      it('should fetch with the correct url', () => {
        expect(axios.get).to.have.been.calledOnce;
        expect(axios.get).to.have.been.calledWith(
          'http://assets-production.applicaster.com/social-media-aggregator/someAccountId/someTimelineId/feed.json'
        );
      });

      afterEach(() => {
        axios.get.restore();
      });
    });
  });
});
