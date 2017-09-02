import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setEventIdForActiveAudio } from '../../actions';
import { getEventIdForActiveAudio } from '../../selectors';

import EventVideo from './EventVideo';

const mapStateToProps = state => ({
  eventIdForActiveAudio: getEventIdForActiveAudio(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setEventIdForActiveAudio,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventVideo);
