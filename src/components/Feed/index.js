import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchSocialEvents,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,
} from '../../actions';
import Feed from './Feed';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSocialEvents,
  setAccountId,
  setTimelineId,
  setTimezone,
  setEnvironment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
