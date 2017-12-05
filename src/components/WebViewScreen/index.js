import { connect } from 'react-redux';
import {
  getActiveEventOriginUrl,
} from '../../selectors';

import WebViewScreen from './WebViewScreen';

const mapStateToProps = state => ({
  eventOriginUrl: getActiveEventOriginUrl(state),
});

export default connect(mapStateToProps)(WebViewScreen);
