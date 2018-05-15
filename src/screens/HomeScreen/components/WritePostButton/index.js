import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../../../actions';
import WritePostButton from './WritePostButton';
import {
  isFacebookAvailable,
  isTwitterAvailable,
} from '../../../../selectors';

const mapStateToProps = state => ({
  isFacebookAvailable: isFacebookAvailable(state),
  isTwitterAvailable: isTwitterAvailable(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openWritePostModal: toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WritePostButton);
