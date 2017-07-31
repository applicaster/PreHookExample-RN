import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchSocialEvents,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,
} from '../../actions';

import {
  getSocialPosts,
  getLoading,
} from '../../selectors';

import Feed from './Feed';

const mapStateToProps = state => ({
  loading: getLoading(state),
  socialPosts: getSocialPosts(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSocialEvents,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
