import { normalizeZappPipes } from '../../src/logic/zapp-pipes-normalizer';
import {
  emptyFeedSample,
  videosFeedSample,
  imagesFeedSample,
  articlesFeedSample,
  linksFeedSample,
  normalizedVideosFeedSample,
  normalizedImagesFeedSample,
  normalizedArticlesFeedSample,
  normalizedLinksFeedSample,
} from './zapp-pipes-test-data';

describe('zappPipesNormalizer', () => {
  describe('normalizeZappPipes', () => {
    it('should normalize video entries', () => {
      const testData = JSON.stringify(videosFeedSample);
      const expectedNormalizedData = normalizedVideosFeedSample;

      expect(normalizeZappPipes(testData)).to.deep.equal(expectedNormalizedData);
    });

    it('should normalize image entries', () => {
      const testData = JSON.stringify(imagesFeedSample);
      const expectedNormalizedData = normalizedImagesFeedSample;

      expect(normalizeZappPipes(testData)).to.deep.equal(expectedNormalizedData);
    });

    it('should normalize article entries', () => {
      const testData = JSON.stringify(articlesFeedSample);
      const expectedNormalizedData = normalizedArticlesFeedSample;

      expect(normalizeZappPipes(testData)).to.deep.equal(expectedNormalizedData);
    });

    it('should normalize link entries', () => {
      const testData = JSON.stringify(linksFeedSample);
      const expectedNormalizedData = normalizedLinksFeedSample;

      expect(normalizeZappPipes(testData)).to.deep.equal(expectedNormalizedData);
    });

    it('should map title', () => {
      const testData = JSON.stringify(emptyFeedSample);
      const expectedNormalizedData = { title: 'Test Title', entries: {} };

      expect(normalizeZappPipes(testData)).to.deep.equal(expectedNormalizedData);
    });
  });
});
