import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../actions';
import {
  getActiveEventId,
  getTwitterScreenName,
  getTranslations,
 } from '../../selectors';
import ReplyToTweetScreen from './ReplyToTweetScreen';

const mapStateToProps = state => ({
  okButtonText: getTranslations(state).okAlert || 'Ok',
  errorTitle: getTranslations(state).twitterPostErrorTitle || 'Error',
  errorMessage: getTranslations(state).twitterPostErrorMessage || 'Unable to post to Twitter',
  eventId: getActiveEventId(state),
  postButtonText: getTranslations(state).postButtonText || 'Post',
  replyPlaceholderText: getTranslations(state).postPlacerholder || 'Reply to tweet...',
  screenTitle: getTranslations(state).replyToTweetScreenTitle || 'Twitter Reply',
  twitterScreenName: getTwitterScreenName(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReplyToTweetScreen);
