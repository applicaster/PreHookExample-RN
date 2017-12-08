import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveEventId } from '../../actions';

import CommentButton from './CommentButton';

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(CommentButton);
