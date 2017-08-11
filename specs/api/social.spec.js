import axios from 'axios';
import { fetchSocialEvents } from '../../src/api/social';

describe('api', () => {
  describe('social', () => {
    describe('fetchSocialEvents', () => {
      beforeEach(() => {
        sinon.stub(axios, 'get').resolves({ foo: 'bar' });

        fetchSocialEvents({
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
