import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNoActiveEvent } from '../../actions';
import { getActiveEvent } from '../../selectors';

import ArticleScreen from './ArticleScreen';

const mapStateToProps = state => {
  const event = getActiveEvent(state);
  const { body, caption: title, category, createdAt: timestamp, id, user, videoUrl, summary } = event;
  const { url: imageUrl, height: imageHeight, width: imageWidth } = (event.images) ? event.images.default : {};

  return {
    author: user.name,
    body,
    category,
    eventId: id,
    imageHeight,
    imageUrl,
    imageWidth,
    summary,
    timestamp,
    title,
    videoUrl,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setNoActiveEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen);
