import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  toggleModal,
} from '../../actions';
import {
  getActiveEvent,
} from '../../selectors';

import MediaDetailsScreen from './MediaDetailsScreen';

const mapStateToProps = state => ({
  activeEvent: getActiveEvent(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetailsScreen);