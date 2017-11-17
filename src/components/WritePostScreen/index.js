import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleModal } from '../../actions';

import WritePostScreen from './WritePostScreen';

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(WritePostScreen);
