import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../actions';

import {
  getActiveEvent,
  getMediaModalVisibility,
} from '../../selectors';

import CommentsScreen from './CommentsScreen';

const mapStateToProps = state => ({
  event: getActiveEvent(state),
  isMediaModalVisible: getMediaModalVisibility(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
