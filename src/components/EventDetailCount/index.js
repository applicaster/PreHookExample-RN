import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveEventId } from '../../actions';

import EventDetailCount from './EventDetailCount';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailCount);
