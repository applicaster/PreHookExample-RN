import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../actions';
import {
  isFacebookAvailable,
  isTwitterAvailable,
  getFacebookPageId,
  getTwitterScreenName,
  getTranslations,
} from '../../selectors';

import WritePostScreen from './WritePostScreen';

const mapStateToProps = state => ({
  facebookPageId: getFacebookPageId(state),
  twitterScreenName: getTwitterScreenName(state),
  isFacebookAvailable: isFacebookAvailable(state),
  isTwitterAvailable: isTwitterAvailable(state),

  facebookErrorTitle: getTranslations(state).facebookErrorTitle || 'Error',
  facebookErrorMessage: getTranslations(state).facebookErrorMessage || 'Unable to post to Facebook',
  twitterErrorTitle: getTranslations(state).twitterPostErrorTitle || 'Error',
  twitterErrorMessage: getTranslations(state).twitterErrorMessage || 'Unable to post to Twitter',
  okButtonText: getTranslations(state).okAlert || 'Ok',
  screenTitleFacebook: getTranslations(state).writePostScreenTitle || 'Write a Post',
  screenTitleTwitter: getTranslations(state).writePostScreenTitleTwitter || 'Post a Tweet',
  postPlaceholderText: getTranslations(state).postPlaceholder || 'Write a post...',
  tweetButtonText: getTranslations(state).tweetButtonText || 'Tweet',
  postButtonText: getTranslations(state).postButtonText || 'Post',
  
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WritePostScreen);
