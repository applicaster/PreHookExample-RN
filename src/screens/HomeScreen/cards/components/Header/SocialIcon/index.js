import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { styles } from './style';

const SocialIcon = ({ socialNetwork, tintColorStyle }) => {
  const socialNetworkToIconMapping = {
    facebook: 'feed_rn_facebook_icon',
    instagram: 'feed_rn_instagram_icon',
    twitter: 'feed_rn_twitter_icon',
  };

  return (
    <Image
      style={[styles.socialIcon, tintColorStyle]}
      source={{ uri: socialNetworkToIconMapping[socialNetwork] }}
    />);
};

SocialIcon.propTypes = {
  socialNetwork: PropTypes.string.isRequired,
  tintColorStyle: PropTypes.object.isRequired,
};

export default SocialIcon;
