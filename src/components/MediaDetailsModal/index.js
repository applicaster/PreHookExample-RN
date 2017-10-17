import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleModal } from '../../actions';
import {
  getMediaModalVisibility,
} from '../../selectors';

import MediaDetailsModal from './MediaDetailsModal';

const mapStateToProps = state => ({
  isMediaModalVisible: getMediaModalVisibility(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetailsModal);
