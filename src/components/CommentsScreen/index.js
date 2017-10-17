import { connect } from 'react-redux';
import {
  getActiveEvent,
} from '../../selectors';

import CommentsScreen from './CommentsScreen';

const mapStateToProps = state => ({
  event: getActiveEvent(state),
});

export default connect(mapStateToProps)(CommentsScreen);
