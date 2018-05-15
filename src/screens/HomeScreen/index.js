import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchEvents,
  fetchZappPipes,
  toggleModal,
  updateFavoriteTweets,
} from '../../actions';

import {
  getSortedCardsByDate,
} from '../../selectors';

import HomeScreen from './HomeScreen';

const mapStateToProps = state => ({
  cards: getSortedCardsByDate(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEvents,
  fetchZappPipes,
  toggleModal,
  updateFavoriteTweets,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
