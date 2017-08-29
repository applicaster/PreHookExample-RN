import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  toggleModal,
} from '../../actions';

import MediaDetailsScreen from './MediaDetailsScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetailsScreen);
