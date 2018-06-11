import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCards, getPresentationStyle } from '../../../../selectors';
import { setActiveEventId, setNoActiveEvent } from '../../../../actions';
import VideoCard from './VideoCard';

const mapStateToProps = (state, props) => {
  const { eventId } = props;
  const event = getCards(state)[eventId];

  return {
    isEditorial: (event.source === 'zappPipes'),
    navigationStyle: getPresentationStyle(state),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
  setNoActiveEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
