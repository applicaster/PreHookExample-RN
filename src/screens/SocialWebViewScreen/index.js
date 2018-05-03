import { connect } from 'react-redux';
import {
  getActiveEventOriginUrl,
} from '../../selectors';

import SocialWebViewScreen from './SocialWebViewScreen';

const mapStateToProps = state => ({
  eventOriginUrl: getActiveEventOriginUrl(state),
});

export default connect(mapStateToProps)(SocialWebViewScreen);
