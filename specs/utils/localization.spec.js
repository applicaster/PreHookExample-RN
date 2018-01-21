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

  describe('androidTranslationMapping', () => {
    it('should return the mapped expected mapped values', () => {
      const translations = {
        general_share_text_description: 'foo %s',
        reply_to_tweet_screen_title: 'foo',
        write_a_post_hint: 'foo',
        combined_feed_facebook_button_text: 'foo',
        combined_feed_tweet_button_text: 'foo',
        write_post_screen_title: 'foo',
        write_tweet_screen_title: 'foo',
        feed_failed_to_post_on_facebook: 'foo',
        feed_failed_tweet: 'foo',
        CommonAlertOK: 'foo',
        CommonAlertCancel: 'foo',
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
        facebookPostErrorTitle: 'Error',
        facebookPostErrorMessage: 'foo',
        twitterPostErrorTitle: 'Error',
        twitterPostErrorMessage: 'foo',
        alertOk: 'foo',
        dismiss: 'foo',
      };

      expect(androidTranslationMapping(translations, 'bar')).to.deep.equal(expected);
    });
  });
});
