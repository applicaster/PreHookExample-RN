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

  facebookErrorTitle: getTranslations(state).facebookErrorTitle,
  facebookErrorMessage: getTranslations(state).facebookErrorMessage,
  twitterErrorTitle: getTranslations(state).twitterPostErrorTitle,
  twitterErrorMessage: getTranslations(state).twitterErrorMessage,
  okButtonText: getTranslations(state).okAlert,
  screenTitleFacebook: getTranslations(state).writePostScreenTitle,
  screenTitleTwitter: getTranslations(state).writePostScreenTitleTwitter,
  postPlaceholderText: getTranslations(state).postPlaceholder,
  tweetButtonText: getTranslations(state).tweetButtonText,
  postButtonText: getTranslations(state).postButtonText,
  
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WritePostScreen);
