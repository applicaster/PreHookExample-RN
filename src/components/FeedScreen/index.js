import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchSocialEvents,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,
  toggleModal,
  updateFavoriteTweets,
} from '../../actions';

import {
  getSocialEvents,
  getLoading,
  isFacebookAvailable,
  isTwitterAvailable,
} from '../../selectors';

import FeedScreen from './FeedScreen';

const mapStateToProps = state => ({
  isFacebookAvailable: isFacebookAvailable(state),
  isTwitterAvailable: isTwitterAvailable(state),
  loading: getLoading(state),
  socialEvents: getSocialEvents(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSocialEvents,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,
  toggleModal,
  updateFavoriteTweets,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
