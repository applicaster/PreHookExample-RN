import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPresentationStyle, getTranslations } from '../../../../selectors';
import { setActiveEventId, setNoActiveEvent } from '../../../../actions';
import ArticleCard from './ArticleCard';

const mapStateToProps = state => ({
  navigationStyle: getPresentationStyle(state),
  expandTextButton: getTranslations(state).shareTitle,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
  setNoActiveEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard);
