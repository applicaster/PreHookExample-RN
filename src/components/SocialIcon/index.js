import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  socialIcon: {
    height: 30,
    width: 30,
  },
});
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
  socialNetwork: PropTypes.string,
  tintColorStyle: PropTypes.object,
};

export default SocialIcon;
