import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../actions';
import WritePostButton from './WritePostButton';

const mapDispatchToProps = dispatch => bindActionCreators({
  openWritePostModal: toggleModal,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(WritePostButton);
