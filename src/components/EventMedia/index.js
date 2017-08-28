import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  showMediaDetailsModal,
} from '../../actions';

import EventMedia from './EventMedia';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  showMediaDetailsModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventMedia);
