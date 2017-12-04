import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleModal } from '../../actions';
import {
  getWritePostModalVisibility,
} from '../../selectors';

import WritePostModal from './WritePostModal';

const mapStateToProps = state => ({
  isWritePostModalVisible: getWritePostModalVisibility(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WritePostModal);
