import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setNoActiveEvent,
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
  setNoActiveEvent,
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetailsScreen);
