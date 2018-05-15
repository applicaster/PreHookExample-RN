import { connect } from 'react-redux';
import { getCards } from '../../../../../selectors';

import Footer from './Footer';

const mapStateToProps = (state, props) => {
  const { eventId } = props;
  const event = getCards(state)[eventId];
  return {
    caption: event.caption,
    commentsCount: event.commentsCount || 0,
    id: event.id,
    isSocial: (event.source !== 'cms' && event.source !== 'zappPipes'),
    likesCount: event.likesCount || 0,
    originUrl: event.originUrl || '',
    overlay: event.type === 'link',
    retweetCount: event.retweetCount || 0,
    source: event.source,
  };
};

export default connect(mapStateToProps)(Footer);
