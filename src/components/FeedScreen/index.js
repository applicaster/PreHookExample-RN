import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchSocialEvents,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,
  hideMediaDetailsModal,
} from '../../actions';

import {
  getSocialEvents,
  getLoading,
  getMediaModalVisibility,
} from '../../selectors';

import FeedScreen from './FeedScreen';

const mapStateToProps = state => ({
  loading: getLoading(state),
  socialEvents: getSocialEvents(state),
  isMediaModalVisible: getMediaModalVisibility(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSocialEvents,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,
  hideMediaDetailsModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
