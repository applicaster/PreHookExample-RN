import { connect } from 'react-redux';
import { getCards } from '../../../../selectors';

import VideoCard from './VideoCard';

const mapStateToProps = (state, props) => {
  const { eventId } = props;
  const event = getCards(state)[eventId];

  return {
    isEditorial: (event.source === 'zappPipes'),
  };
};

export default connect(mapStateToProps)(VideoCard);
