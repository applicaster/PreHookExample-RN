import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  loadResources,
  setAccountId,
  setTimelineId,
  setTimezone,
} from '../../actions';
import Feed from './Feed';

const mapStateToProps = state => ({
  something: 1,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadResources,
  setAccountId,
  setTimelineId,
  setTimezone,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
