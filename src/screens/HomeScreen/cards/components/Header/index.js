import { connect } from 'react-redux';
import { getCards } from '../../../../../selectors';

import Header from './Header';

const mapStateToProps = (state, props) => {
  const { eventId } = props;
  const event = getCards(state)[eventId];
  const user = event.user;

  return {
    avatarImageUrl: user.avatarImageUrl,
    createdAt: event.createdAt,
    isSocial: (event.source !== 'cms' && event.source !== 'zappPipes'),
    isEditorial: (event.source === 'zappPipes'),
    name: user.name,
    source: event.source,
    userName: user.userName || '',
  };
};

export default connect(mapStateToProps)(Header);
