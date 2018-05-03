import { connect } from 'react-redux';
import { getTranslations, getPublicPageUrl } from '../../../../selectors';
import ShareButton from './ShareButton';

const mapStateToProps = state => ({
  defaultMessage: getTranslations(state).defaultShareMessage,
  publicPageUrl: getPublicPageUrl(state),
  title: getTranslations(state).shareTitle,
});

export default connect(mapStateToProps, undefined)(ShareButton);
