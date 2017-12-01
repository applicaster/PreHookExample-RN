import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleModal } from '../../actions';
import {
  getModalVisibility,
  getActiveModalName,
} from '../../selectors';

import ModalScreen from './ModalScreen';

const mapStateToProps = state => ({
  isVisible: getModalVisibility(state),
  modalName: getActiveModalName(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen);
