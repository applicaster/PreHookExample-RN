import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../../../actions';
import WritePostButton from './WritePostButton';
import {
  getActiveEventId,
  isFacebookAvailable,
  isTwitterAvailable,
  isSocialPostingEnabled,
} from '../../../../selectors';

const mapStateToProps = state => ({
  isCardActive: !!getActiveEventId(state),
  isFacebookAvailable: isFacebookAvailable(state),
  isTwitterAvailable: isTwitterAvailable(state),
  isSocialPostingEnabled: isSocialPostingEnabled(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openWritePostModal: toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WritePostButton);
