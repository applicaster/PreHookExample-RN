import {
  androidTranslationMapping,
  iosTranslationMapping,
} from '../../src/utils/localization';

describe('localization', () => {
  describe('iosTranslationMapping', () => {
    it('should return the mapped expected mapped values', () => {
      const translations = {
        Feed2_ShareEvent: 'foo %@',
        Feed2_ReplyToTweetScreenTitle: 'foo',
        Feed2_CreatePostPlaceholder: 'foo',
        Feed2_CreatePostSend: 'foo',
        Feed2_CreateTweetSend: 'foo',
        Feed2_WritePostScreenTitle: 'foo',
        Feed2_WriteTweetScreenTitle: 'foo',
        Feed2_AlertFacebookSendFailedTitle: 'foo',
        Feed2_AlertFacebookSendFailedMessage: 'foo',
        Feed2_AlertTwitterSendFailedTitle: 'foo',
        Feed2_AlertTwitterSendFailedMessage: 'foo',
        Feed2_AlertOK: 'foo',
        Feed2_Dismiss: 'foo',
      };

      const expected = {
        defaultShareMessage: 'foo bar',
        shareTitle: 'bar',
        replyToTweetScreenTitle: 'foo',
        postPlaceholder: 'foo',
        postButtonText: 'foo',
        tweetButtonText: 'foo',
        writePostScreenTitle: 'foo',
        writePostScreenTitleTwitter: 'foo',
        facebookPostErrorTitle: 'foo',
        facebookPostErrorMessage: 'foo',
        twitterPostErrorTitle: 'foo',
        twitterPostErrorMessage: 'foo',
        alertOk: 'foo',
        dismiss: 'foo',
      };

      expect(iosTranslationMapping(translations, 'bar')).to.deep.equal(expected);
    });
  });
});
