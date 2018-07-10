import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPresentationStyle, getTranslations } from '../../../../selectors';
import { setActiveEventId, setNoActiveEvent } from '../../../../actions';
import ArticleCard from './ArticleCard';

const mapStateToProps = state => ({
  navigationStyle: getPresentationStyle(state),
  expandText: getTranslations(state).expandText,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
  setNoActiveEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard);
