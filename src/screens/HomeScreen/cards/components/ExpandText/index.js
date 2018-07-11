import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPresentationStyle, getTranslations } from '../../../../../selectors';
import { setActiveEventId, setNoActiveEvent } from '../../../../../actions';
import ExpandText from './ExpandText';

const mapStateToProps = (state, ownProps) => ({
  navigationStyle: getPresentationStyle(state),
  expandLabel: getTranslations(state).expandText,
  content: ownProps.content,
  textStyle: ownProps.textStyle,
  maxChar: ownProps.maxChar,

});

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveEventId,
  setNoActiveEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpandText);
