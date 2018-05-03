import { connect } from 'react-redux';

import FavoriteTweetButton from './FavoriteTweetButton';
import { getFavoriteTweets } from '../../../../../../../../selectors';

const mapStateToProps = state => ({
  favorites: getFavoriteTweets(state) || {},
});

export default connect(mapStateToProps, undefined)(FavoriteTweetButton);
