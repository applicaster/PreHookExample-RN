import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveEventId } from '../../../../../../../../actions';

import LikeButton from './LikeButton';

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(LikeButton);
