import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setActiveEventId,
  setNoActiveEvent,
} from '../../../../actions';

import ArticleCard from './ArticleCard';

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
  setNoActiveEvent,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(ArticleCard);
