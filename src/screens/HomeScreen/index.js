import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchEvents,
  fetchZappPipes,
  setViewableItems,
  toggleModal,
  updateFavoriteTweets,
} from '../../actions';

import {
  isLoading,
  getActiveEventId,
  getSortedCardsByDate,
} from '../../selectors';

import HomeScreen from './HomeScreen';

const mapStateToProps = state => ({
  cards: getSortedCardsByDate(state),
  isCardActive: !!getActiveEventId(state),
  isLoading: isLoading(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEvents,
  fetchZappPipes,
  setViewableItems,
  toggleModal,
  updateFavoriteTweets,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
