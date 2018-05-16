import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setActiveEventId,
} from '../../../../actions';

import ArticleCard from './ArticleCard';

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(ArticleCard);
