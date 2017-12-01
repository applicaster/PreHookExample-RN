import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../actions';
import {
  getActiveEventId,
  getTwitterScreenName,
 } from '../../selectors';
import ReplyToTweetScreen from './ReplyToTweetScreen';

const mapStateToProps = state => ({
  eventId: getActiveEventId(state),
  twitterScreenName: getTwitterScreenName(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReplyToTweetScreen);
