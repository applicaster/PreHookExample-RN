import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchEvents,
  fetchZappPipes,
  toggleModal,
  updateFavoriteTweets,
} from '../../actions';

import {
  getEvents,
  getLoading,
  isFacebookAvailable,
  isTwitterAvailable,
} from '../../selectors';

import HomeScreen from './HomeScreen';

const mapStateToProps = state => ({
  isFacebookAvailable: isFacebookAvailable(state),
  isTwitterAvailable: isTwitterAvailable(state),
  loading: getLoading(state),
  events: getEvents(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEvents,
  fetchZappPipes,
  toggleModal,
  updateFavoriteTweets,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
