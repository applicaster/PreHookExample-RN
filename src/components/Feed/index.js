import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchEvents,
  fetchEventSources,
  initStarsServices,
  setAccountId,
  setTimelineId,
  setTimezone,
} from '../../actions';
import Feed from './Feed';

const mapStateToProps = state => ({
  something: 1,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEvents,
  fetchEventSources,
  initStarsServices,
  setAccountId,
  setTimelineId,
  setTimezone,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
