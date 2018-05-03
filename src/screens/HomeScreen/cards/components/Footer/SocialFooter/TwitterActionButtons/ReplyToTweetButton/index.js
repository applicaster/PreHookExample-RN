import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveEventId, toggleModal } from '../../../../../../../../actions';

import ReplyToTweetButton from './ReplyToTweetButton';

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
  toggleModal,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(ReplyToTweetButton);
