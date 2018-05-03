import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setActiveEventId,
  toggleModal,
} from '../../../../actions';

import ImageCard from './ImageCard';

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
  toggleModal,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(ImageCard);
