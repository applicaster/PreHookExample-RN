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
  okButtonText: getTranslations(state).okAlert,
  errorTitle: getTranslations(state).twitterPostErrorTitle,
  errorMessage: getTranslations(state).twitterPostErrorMessage,
  eventId: getActiveEventId(state),
  postButtonText: getTranslations(state).postButtonText,
  replyPlaceholderText: getTranslations(state).postPlaceholder,
  screenTitle: getTranslations(state).replyToTweetScreenTitle,
  twitterScreenName: getTwitterScreenName(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReplyToTweetScreen);
