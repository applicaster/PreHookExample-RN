import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenericFooter from './GenericFooter';
import SocialFooter from './SocialFooter';

class Footer extends Component {
  render() {
    const { isSocial, source, overlay, likesCount, commentsCount, caption, id, originUrl, retweetCount } = this.props;
    
    if (isSocial) {
      return (<SocialFooter
        commentsCount={commentsCount}
        eventId={id}
        eventOriginUrl={originUrl}
        likesCount={likesCount}
        retweetCount={retweetCount}
        source={source}
        textToShare={caption}
      />);
    }
    
    return (<GenericFooter
      caption={caption}
      textToShare={caption}
      overlay={overlay}
    />);
  }
}

Footer.propTypes = {
  caption: PropTypes.string,
  commentsCount: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isSocial: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
  originUrl: PropTypes.string.isRequired,
  overlay: PropTypes.bool.isRequired,
  retweetCount: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  caption: '',
};

export default Footer;
