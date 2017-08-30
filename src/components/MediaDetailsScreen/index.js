import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  toggleModal,
} from '../../actions';
import {
  getActiveEventImageUrl,
} from '../../selectors';

import MediaDetailsScreen from './MediaDetailsScreen';

const mapStateToProps = state => ({
  imageUrl: getActiveEventImageUrl(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MediaDetailsScreen);
