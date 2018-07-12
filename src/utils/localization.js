export const iosTranslationMapping = (translations, feedTitle) => ({
  defaultShareMessage: translations.Feed2_ShareEvent.replace('%@', feedTitle) || 'Download the app now!',
  shareTitle: feedTitle || 'Feed',
  replyToTweetScreenTitle: translations.Feed2_ReplyToTweetScreenTitle || 'Reply to Tweet', // needed
  postPlaceholder: translations.Feed2_CreatePostPlaceholder || 'Write a post...',
  postButtonText: translations.Feed2_CreatePostSend || 'Post',
  tweetButtonText: translations.Feed2_CreateTweetSend || 'Tweet',
  writePostScreenTitle: translations.Feed2_WritePostScreenTitle || 'Write a Post',  // needed
  writePostScreenTitleTwitter: translations.Feed2_WriteTweetScreenTitle || 'Post a Tweet',  // needed
  facebookPostErrorTitle: translations.Feed2_AlertFacebookSendFailedTitle || 'Error',
  facebookPostErrorMessage: translations.Feed2_AlertFacebookSendFailedMessage || 'Unable to post to Facebook',
  twitterPostErrorTitle: translations.Feed2_AlertTwitterSendFailedTitle || 'Error',
  twitterPostErrorMessage: translations.Feed2_AlertTwitterSendFailedMessage || 'Unable to post to Twitter',
  alertOk: translations.Feed2_AlertOK || 'Ok',
  dismiss: translations.Feed2_Dismiss || 'Dismiss',
  expandText: translations.Feed2_ExpandText || 'more',
});

export const androidTranslationMapping = (translations, feedTitle) => ({
  defaultShareMessage: translations.general_share_text_description.replace('%s', feedTitle) || 'Download the app now!',
  shareTitle: feedTitle || 'Feed',
  replyToTweetScreenTitle: translations.reply_to_tweet_screen_title || 'Reply to Tweet', // needed
  postPlaceholder: translations.write_a_post_hint || 'Write a post...',
  postButtonText: translations.combined_feed_facebook_button_text || 'Post',
  tweetButtonText: translations.combined_feed_tweet_button_text || 'Tweet',
  writePostScreenTitle: translations.write_post_screen_title || 'Write a Post',  // needed
  writePostScreenTitleTwitter: translations.write_tweet_screen_title || 'Post a Tweet',  // needed
  facebookPostErrorTitle: 'Error',
  facebookPostErrorMessage: translations.feed_failed_to_post_on_facebook || 'Unable to post to Facebook',
  twitterPostErrorTitle: 'Error',
  twitterPostErrorMessage: translations.feed_failed_tweet || 'Unable to post to Twitter',
  alertOk: translations.CommonAlertOK || 'Ok',
  dismiss: translations.CommonAlertCancel || 'Cancel',
  expandText: translations.expandText || 'more',
});
