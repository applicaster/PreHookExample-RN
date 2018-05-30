import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPresentationStyle } from '../../../../selectors';
import { setActiveEventId, setNoActiveEvent } from '../../../../actions';
import ArticleCard from './ArticleCard';

const mapStateToProps = state => ({
  navigationStyle: getPresentationStyle(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
  setNoActiveEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard);
