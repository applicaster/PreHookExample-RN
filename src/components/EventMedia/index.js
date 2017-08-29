import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  toggleModal,
} from '../../actions';

import EventMedia from './EventMedia';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventMedia);
