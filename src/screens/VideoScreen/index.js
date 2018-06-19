import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNoActiveEvent } from '../../actions';
import { getActiveEvent } from '../../selectors';

import VideoScreen from './VideoScreen';

const mapStateToProps = state => {
  const event = getActiveEvent(state);
  const { id, videoUrl } = event;
  const { url: imageUrl, height: imageHeight, width: imageWidth } = (event.images) ? event.images.default : {};

  return {
    eventId: id,
    imageUrl,
    videoHeight: imageHeight,
    videoWidth: imageWidth,
    videoUrl,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setNoActiveEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
