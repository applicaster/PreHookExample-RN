import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchEvents,
  toggleModal,
  updateFavoriteTweets,
} from '../../actions';

import {
  getEvents,
  getLoading,
  isFacebookAvailable,
  isTwitterAvailable,
} from '../../selectors';

import FeedScreen from './FeedScreen';

const mapStateToProps = state => ({
  isFacebookAvailable: isFacebookAvailable(state),
  isTwitterAvailable: isTwitterAvailable(state),
  loading: getLoading(state),
  events: getEvents(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEvents,
  toggleModal,
  updateFavoriteTweets,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
