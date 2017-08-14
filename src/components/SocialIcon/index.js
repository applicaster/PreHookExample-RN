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

const SocialIcon = ({ socialNetwork }) => {
  const socialNetworkToIconMapping = {
    facebook: 'facebook_icon',
    instagram: 'instagram_icon',
    twitter: 'twitter_icon',
  };

  return <Image style={styles.socialIcon} source={{ uri: socialNetworkToIconMapping[socialNetwork] }} />;
};

SocialIcon.propTypes = {
  socialNetwork: PropTypes.string,
};

export default SocialIcon;
