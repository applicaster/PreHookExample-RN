import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  hideMediaDetailsModal,
} from '../../actions';

import MediaDetailsScreen from './MediaDetailsScreen';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  hideMediaDetailsModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetailsScreen);
