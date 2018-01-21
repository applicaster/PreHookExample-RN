import { connect } from 'react-redux';
import { getTranslations } from '../../selectors';
import ShareButton from './ShareButton';

const mapStateToProps = state => ({
  defaultMessage: getTranslations(state).defaultShareMessage,
  title: getTranslations(state).shareTitle,
});

export default connect(mapStateToProps, undefined)(ShareButton);
