import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../actions';
import {
  isFacebookAvailable,
  isTwitterAvailable,
  getFacebookPageId,
  getTwitterScreenName,
} from '../../selectors';

import WritePostScreen from './WritePostScreen';

const mapStateToProps = state => ({
  facebookPageId: getFacebookPageId(state),
  twitterScreenName: getTwitterScreenName(state),
  isFacebookAvailable: isFacebookAvailable(state),
  isTwitterAvailable: isTwitterAvailable(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WritePostScreen);
