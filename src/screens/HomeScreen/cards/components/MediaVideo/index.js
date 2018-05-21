import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setEventIdForActiveAudio } from '../../../../../actions';
import { getCards, getEventIdForActiveAudio, getViewableItems } from '../../../../../selectors';
import MediaVideo from './MediaVideo';

const mapStateToProps = (state, props) => {
  const { eventId } = props;
  const event = getCards(state)[eventId];

  return {
    eventIdForActiveAudio: getEventIdForActiveAudio(state),
    isInViewport: !!getViewableItems(state)[eventId],
    isZoomed: (event.source === 'zappPipes'),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setEventIdForActiveAudio,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MediaVideo);
