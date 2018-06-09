import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setEventIdForActiveAudio } from '../../../../../actions';
import { getEventIdForActiveAudio, getViewableItems } from '../../../../../selectors';
import MediaVideo from './MediaVideo';

const mapStateToProps = (state, props) => {
  const { eventId } = props;

  return {
    eventIdForActiveAudio: getEventIdForActiveAudio(state),
    isInViewport: !!getViewableItems(state)[eventId],
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setEventIdForActiveAudio,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MediaVideo);
